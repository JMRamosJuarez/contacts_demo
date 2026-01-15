import React, { PropsWithChildren } from 'react';

import { SQLiteProvider } from 'expo-sqlite';

import { initDb } from '@database/AppDatabase.init';

const AppDatabaseProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <SQLiteProvider databaseName="contacts.db" onInit={initDb}>
      {children}
    </SQLiteProvider>
  );
};

export default AppDatabaseProvider;
