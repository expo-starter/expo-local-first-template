import * as React from 'react';
import {Linking, Platform, View} from 'react-native';
import {Text} from '@/components/ui';
import List, {ListHeader} from "@/components/ui/list";
import ListItem from "@/components/ui/list-item";
import {Muted} from "@/components/ui/typography";
import {ScrollView} from 'react-native-gesture-handler';
import {Archive, Bell, BookOpen, Languages, Palette, Send, Shield, Star} from '@/lib/icons';
import * as WebBrowser from "expo-web-browser";

export default function Settings() {
  const openExternalURL = (url: string) => {
    if (Platform.OS === "web") {
      Linking.openURL(url);
    } else {
      WebBrowser.openBrowserAsync(url);
    }
  };
  return (
    <ScrollView className="flex-1 w-full px-6 pt-4 bg-background gap-y-6">

      <List>
        <ListHeader>
          <Muted>App</Muted>
        </ListHeader>

        <ListItem
          itemLeft={(props) => <Palette {...props} />} // props adds size and color attributes
          label="Theme"

          href="/general" // automatically adds a ">" icon
        />
        <ListItem
          itemLeft={(props) => <Languages {...props} />} // props adds size and color attributes
          label="Language"

          href="/general" // automatically adds a ">" icon
        />
        {/* <ListItem
          itemLeft={(props) => <PlusCircle {...props} />} // props adds size and color attributes
          label="Reorder Habits"
        // variant='destructive'

        /> */}
        <ListItem
          itemLeft={(props) => <Bell {...props} />} // props adds size and color attributes
          label="Notifications"

          href="/general" // automatically adds a ">" icon
        />
        <ListItem
          itemLeft={(props) => <Archive {...props} />} // props adds size and color attributes
          label="Archive Habits"
        // variant="link"
        />

        <ListHeader className='pt-8'>
          <Muted>GENERAL</Muted>
        </ListHeader>
        <ListItem
          itemLeft={(props) => <Star {...props} />} // props adds size and color attributes
          label="Give us a start"
          onPress={() => openExternalURL("https://github.com/expo-starter/expo-template")}
        />
        <ListItem
          itemLeft={(props) => <Send {...props} />} // props adds size and color attributes
          label="Send Feedback"

          href="https://expostarter.com"
        />
        <ListItem
          itemLeft={(props) => <Shield {...props} />} // props adds size and color attributes
          label="Privacy Policy"

          href="https://expostarter.com"
        />
        <ListItem
          itemLeft={(props) => <BookOpen {...props} />} // props adds size and color attributes
          label="Terms of service"
          href="https://expostarter.com"
        />
      </List>
    </ScrollView>
  );
}
