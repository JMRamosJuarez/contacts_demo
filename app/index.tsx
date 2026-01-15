import React from 'react';

import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import AppButton from '@components/AppButton/AppButton.component';
import Contacts from '@components/Contacts/Contacts.component';
import DepartmentSelector from '@components/DepartmentSelector/DepartmentSelector.component';
import PaginationData from '@components/PaginationData/PaginationData.component';
import { useGetContactsAction } from '@contacts/Contacts.actions';
import { useSelectedDepartment } from '@contacts/selectors/Contacts.selectors';
import { DEFAULT_PAGE_LIMIT } from '@core/App.types';

const Filters: React.FC = () => {
  const selected = useSelectedDepartment();

  const getContacts = useGetContactsAction();

  return (
    <DepartmentSelector
      selected={selected}
      onDepartmentSelected={department =>
        getContacts({
          department,
          pageRequest: { page: 1, limit: DEFAULT_PAGE_LIMIT },
        })
      }
    />
  );
};

const ContactsScreen: React.FC = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const safeInsets = useSafeAreaInsets();
  return (
    <>
      <PaginationData />
      <Filters />
      <Contacts />
      <AppButton
        style={{
          padding: 8,
          marginTop: 8,
          marginBottom: safeInsets.bottom + 8,
          marginHorizontal: 16,
        }}
        title={{ value: t('create_contact') }}
        onPress={() => {
          router.navigate('/contacts/create');
        }}
      />
    </>
  );
};

export default ContactsScreen;
