import { observable } from '@legendapp/state';

import { tAppModalData } from 'src/modals/AppModals.types';

export const appModals$ = observable<{
  container: Record<string, tAppModalData>;
}>({
  container: {},
});
