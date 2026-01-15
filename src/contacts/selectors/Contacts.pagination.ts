import { useSelector } from '@legendapp/state/react';

import { contacts$ } from '@contacts/Contacts.observables';

export const useContactsPagination = () =>
  useSelector(() => {
    return contacts$.pagination.get();
  });
