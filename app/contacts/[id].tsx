import React, { useEffect } from 'react';

import { useLocalSearchParams } from 'expo-router';

import ContactData from '@components/Contact/Contact.data';
import ContactError from '@components/Contact/Contact.error';
import ContactSkeleton from '@components/Contact/Contact.skeleton';
import { useGetContactAction } from '@contacts/Contacts.actions';
import { useContactState } from '@contacts/selectors/Contact.selectors';

const Contact: React.FC = () => {
  const { id } = useLocalSearchParams<{ readonly id: string }>();

  const getContact = useGetContactAction();

  useEffect(() => {
    getContact(id);
  }, [getContact, id]);

  const state = useContactState(id);

  switch (state) {
    case 'waiting':
    case 'loading':
      return <ContactSkeleton id={id} />;
    case 'error':
    case 'empty':
      return <ContactError id={id} />;
    case 'success':
      return <ContactData id={id} />;
  }
};

export default Contact;
