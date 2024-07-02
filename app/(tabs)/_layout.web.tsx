import {Button, Text} from '@/components/ui';
import {List} from '@/lib/icons/List';
import {Settings} from '@/lib/icons/Settings';

import {Slot} from 'expo-router';
import React from 'react';
import {Pressable} from 'react-native';
export const unstable_settings = {
  initialRouteName: "index",
};

export default function TabLayout() {
  return (
    <Slot />
  );
}
