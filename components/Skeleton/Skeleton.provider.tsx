import { createContext, useContext, useEffect, useRef } from 'react';

import { Animated, Easing } from 'react-native';

export const SkeletonContext = createContext<Animated.Value>(
  new Animated.Value(0),
);

export const useSkeletonAnimation = () => useContext(SkeletonContext);

export const SkeletonProvider: React.FC<{
  readonly children: React.ReactNode;
}> = ({ children }) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const anim = Animated.loop(
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 800,
        easing: Easing.inOut(Easing.linear),
        useNativeDriver: true,
      }),
    );
    anim.start();
    return () => anim.stop();
  }, [animatedValue]);

  return (
    <SkeletonContext.Provider value={animatedValue}>
      {children}
    </SkeletonContext.Provider>
  );
};
