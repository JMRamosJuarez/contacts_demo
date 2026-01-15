import { StyleProp, TextStyle, TouchableOpacityProps } from 'react-native';

export type tAppButtonProps = TouchableOpacityProps & {
  readonly title: {
    readonly style?: StyleProp<TextStyle>;
    readonly value: string;
  };
  readonly isLoading?: boolean;
};
