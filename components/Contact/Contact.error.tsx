import React from 'react';

import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';

import { useContactError } from '@contacts/selectors/Contact.selectors';

const ContactError: React.FC<{
  readonly id: string;
}> = ({ id }) => {
  const { t } = useTranslation('errors');
  const error = useContactError(id);
  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <Text style={{ textAlign: 'center' }}>{t(error.type)}</Text>
    </View>
  );
};

export default ContactError;
