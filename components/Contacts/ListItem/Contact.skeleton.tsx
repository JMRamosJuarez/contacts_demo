import React, { useMemo } from 'react';

import { StyleProp, View, ViewStyle } from 'react-native';

import { CONTACT_ITEM_HEIGHT } from '@components/Contacts/ListItem/Contact.props';
import { styles } from '@components/Contacts/ListItem/Contact.styles';
import Skeleton from '@components/Skeleton/Skeleton.component';
import { useDimensions } from '@core/App.hooks';

const ContactListItemSkeleton: React.FC<{
  readonly style?: StyleProp<ViewStyle>;
}> = ({ style }) => {
  const { screen } = useDimensions();

  const skeletonW = useMemo(() => {
    return screen.width - 40 - 16 - 8 - 4;
  }, [screen.width]);

  return (
    <View
      style={[
        {
          height: CONTACT_ITEM_HEIGHT,
        },
        styles.container,
        style,
      ]}>
      <Skeleton width={40} height={40} style={{ borderRadius: 40 }} />
      <View style={{ flex: 1, gap: 2, padding: 8 }}>
        <Skeleton width={skeletonW} height={20} />
        <Skeleton width={skeletonW} height={18} />
      </View>
    </View>
  );
};

export default ContactListItemSkeleton;
