import { useSelector } from '@legendapp/state/react';

import { appModals$ } from 'src/modals/AppModals.observables';
import { tAppModalData } from 'src/modals/AppModals.types';

export const useAppModal = <T>(id: string) =>
  useSelector(() => {
    return (
      (appModals$.container[id]?.get() as tAppModalData<T>) || {
        visible: false,
      }
    );
  });
