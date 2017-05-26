import React from 'react';
import { View } from 'react-native';
import Ripple from './Ripple';

export default () => (
  <Ripple styles={{ margin: '50%' }} size={30}>
    <View
      style={{ width: 30, height: 30, backgroundColor: '#FF0000' }}
    />
  </Ripple>
);
