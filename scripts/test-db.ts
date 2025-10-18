// scripts/test-db.ts

import 'dotenv/config';
// The path now uses a relative path that Node.js can understand.
import { connectToDatabase } from "../database/mongoose.ts";

async function main() {
    console.log("Attempting to connect to the database...");
    try {
        await connectToDatabase();
        // The log inside connectToDatabase will show upon success
        process.exit(0);
    } catch (err) {
        console.error("ERROR: Database connection failed.");
        console.error(err);
        process.exit(1);
    }
}

main();