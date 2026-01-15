import { useCallback } from 'react';

import { useRouter } from 'expo-router';

import { contacts$ } from '@contacts/Contacts.observables';
import { useContactsRepository } from '@contacts/Contacts.repository';
import { tContact, tContactsRequest } from '@contacts/Contacts.types';
import { AppError, AppErrorType, tAppError } from '@core/App.error';
import { DEFAULT_PAGE_LIMIT } from '@core/App.types';
import { appModals$ } from 'src/modals/AppModals.observables';

export const useCreateContactAction = () => {
  const dbService = useContactsRepository();
  const router = useRouter();
  return useCallback(
    async (contact: tContact) => {
      try {
        contacts$.container[contact.id].set({ type: 'loading' });
        const create = await dbService.create(contact);
        contacts$.container[contact.id].set({ type: 'success', data: create });
        const department = contacts$.department.get();
        const { items, pages, page, data } = await dbService.read({
          department,
          pageRequest: { page: 1, limit: DEFAULT_PAGE_LIMIT },
        });
        contacts$.pagination.set({
          status: 'success',
          items,
          pages,
          page,
        });
        contacts$.state.set(
          data.length > 0 ? { type: 'success', data } : { type: 'empty' },
        );
        router.replace(`/contacts/${contact.id}`);
      } catch (error: any) {
        if (
          error.message?.includes('UNIQUE constraint failed: contacts.email')
        ) {
          const outputError: tAppError = {
            type: AppErrorType.EMAIL_MUST_BE_UNIQUE,
            message: '(useCreateContactAction) Email must be unique',
          };
          contacts$.container[contact.id].set({
            type: 'error',
            error: outputError,
          });
          appModals$.container[contact.id].set({
            visible: true,
            content: outputError,
          });
          return;
        }
        const outputError: tAppError =
          error instanceof AppError
            ? error.value
            : {
                type: AppErrorType.UNKNOWN_ERROR,
                message: JSON.stringify(error, null, '\t'),
              };
        contacts$.container[contact.id].set({
          type: 'error',
          error: outputError,
        });
      }
    },
    [dbService, router],
  );
};

export const useGetContactsAction = () => {
  const dbService = useContactsRepository();
  return useCallback(
    async (request: tContactsRequest) => {
      try {
        contacts$.department.set(request.department);
        contacts$.state.set({ type: 'loading' });
        contacts$.pagination.set(prev => ({ ...prev, status: 'loading' }));

        const { items, pages, page, data } = await dbService.read(request);

        contacts$.state.set(prev => {
          const input = prev.type === 'success' ? prev.data : [];
          const output = [...input, ...data];
          return output.length > 0
            ? { type: 'success', data: output }
            : { type: 'empty' };
        });

        contacts$.pagination.set({
          status: 'success',
          items,
          pages,
          page,
        });
      } catch (error) {
        const outputError: tAppError =
          error instanceof AppError
            ? error.value
            : {
                type: AppErrorType.UNKNOWN_ERROR,
                message: JSON.stringify(error, null, '\t'),
              };
        contacts$.state.set({ type: 'error', error: outputError });
        contacts$.pagination.set(prev => ({ ...prev, status: 'error' }));
      }
    },
    [dbService],
  );
};

export const usePaginateContactsAction = () => {
  const dbService = useContactsRepository();
  return useCallback(async () => {
    try {
      const {
        status,
        page: { next },
      } = contacts$.pagination.get();

      if (status !== 'loading' && next > 0) {
        const department = contacts$.department.get();

        contacts$.pagination.set(prev => ({ ...prev, status: 'loading' }));

        const { items, page, pages, data } = await dbService.read({
          department,
          pageRequest: { page: next, limit: DEFAULT_PAGE_LIMIT },
        });

        contacts$.state.set(prev => {
          const input = prev.type === 'success' ? prev.data : [];
          const output = [...input, ...data];
          return output.length > 0
            ? { type: 'success', data: output }
            : { type: 'empty' };
        });

        contacts$.pagination.set({
          status: 'success',
          items,
          pages,
          page,
        });
      }
    } catch (_) {
      contacts$.pagination.set(prev => ({ ...prev, status: 'error' }));
    }
  }, [dbService]);
};

export const useGetContactAction = () => {
  const dbService = useContactsRepository();
  return useCallback(
    async (id: string) => {
      try {
        contacts$.container[id].set({ type: 'loading' });
        const data = await dbService.findBy(id);
        contacts$.container[id].set({ type: 'success', data });
      } catch (error) {
        const outputError: tAppError =
          error instanceof AppError
            ? error.value
            : {
                type: AppErrorType.UNKNOWN_ERROR,
                message: JSON.stringify(error, null, '\t'),
              };
        contacts$.container[id].set({ type: 'error', error: outputError });
      }
    },
    [dbService],
  );
};

export const useUpateContactAction = () => {
  const dbService = useContactsRepository();
  return useCallback(
    async (contact: tContact) => {
      try {
        contacts$.container[contact.id].set({ type: 'loading' });
        const data = await dbService.update(contact);
        contacts$.container[contact.id].set({ type: 'success', data });
      } catch (error) {
        const outputError: tAppError =
          error instanceof AppError
            ? error.value
            : {
                type: AppErrorType.UNKNOWN_ERROR,
                message: JSON.stringify(error, null, '\t'),
              };
        contacts$.container[contact.id].set({
          type: 'error',
          error: outputError,
        });
      }
    },
    [dbService],
  );
};

export const useDeleteContactAction = () => {
  const dbService = useContactsRepository();
  return useCallback(
    async (id: string) => {
      try {
        contacts$.container[id].set({ type: 'loading' });
        await dbService.deleteBy(id);
        const department = contacts$.department.get();
        const { data } = await dbService.read({
          department,
          pageRequest: { page: 1, limit: DEFAULT_PAGE_LIMIT },
        });
        contacts$.state.set(
          data.length > 0 ? { type: 'success', data } : { type: 'empty' },
        );
        contacts$.container[id].set({ type: 'waiting' });
      } catch (error) {
        const outputError: tAppError =
          error instanceof AppError
            ? error.value
            : {
                type: AppErrorType.UNKNOWN_ERROR,
                message: JSON.stringify(error, null, '\t'),
              };
        contacts$.container[id].set({ type: 'error', error: outputError });
      }
    },
    [dbService],
  );
};
