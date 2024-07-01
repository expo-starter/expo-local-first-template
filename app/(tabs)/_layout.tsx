import {List} from '@/lib/icons/List';
import {Settings} from '@/lib/icons/Settings';

import {Tabs} from 'expo-router';
export const unstable_settings = {
  initialRouteName: "index",
};

export default function TabLayout() {
  return (
    <Tabs screenOptions={{tabBarActiveTintColor: 'blue'}}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Habits',
          tabBarIcon: ({color}) => <List className="text-foreground" />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({color}) => <Settings className="text-foreground" />,
        }}
      />
    </Tabs>
  );
}
