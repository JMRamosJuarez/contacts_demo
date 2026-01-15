import { SQLiteDatabase } from 'expo-sqlite';

import { departmentSeedMapper } from '@contacts/Contacts.mappers';
import { eDepartment } from '@contacts/Contacts.types';
import databaseSeed from '@database/AppDatabase.seed.json';
import { tContactSeedModel } from '@database/models/Contacts.model';

export const initDb = async (db: SQLiteDatabase) => {
  const DATABASE_VERSION = 1;

  const result = await db.getFirstAsync<{ readonly user_version: number }>(
    'PRAGMA user_version',
  );

  let currentDbVersion = result?.user_version || 0;

  if (currentDbVersion >= DATABASE_VERSION) {
    return;
  }

  if (currentDbVersion === 0) {
    await db.execAsync(`
        PRAGMA journal_mode = 'wal';
        CREATE TABLE IF NOT EXISTS contacts (
            id TEXT PRIMARY KEY,
            name TEXT,
            email TEXT UNIQUE,
            phone TEXT,
            department TEXT
        );
    `);
    const seed = databaseSeed as tContactSeedModel[];

    const statement = await db.prepareAsync(
      'INSERT INTO contacts (id, name, phone, email, department) VALUES ($id, $name, $phone, $email, $department)',
    );

    try {
      const promises = seed.map(async item => {
        await statement.executeAsync({
          $id: item.id,
          $name: item.name,
          $phone: item.phone || null,
          $email: item.email,
          $department:
            departmentSeedMapper[item.department] || eDepartment.UNKNOWN,
        });
      });
      await Promise.all(promises);
    } finally {
      await statement.finalizeAsync();
    }
    currentDbVersion = 1;
  }

  await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
};
