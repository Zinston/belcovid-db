import diff from 'changeset';

export async function getDiff(db, key, fromId) {
    const collection = db.collection(key);
    const cursor = collection.find();
    // Get all diffs until ID.
    const allDiffs = await cursor.toArray();
    const index = fromId ? allDiffs.findIndex(singleDiff => singleDiff.diffId === fromId) : 0;
    const startDiff = allDiffs[index];
    const endDiff = allDiffs[allDiffs.length - 1];

    const result = {
        start: [startDiff.diffId, startDiff.datetime],
        end: [endDiff.diffId, endDiff.datetime],
        changes: allDiffs.slice(index + 1).flatMap(diff => diff.changes),
    };
    return result;
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
        allDiffs = allDiffs.slice(0, Math.min(index + 1, allDiffs.length - 1));
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
