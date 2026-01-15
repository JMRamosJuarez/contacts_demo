import { tPageRequest } from '@core/App.types';

export enum eDepartment {
  SALES = 'sales',
  DEVELOPMENT = 'development',
  MARKETING = 'marketing',
  SUPPORT = 'support',
  UNKNOWN = 'unknown',
}

export type tContact = {
  readonly id: string;
  readonly name: string;
  readonly email: string;
  readonly phone?: string;
  readonly department: eDepartment;
};

export type tContactsRequest = {
  readonly department: eDepartment;
  readonly pageRequest: tPageRequest;
};
