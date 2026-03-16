import db from './db/index.js';

async function cleanup() {
    try {
        await db.init();
        const deletedBins = await db.bins.deleteOlderThan(24);
        console.log(`Deleted ${deletedBins} bins older than 24 hours`);
    } catch (error) {
        console.error('Error cleaning up bins:', error);
    } finally {
        await db.close();
    }
}

cleanup();