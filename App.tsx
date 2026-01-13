import React from 'react';

import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';

const App: React.FC = () => {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar style="auto" />
    </View>
  );
};

export default App;
