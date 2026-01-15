import React from 'react';

import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';

import { useSelectedDepartment } from '@contacts/selectors/Contacts.selectors';

const ContactsEmpty: React.FC = () => {
  const { t } = useTranslation();
  const departmentsTranslation = useTranslation('departments');
  const department = useSelectedDepartment();
  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <Text style={{ textAlign: 'center' }}>
        {t('empty_contacts', {
          department: departmentsTranslation.t(department),
        })}
      </Text>
    </View>
  );
};

export default ContactsEmpty;
