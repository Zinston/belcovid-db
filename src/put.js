import fetch from 'node-fetch';
import diff from 'changeset';
import {v1 as uuidv1} from 'uuid';
import {AGE_GROUPS_CASES, AGE_GROUPS_MORTALITY, AGE_GROUPS_VACCINATION, PROVINCES, URLS} from './constants';
import {objectFrom, provinceKey} from './utils';
import {getLatestRecord} from './get';

export async function updateDatabase(db) {
    // Save the time of starting the update.
    db.collection('lastUpdate').insertOne({datetime: new Date()});

    // Fetch and normalize Sciensano data.
    const newData = normalizeAllData(await fetchData());

    // Update the database with the latest diffs.
    const updatedKeys = [];
    for (const key of Object.keys(newData)) {
        const collection = db.collection(key);
        // Compute the latest recorded data from all recorded diffs.
        const latestRecord = await getLatestRecord(db, key);

        // Compute the diff between the latest recorded data and the new
        // data.
        const changes = diff(latestRecord.record, newData[key]);
        if (changes.length) {
            // Insert the diff into the database.
            await collection.insertOne({
                diffId: uuidv1(),
                datetime: new Date(),
                changes,
            });
            // eslint-disable-next-line no-console
            console.log(`insert new diff for ${key}`);
            updatedKeys.push(key);
        } else {
            // eslint-disable-next-line no-console
            console.log(`no changes to record for ${key}`);
        }
    }
    return updatedKeys;
}

async function fetchData() {
    let data = [];
    for (const key of Object.keys(URLS)) {
        data.push([key, await (await fetch(URLS[key])).json()]);
    }
    return data;
}

function normalizeAllData(data) {
    const finalData = {};
    for (const [key, values] of data) {
        switch (key) {
            case 'cases': {
                finalData.cases = normalizeData('CASES', values, AGE_GROUPS_CASES);
                break;
            }
            case 'hospitalizations': {
                finalData.totalHospitalizations = normalizeData('TOTAL_IN', values);
                finalData.newHospitalizations = normalizeData('NEW_IN', values);
                finalData.totalICU = normalizeData('TOTAL_IN_ICU', values);
                break;
            }
            case 'mortality': {
                finalData.mortality = normalizeData('DEATHS', values, AGE_GROUPS_MORTALITY);
                break;
            }
            case 'tests': {
                finalData.tests = normalizeData('TESTS_ALL', values, AGE_GROUPS_MORTALITY);
                break;
            }
            case 'vaccination': {
                finalData.vaccinationPartial = normalizeData(
                    'COUNT', values.filter(item => item.DOSE === 'A'), AGE_GROUPS_VACCINATION);
                finalData.vaccinationFull = normalizeData(
                    'COUNT', values.filter(item => ['B', 'C'].includes(item.DOSE)), AGE_GROUPS_VACCINATION);
            }
        }
    }
    return finalData;
}
function normalizeData(dataKey, values, ageGroups) {
    const data = objectFrom(Object.keys(PROVINCES), {});
    for (const item of values) {
        const province = (item.PROVINCE && provinceKey(item.PROVINCE)) || 'be';
        const date = item.DATE;
        if (!date) {
            continue;
        }

        const value = +item[dataKey];
        if (ageGroups) {
            const ageGroup = item.AGEGROUP || 'Age unknown';
            if (!data[province][date]) {
                // Initialize the age group values.
                data[province][date] = objectFrom(ageGroups, 0);
            }
            if (!data.be[date]) {
                // Initialize the age group values for Belgium.
                data.be[date] = objectFrom(ageGroups, 0);
            }
            const normalizedValue = data[province][date][ageGroup] || 0;
            // Set province value at date for age group.
            data[province][date][ageGroup] = normalizedValue + value;
            // Add to total for province at date.
            const totalValue = data[province][date].total || 0;
            data[province][date].total = totalValue + value;
            // Add to totals for Belgium at date.
            if (province !== 'be') {
                if (!data.be[date]) {
                    data.be[date] = {};
                }
                // Add to total for Belgium at date for age group.
                const belgiumValue = data.be[date][ageGroup] || 0;
                data.be[date][ageGroup] = belgiumValue + value;
                // Add to total for Belgium at date.
                const belgiumTotal = data.be[date].total || 0;
                data.be[date].total = belgiumTotal + value;
            }
        } else {
            const provinceValue = data[province][date] || 0;
            // Set province value at date.
            data[province][date] = provinceValue + value;
            // Add to total for Belgium at date.
            if (province !== 'be') {
                const belgiumValue = data.be[date] || 0;
                data.be[date] = belgiumValue + value;
            }
        }
    }
    return data;
}
