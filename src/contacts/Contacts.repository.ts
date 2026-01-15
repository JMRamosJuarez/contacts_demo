import { useMemo } from 'react';

import { tContact, tContactsRequest } from '@contacts/Contacts.types';
import { useContactsDbService } from '@contacts/services/Database.service';
import { tPageResult } from '@core/App.types';

export interface IContactsRepository {
  create(contact: tContact): Promise<tContact>;
  read(request: tContactsRequest): Promise<tPageResult<tContact>>;
  findBy(id: string): Promise<tContact>;
  update(contact: tContact): Promise<tContact>;
  deleteBy(id: string): Promise<string>;
}

export const useContactsRepository = () => {
  const dbService = useContactsDbService();
  return useMemo<IContactsRepository>(
    () => ({
      create: async (contact: tContact): Promise<tContact> => {
        return await dbService.create(contact);
      },
      read: async (
        request: tContactsRequest,
      ): Promise<tPageResult<tContact>> => {
        return await dbService.read(request);
      },
      findBy: async (id: string): Promise<tContact> => {
        return await dbService.findBy(id);
      },
      update: async (contact: tContact): Promise<tContact> => {
        return await dbService.update(contact);
      },
      deleteBy: async (id: string): Promise<string> => {
        return await dbService.deleteBy(id);
      },
    }),
    [dbService],
  );
};
