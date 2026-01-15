import { TouchableOpacityProps } from 'react-native';

type AppUserAvatarProps = TouchableOpacityProps & {
  readonly size: number;
  readonly name: string;
  readonly img?: string;
  readonly indicator?: {
    readonly color: string;
  };
};

export default AppUserAvatarProps;
