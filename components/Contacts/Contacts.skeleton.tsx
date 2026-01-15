import React, { useMemo } from 'react';

import { FlatList } from 'react-native';

import { CONTACT_ITEM_HEIGHT } from '@components/Contacts/ListItem/Contact.props';
import ContactListItemSkeleton from '@components/Contacts/ListItem/Contact.skeleton';
import ListSeparator from '@components/ListSeparator/ListSeparator.component';
import { SkeletonProvider } from '@components/Skeleton/Skeleton.provider';

const ContactsSkeleton: React.FC<{
  readonly length: number;
}> = ({ length }) => {
  const data = useMemo(() => Array.from({ length }), [length]);
  return (
    <SkeletonProvider>
      <FlatList
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingVertical: 4 }}
        ItemSeparatorComponent={ListSeparator}
        getItemLayout={(_, index) => ({
          length: CONTACT_ITEM_HEIGHT,
          offset: CONTACT_ITEM_HEIGHT * index,
          index,
        })}
        keyExtractor={(_, index) => `${index}`}
        data={data}
        renderItem={() => {
          return <ContactListItemSkeleton />;
        }}
      />
    </SkeletonProvider>
  );
};

export default ContactsSkeleton;
