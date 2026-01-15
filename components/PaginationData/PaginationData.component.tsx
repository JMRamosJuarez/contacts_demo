import React from 'react';

import { useTranslation } from 'react-i18next';
import { Text } from 'react-native';

import { useContactsPagination } from '@contacts/selectors/Contacts.pagination';

const PaginationData: React.FC = () => {
  const { t } = useTranslation();
  const pagination = useContactsPagination();
  return (
    <>
      <Text style={{ marginHorizontal: 4 }}>
        {t('total_results', { total: pagination.items })}
      </Text>
    </>
  );
};

export default PaginationData;
