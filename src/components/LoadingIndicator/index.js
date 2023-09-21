import React from 'react';
import { ActivityIndicator, View } from 'react-native';

import { colors } from '../../constraints';

export const LoadingIndicator = ({ style, color, size }) => {
  return (
    <View
      style={style}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
};

LoadingIndicator.defaultProps = {
  style: {
    flex: 1,
    position: 'absolute',
    left: 0,
    top: 0,
    opacity: 0.7,
    backgroundColor: colors.backgroundColor,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10000,
  },
  color: '#fff',
  size: 'large',
};
