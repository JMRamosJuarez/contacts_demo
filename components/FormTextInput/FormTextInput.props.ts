import { StyleProp, TextInputProps, TextStyle, ViewStyle } from 'react-native';

export default interface FormTextInputProps {
  readonly style?: StyleProp<ViewStyle>;
  readonly label: {
    readonly style?: StyleProp<TextStyle>;
    readonly text: string;
  };
  readonly error?: {
    readonly style?: StyleProp<TextStyle>;
    readonly text: string;
  };
  readonly startIcon?: React.ReactNode;
  readonly endIcon?: React.ReactNode;
  readonly input?: TextInputProps;
}
