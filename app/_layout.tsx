import React from 'react';

import { Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';

import AppDatabaseProvider from '@database/AppDatabase.provider';

import '@localization/index';

const RootLayout: React.FC = () => {
  const { t } = useTranslation('screen_titles');
  return (
    <AppDatabaseProvider>
      <Stack>
        <Stack.Screen name="index" options={{ title: t('contacts') }} />
        <Stack.Screen
          name="contacts/[id]"
          options={{ title: t('contact_detail') }}
        />
        <Stack.Screen
          name="contacts/create"
          options={{ title: t('new_contact') }}
        />
      </Stack>
    </AppDatabaseProvider>
  );
};

export default RootLayout;
