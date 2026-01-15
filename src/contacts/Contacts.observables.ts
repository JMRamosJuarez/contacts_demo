import { observable } from '@legendapp/state';

import { tBaseState, tPaginationState } from '@core/App.state';
import { eDepartment, tContact } from 'src/contacts/Contacts.types';

export const contacts$ = observable<{
  department: eDepartment;
  pagination: tPaginationState;
  state: tBaseState<tContact[]>;
  container: Record<string, tBaseState<tContact>>;
}>({
  department: eDepartment.UNKNOWN,
  pagination: {
    status: 'waiting',
    items: 0,
    pages: 0,
    page: { current: -1, prev: -1, next: -1 },
  },
  state: { type: 'waiting' },
  container: {},
});
