import { useCallback, useEffect, useState } from 'react';

import { Dimensions, ScaledSize } from 'react-native';

export const useDimensions = () => {
  const [dimensions, setDimensions] = useState({
    window: Dimensions.get('window'),
    screen: Dimensions.get('screen'),
  });
  const onChange = useCallback(
    (request: { readonly window: ScaledSize; readonly screen: ScaledSize }) => {
      setDimensions(request);
    },
    [],
  );
  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', onChange);
    return () => subscription.remove();
  }, [onChange]);
  return dimensions;
};
