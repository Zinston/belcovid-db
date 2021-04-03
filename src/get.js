import diff from 'changeset';

export async function getDiff(db, key, fromId) {
    const startRecord = fromId ? await getRecord(db, key, fromId) : {id: '', record: []};
    const endRecord = await getLatestRecord(db, key);
    return {
        start: [startRecord.id, startRecord.datetime],
        end: [endRecord.id, endRecord.datetime],
        changes: diff(startRecord.record, endRecord.record),
    };
}
export async function getLatestRecord(db, key) {
    return getRecord(db, key, 'last');
}
async function getRecord(db, key, id) {
    const collection = db.collection(key);
    const cursor = collection.find();
    // Get all diffs until ID.
    let allDiffs = await cursor.toArray();
    if (id !== 'last') {
        const index = id ? allDiffs.findIndex(singleDiff => singleDiff.diffId === id) : 0;
        allDiffs = allDiffs.slice(0, index + 1);
    }
    let record = [];
    let recordId;
    let recordDatetime;
    for (const singleDiff of allDiffs) {
        record = diff.apply(singleDiff.changes, record);
        recordId = singleDiff.diffId;
        recordDatetime = singleDiff.datetime;
    }
    return {id: recordId, datetime: recordDatetime, record};
}
