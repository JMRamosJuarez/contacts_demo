import React from 'react';

import { ActivityIndicator, Text, TouchableOpacity } from 'react-native';

import { tAppButtonProps } from '@components/AppButton/AppButton.props';

const AppButton: React.FC<tAppButtonProps> = props => {
  const { style, title, isLoading } = props;
  return (
    <TouchableOpacity
      {...props}
      style={[
        {
          flexDirection: 'row',
          justifyContent: 'center',
          gap: 4,
          padding: 8,
          borderWidth: 1,
          borderRadius: 4,
        },
        style,
      ]}>
      <Text style={[title.style, { lineHeight: 20 }]}>{title.value}</Text>
      {isLoading === true && <ActivityIndicator size={20} />}
    </TouchableOpacity>
  );
};

export default AppButton;
