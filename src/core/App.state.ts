import { tAppError } from '@core/App.error';
import { tPage } from '@core/App.types';

export type tWaitingState = {
  readonly type: 'waiting';
};

export type tLoadingState = {
  readonly type: 'loading';
};

export type tEmptyState = {
  readonly type: 'empty';
};

export type tErrorState = {
  readonly type: 'error';
  readonly error: tAppError;
};

export type tSuccessState<T> = {
  readonly type: 'success';
  readonly data: T;
};

export type tBaseState<T> =
  | tWaitingState
  | tLoadingState
  | tErrorState
  | tEmptyState
  | tSuccessState<T>;

export type tPaginationStatus = 'waiting' | 'loading' | 'success' | 'error';

export type tPaginationState = {
  readonly status: tPaginationStatus;
  readonly items: number;
  readonly pages: number;
  readonly page: tPage;
};
