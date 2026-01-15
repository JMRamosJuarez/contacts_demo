import React from 'react';

import Ionicons from '@expo/vector-icons/Ionicons';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';

import AppUserAvatar from '@components/AppUserAvatar/AppUserAvatar.component';
import {
  CONTACT_ITEM_HEIGHT,
  tContactListItemProps,
} from '@components/Contacts/ListItem/Contact.props';
import { styles } from '@components/Contacts/ListItem/Contact.styles';
import { useDeleteContactAction } from '@contacts/Contacts.actions';
import {
  useContactState,
  useContactUpdates,
} from '@contacts/selectors/Contact.selectors';

const ContactListItem: React.FC<tContactListItemProps> = ({
  contact,
  onPress,
}) => {
  const { t } = useTranslation('departments');
  const updates = useContactUpdates(contact);
  const state = useContactState(contact.id);
  const deleteContact = useDeleteContactAction();
  return (
    <View
      style={[
        {
          height: CONTACT_ITEM_HEIGHT,
        },
        styles.container,
      ]}>
      <TouchableOpacity
        style={{ flex: 1, flexDirection: 'row', gap: 8 }}
        activeOpacity={0.85}
        onPress={() => onPress(contact)}>
        <AppUserAvatar size={40} name={updates.name} />
        <View style={{ flex: 1, gap: 2 }}>
          <Text numberOfLines={1} style={styles.name}>
            {updates.name}
          </Text>
          <Text numberOfLines={1} style={styles.email}>
            {t(updates.department)}
          </Text>
        </View>
      </TouchableOpacity>
      {state === 'loading' ? (
        <ActivityIndicator size={20} color={'gray'} />
      ) : (
        <Ionicons
          name="trash"
          size={20}
          color="gray"
          onPress={() => deleteContact(contact.id)}
        />
      )}
    </View>
  );
};

export default ContactListItem;
