import React from 'react';

import { StatusBar } from 'expo-status-bar';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';

const App: React.FC = () => {
  const { t } = useTranslation();
  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <StatusBar style="auto" />
      <Text style={{ textAlign: 'center' }}>{t('hello')}</Text>
    </View>
  );
};

export default App;
