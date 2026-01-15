import React from 'react';

import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';

import { eDepartment } from '@contacts/Contacts.types';
import { useContactById } from '@contacts/selectors/Contact.selectors';

const ContactData: React.FC<{
  readonly id: string;
}> = ({ id }) => {
  const contact = useContactById(id);
  const { t } = useTranslation('departments');
  return (
    <View style={{ flex: 1 }}>
      <Text>{contact?.name}</Text>
      <Text>{contact?.email}</Text>
      {contact?.phone && <Text>{contact.phone}</Text>}
      <Text>{t(contact?.department || eDepartment.UNKNOWN)}</Text>
    </View>
  );
};

export default ContactData;
