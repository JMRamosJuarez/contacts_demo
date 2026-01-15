import { ViewProps } from 'react-native';

type SkeletonProps = ViewProps & {
  readonly width: number;
  readonly height: number;
};

export default SkeletonProps;
