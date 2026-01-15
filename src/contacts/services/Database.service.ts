import { useMemo } from 'react';

import { useSQLiteContext } from 'expo-sqlite';

import { mapContactDbModel } from '@contacts/Contacts.mappers';
import { tContact, tContactsRequest } from '@contacts/Contacts.types';
import { AppError, AppErrorType } from '@core/App.error';
import { tPageResult } from '@core/App.types';
import { tContactDbModel } from '@database/models/Contacts.model';

export interface IContactsService {
  create(contact: tContact): Promise<tContact>;
  read(request: tContactsRequest): Promise<tPageResult<tContact>>;
  findBy(id: string): Promise<tContact>;
  update(contact: tContact): Promise<tContact>;
  deleteBy(id: string): Promise<string>;
}

export const useContactsDbService = () => {
  const db = useSQLiteContext();
  return useMemo<IContactsService>(
    () => ({
      create: async (contact: tContact): Promise<tContact> => {
        const statement = await db.prepareAsync(
          'INSERT INTO contacts (id, name, phone, email, department) VALUES ($id, $name, $phone, $email, $department)',
        );
        try {
          await statement.executeAsync({
            $id: contact.id,
            $name: contact.name,
            $phone: contact.phone || null,
            $email: contact.email,
            $department: contact.department,
          });
          return contact;
        } finally {
          await statement.finalizeAsync();
        }
      },
      read: async ({
        department,
        pageRequest,
      }: tContactsRequest): Promise<tPageResult<tContact>> => {
        const searchStatement = await db.prepareAsync(
          'SELECT * FROM contacts WHERE department = $department ORDER BY name ASC LIMIT $limit OFFSET $offset',
        );
        const countStatement = await db.prepareAsync(
          'SELECT COUNT(*) as total FROM contacts WHERE department = $department',
        );
        try {
          const searchResult =
            await searchStatement.executeAsync<tContactDbModel>({
              $department: department,
              $limit: pageRequest.limit,
              $offset: (pageRequest.page - 1) * pageRequest.limit,
            });

          const countResult = await countStatement.executeAsync<{
            readonly total: number;
          }>({
            $department: department,
          });

          const count = await countResult.getFirstAsync();
          const items = count?.total || 0;

          const pages = Math.ceil(items / pageRequest.limit);

          const models = await searchResult.getAllAsync();

          const data = models.map(mapContactDbModel);

          return {
            pages,
            items,
            page: {
              current: pageRequest.page,
              next: pageRequest.page < pages ? pageRequest.page + 1 : -1,
              prev: pageRequest.page > 1 ? pageRequest.page - 1 : -1,
            },
            data,
          };
        } finally {
          await countStatement.finalizeAsync();
          await searchStatement.finalizeAsync();
        }
      },
      findBy: async (id: string): Promise<tContact> => {
        const statement = await db.prepareAsync(
          'SELECT * FROM contacts WHERE id = $id',
        );
        try {
          const result = await statement.executeAsync<tContactDbModel>({
            $id: id,
          });
          const model = await result.getFirstAsync();
          if (!model) {
            throw new AppError(
              AppErrorType.CONTACT_NOT_FOUND,
              '(findBy) Contact not found',
            );
          }
          return mapContactDbModel(model);
        } finally {
          await statement.finalizeAsync();
        }
      },
      update: async (contact: tContact): Promise<tContact> => {
        const statement = await db.prepareAsync(
          `UPDATE contacts 
            SET name = $name, 
                phone = $phone, 
                email = $email,
                department = $department
            WHERE id = $id`,
        );
        try {
          await statement.executeAsync({
            $id: contact.id,
            $name: contact.name,
            $phone: contact.phone || null,
            $email: contact.email,
            $department: contact.department,
          });
          return contact;
        } finally {
          await statement.finalizeAsync();
        }
      },
      deleteBy: async (id: string): Promise<string> => {
        const statement = await db.prepareAsync(
          `DELETE FROM contacts WHERE id = $id`,
        );
        try {
          await statement.executeAsync({
            $id: id,
          });
          return id;
        } finally {
          await statement.finalizeAsync();
        }
      },
    }),
    [db],
  );
};
