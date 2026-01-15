import React from 'react';

import { useRouter } from 'expo-router';
import { FlatList } from 'react-native';

import ContactsFooter from '@components/Contacts/Contacts.footer';
import ContactListItem from '@components/Contacts/ListItem/Contact.item';
import { CONTACT_ITEM_HEIGHT } from '@components/Contacts/ListItem/Contact.props';
import ListSeparator from '@components/ListSeparator/ListSeparator.component';
import { usePaginateContactsAction } from '@contacts/Contacts.actions';
import { useContacts } from '@contacts/selectors/Contacts.selectors';

const ContactsData: React.FC = () => {
  const data = useContacts();
  const router = useRouter();
  const paginate = usePaginateContactsAction();
  return (
    <FlatList
      style={{ flex: 1 }}
      contentContainerStyle={{ paddingVertical: 4 }}
      ItemSeparatorComponent={ListSeparator}
      data={data}
      keyExtractor={item => item.id}
      getItemLayout={(_, index) => ({
        length: CONTACT_ITEM_HEIGHT,
        offset: CONTACT_ITEM_HEIGHT * index,
        index,
      })}
      onEndReached={() => {
        paginate();
      }}
      ListFooterComponent={ContactsFooter}
      renderItem={({ item }) => {
        return (
          <ContactListItem
            contact={item}
            onPress={contact => {
              router.push(`/contacts/${contact.id}`);
            }}
          />
        );
      }}
    />
  );
};

export default ContactsData;
