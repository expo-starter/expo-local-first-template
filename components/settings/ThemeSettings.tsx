import {Pressable, View} from "react-native";

import {H4} from '@/components/ui/typography';
import {BottomSheet, BottomSheetContent, BottomSheetHeader, BottomSheetOpenTrigger, BottomSheetView} from "@/components/primitives/bottomSheet/bottom-sheet.native";
import {Text} from "@/components/ui//text";
import {MoonStar, Palette, Smartphone, Sun} from '@/lib/icons';

import ListItem from "@/components/ui/list-item";
import {Check} from "@/lib/icons/Check";
import {useColorScheme} from "nativewind";
import {useMemo, useState} from "react";
type ItemData = {
  title: string;
  subtitle: string;
  value: "light" | "dark" | "system";
  icon: JSX.Element;
};

type ItemProps = {
  item: ItemData;
  onPress: () => void;
  selected: boolean;
};

function ThemeItem({item, onPress, selected}: ItemProps) {
  return (
    <Pressable className="py-4" onPress={onPress}>
      <View className="flex bg-pink flex-row justify-between">
        <View className="pr-4 pt-1">{item.icon}</View>
        <View className="flex-1">
          <H4>{item.title}</H4>
          <Text className="text-sm text-muted-foreground">{item.subtitle}</Text>
        </View>
        <View>{selected && <Check className="text-accent-foreground" />}</View>
      </View>
    </Pressable>
  );
}

export const ThemeSettingItem = () => {
  const [selectedTheme, setSelectedTheme] = useState<string>(
  );
  const {setColorScheme} = useColorScheme();

  const menus: ItemData[] = useMemo(
    () => [
      {
        title: "Device settings",
        subtitle: "Default to your device's appearance",
        value: "system",
        icon: <Smartphone className="text-foreground" />,
      },
      {
        title: "Dark mode",
        subtitle: "Always use Dark mode",
        value: "dark",
        icon: <MoonStar className="text-foreground" />,
      },
      {
        title: "Light mode",
        subtitle: "Always use Light mode",
        value: "light",
        icon: <Sun className="text-foreground" />,
      },
    ],
    [],
  );

  function onChange(value: "light" | "dark" | "system") {
    setColorScheme(value);
    // setItem("theme", value);
    setSelectedTheme(value);
  }

  return (
    <BottomSheet>
      <BottomSheetOpenTrigger asChild>
        <ListItem
          itemLeft={(props) => <Palette {...props} />} // props adds size and color attributes
          label="Theme"

        />
      </BottomSheetOpenTrigger>
      <BottomSheetContent>
        <BottomSheetHeader className="text-center">
          <Text className="text-foreground text-xl font-bold text-center pb-1">
            Select Theme
          </Text>
        </BottomSheetHeader>
        <BottomSheetView className='gap-5 pt-6'>
          {menus.map((item) => (
            <ThemeItem
              key={item.title}
              item={item}
              onPress={() => onChange(item.value)}
              selected={item.value === selectedTheme}
            />
          ))}
        </BottomSheetView>
      </BottomSheetContent>
    </BottomSheet>
  );
};
