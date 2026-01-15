export type tPageRequest = {
  readonly page: number;
  readonly limit: number;
};

export type tPage = {
  readonly current: number;
  readonly next: number;
  readonly prev: number;
};

export type tPageResult<T> = {
  readonly items: number;
  readonly pages: number;
  readonly page: tPage;
  readonly data: T[];
};

export const DEFAULT_PAGE_LIMIT = 15;
