import * as React from 'react';
import {Linking, Platform, View} from 'react-native';
import {Button, Text} from '@/components/ui';
import List, {ListHeader} from "@/components/ui/list";
import ListItem from "@/components/ui/list-item";
import {Muted} from "@/components/ui/typography";
import {ScrollView} from 'react-native-gesture-handler';
import {Archive, Bell, BookOpen, Languages, Palette, Send, Shield, Star} from '@/lib/icons';
import * as WebBrowser from "expo-web-browser";
import * as BottomSheetNative from "@/components/primitives/bottomSheet/bottom-sheet.native";
import {useRef} from "react";

import {
  type BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import {useRouter} from 'expo-router';
import {ThemeSettingItem} from '@/components/settings/ThemeSettings';
type BottomSheetProps = {
  children: React.ReactNode;
};
const {
  BottomSheet,
  BottomSheetCloseTrigger,
  BottomSheetContent,
  BottomSheetHeader,
  BottomSheetOpenTrigger,
  BottomSheetTextInput,
  BottomSheetView,
} = BottomSheetNative;

function ThemeBottomSheet({children}: BottomSheetProps) {
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const router = useRouter();

  React.useEffect(() => {
    bottomSheetRef.current?.present();
  }, []);
  const handeDismiss = () => {
    bottomSheetRef.current?.close()
  };

  return (

    <View className="flex-1 ">
      <BottomSheet>
        <BottomSheetContent
          ref={bottomSheetRef}
          enableDynamicSizing={false}
          snapPoints={["33%"]}

        >
          <BottomSheetHeader>
            <Text className="text-foreground text-xl font-bold text-center pb-1">
              Theme
            </Text>
          </BottomSheetHeader>
          <BottomSheetView className="flex flex-auto justify-center">
            {children}
          </BottomSheetView>
        </BottomSheetContent>
      </BottomSheet>
    </View>
  );
}
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
        <ThemeSettingItem />
        {/* <ListItem
          itemLeft={(props) => <Palette {...props} />} // props adds size and color attributes
          label="Theme"

          href="/general" // automatically adds a ">" icon
        /> */}
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
