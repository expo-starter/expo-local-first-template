import { drizzle } from "drizzle-orm/expo-sqlite";
import { openDatabaseSync } from "expo-sqlite/next";
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator';

import migrations from './migrations/migrations';

const expoDb = openDatabaseSync("db.db");
export const db = drizzle(expoDb);

export const useMigrationHelper = () => useMigrations(db, migrations);
