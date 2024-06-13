// __mocks__/expo-blur.js
import React from 'react';
import { View } from 'react-native';

export const LinearGradient = ({ children, ...props }) => {
  return <View {...props}>{children}</View>;
};