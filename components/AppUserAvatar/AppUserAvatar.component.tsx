import React, { useMemo } from 'react';

import { Image, TouchableOpacity, View } from 'react-native';
import {
  Circle,
  Defs,
  LinearGradient,
  Stop,
  Svg,
  Text as SvgText,
} from 'react-native-svg';

import AppUserAvatarProps from '@components/AppUserAvatar/AppUserAvatar.props';

const AppUserAvatar: React.FC<AppUserAvatarProps> = props => {
  const { size, name } = props;

  const initial = useMemo(() => {
    if (name.length > 0) {
      return name[0].toUpperCase();
    }
    return '?';
  }, [name]);

  const fontSize = useMemo(() => size / 2, [size]);

  const picture = useMemo(() => {
    return props.img || '';
  }, [props.img]);

  const indicatorDiameter = useMemo(() => props.size * 0.25, [props.size]);

  return (
    <TouchableOpacity activeOpacity={0.85} {...props}>
      {picture.length === 0 && (
        <Svg width={props.size} height={props.size}>
          <Defs>
            <LinearGradient id="gradient" x1="0%" y1="100%" x2="0%" y2="0%">
              <Stop offset="0" stopColor="#668CED" stopOpacity="1" />
              <Stop offset="1" stopColor="#4C18E2" stopOpacity="1" />
            </LinearGradient>
          </Defs>
          <Circle
            r={size / 2}
            cx={size / 2}
            cy={size / 2}
            fill={'url(#gradient)'}
          />
          {props.indicator && (
            <Circle
              r={indicatorDiameter / 2}
              cx={props.size - indicatorDiameter / 2}
              cy={props.size - indicatorDiameter / 2}
              fill={props.indicator.color}
              strokeWidth={1}
              stroke={'gray'}
            />
          )}
          <SvgText
            x={size / 2}
            y={size / 2 + fontSize / 3}
            fontSize={fontSize}
            textAnchor="middle"
            fontWeight={'bold'}
            fill={'white'}>
            {initial}
          </SvgText>
        </Svg>
      )}
      {picture.length > 0 && (
        <View style={{ width: props.size, height: props.size }}>
          <Image
            width={props.size}
            height={props.size}
            borderRadius={props.size}
            source={{ uri: picture }}
          />
          {props.indicator && (
            <View
              style={[
                {
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: 'gray',
                },
                {
                  width: indicatorDiameter,
                  height: indicatorDiameter,
                  backgroundColor: props.indicator.color,
                },
              ]}
            />
          )}
        </View>
      )}
    </TouchableOpacity>
  );
};

export default AppUserAvatar;
