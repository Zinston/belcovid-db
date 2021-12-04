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
