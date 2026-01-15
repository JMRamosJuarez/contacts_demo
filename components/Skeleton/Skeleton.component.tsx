import React, { memo } from 'react';

import { Animated, View } from 'react-native';
import { Defs, LinearGradient, Rect, Stop, Svg } from 'react-native-svg';

import SkeletonProps from '@components/Skeleton/Skeleton.props';
import { useSkeletonAnimation } from '@components/Skeleton/Skeleton.provider';
import { styles } from '@components/Skeleton/Skeleton.styles';

const AnimatedSvg = Animated.createAnimatedComponent(Svg);

const Skeleton: React.FC<SkeletonProps> = props => {
  const { width, height } = props;

  const animatedValue = useSkeletonAnimation();

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-width, width],
  });

  return (
    <View
      {...props}
      style={[
        {
          width,
          height,
        },
        styles.wrap,
        props.style,
      ]}>
      <Svg style={styles.skeleton}>
        <Rect
          x={0}
          y={0}
          width={'100%'}
          height={'100%'}
          opacity={0.45}
          fill={'#BDBDBD'}
        />
      </Svg>
      <AnimatedSvg style={[styles.skeleton, { transform: [{ translateX }] }]}>
        <Defs>
          <LinearGradient
            id="gradient-background"
            x1={'0%'}
            y1={'0%'}
            x2={'100%'}
            y2={'0%'}>
            <Stop offset={'0%'} stopColor={'#BDBDBD'} stopOpacity="0.05" />
            <Stop offset={'50%'} stopColor={'#BDBDBD'} stopOpacity="1" />
            <Stop offset={'100%'} stopColor={'#BDBDBD'} stopOpacity="0.05" />
          </LinearGradient>
        </Defs>
        <Rect
          x={0}
          y={0}
          width={'100%'}
          height={'100%'}
          fill="url(#gradient-background)"
        />
      </AnimatedSvg>
    </View>
  );
};

export default memo(Skeleton);
