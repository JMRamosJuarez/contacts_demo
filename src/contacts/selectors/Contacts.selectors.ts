import { useSelector } from '@legendapp/state/react';

import { contacts$ } from '@contacts/Contacts.observables';
import { AppErrorType } from '@core/App.error';

export const useContactsState = () =>
  useSelector(() => contacts$.state.get().type);

export const useContactsError = () =>
  useSelector(() => {
    const state = contacts$.state.get();
    if (state.type === 'error') {
      return state.error;
    }
    return {
      type: AppErrorType.UNKNOWN_ERROR,
      message: '(useContactsError) Invalid state access',
    };
  });

export const useContacts = () =>
  useSelector(() => {
    const state = contacts$.state.get();
    return state.type === 'success' ? state.data : [];
  });

export const useSelectedDepartment = () =>
  useSelector(() => {
    return contacts$.department.get();
  });
