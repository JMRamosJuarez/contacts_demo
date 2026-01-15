import { useCallback } from 'react';

import { appModals$ } from 'src/modals/AppModals.observables';
import { tAppModalVisibility } from 'src/modals/AppModals.types';

export const useDisplayAppModalAction = () => {
  return useCallback(async (request: tAppModalVisibility) => {
    appModals$.container[request.key].set(request.data);
  }, []);
};
