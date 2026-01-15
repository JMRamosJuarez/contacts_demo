import React, { useEffect } from 'react';

import ContactsData from '@components/Contacts/Contacts.data';
import ContactsEmpty from '@components/Contacts/Contacts.empty';
import ContactsError from '@components/Contacts/Contacts.error';
import ContactsSkeleton from '@components/Contacts/Contacts.skeleton';
import { useGetContactsAction } from '@contacts/Contacts.actions';
import { eDepartment } from '@contacts/Contacts.types';
import { useContactsState } from '@contacts/selectors/Contacts.selectors';

const Contacts: React.FC = () => {
  const getContacts = useGetContactsAction();

  useEffect(() => {
    getContacts({
      department: eDepartment.SALES,
      pageRequest: { page: 1, limit: 20 },
    });
  }, [getContacts]);

  const state = useContactsState();

  switch (state) {
    case 'waiting':
    case 'loading':
      return <ContactsSkeleton length={20} />;
    case 'error':
      return <ContactsError />;
    case 'empty':
      return <ContactsEmpty />;
    case 'success':
      return <ContactsData />;
  }
};

export default Contacts;
