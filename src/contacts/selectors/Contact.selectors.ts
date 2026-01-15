import { useSelector } from '@legendapp/state/react';

import { contacts$ } from '@contacts/Contacts.observables';
import { tContact } from '@contacts/Contacts.types';
import { AppError, AppErrorType } from '@core/App.error';

export const useContactState = (id: string) =>
  useSelector(() => {
    const item = contacts$.container[id]?.get();
    return item?.type || 'waiting';
  });

export const useContactError = (id: string) =>
  useSelector(() => {
    const item = contacts$.container[id]?.get();
    if (item?.type === 'error') {
      return item.error;
    }
    return {
      type: AppErrorType.UNKNOWN_ERROR,
      message: '(useContactError) Invalid state access',
    };
  });

export const useContactById = (id: string) =>
  useSelector(() => {
    const item = contacts$.container[id]?.get();
    if (item?.type === 'success') {
      return item.data;
    }
    throw new AppError(
      AppErrorType.UNKNOWN_ERROR,
      '(useContact) Invalid state access',
    );
  });

export const useContactUpdates = (contact: tContact) =>
  useSelector(() => {
    const item = contacts$.container[contact.id]?.get();
    if (item?.type === 'success') {
      return item.data;
    }
    return contact;
  });
