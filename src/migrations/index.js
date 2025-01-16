import { info } from "../utils/logger.js";
import { createUsersTable, insertUserData } from "./user_migration.js";

export default async function runMigrations() {
    info('Running migrations')
    await createUsersTable()
    await insertUserData()
    info('Migrations complete')
}