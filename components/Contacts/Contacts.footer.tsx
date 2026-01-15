import React from 'react';

import ContactListItemSkeleton from '@components/Contacts/ListItem/Contact.skeleton';
import { SkeletonProvider } from '@components/Skeleton/Skeleton.provider';
import { useContactsPagination } from '@contacts/selectors/Contacts.pagination';

const ContactsFooter: React.FC = () => {
  const pagination = useContactsPagination();
  return (
    <SkeletonProvider>
      <ContactListItemSkeleton
        style={{ opacity: pagination.status === 'loading' ? 1 : 0 }}
      />
    </SkeletonProvider>
  );
};

export default ContactsFooter;
