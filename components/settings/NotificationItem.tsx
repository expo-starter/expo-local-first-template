import {Linking, Platform} from "react-native";

import {Text} from "@/components/ui/text";
import {Bell} from '@/lib/icons';
import * as IntentLauncher from "expo-intent-launcher";

import ListItem from "@/components/ui/list-item";
import {usePermissions} from "expo-notifications";





export const NotificationItem = () => {

  const [permissionResponse, requestPermission] = usePermissions();

  const openSettingApp = async () => {
    if (Platform.OS === "ios") {
      await Linking.openSettings();
    } else {
      IntentLauncher.startActivityAsync(
        IntentLauncher.ActivityAction.LOCALE_SETTINGS,
      );
    }
  };
  const hasPermissionDenied = permissionResponse?.status === "denied";
  const handleRequestPermissions = async () => {
    await requestPermission();

  };
  return (
    <ListItem
      itemLeft={(props) => <Bell {...props} />} // props adds size and color attributes
      label="Notifications"
      onPress={() => {
        if (hasPermissionDenied) {
          openSettingApp();
        } else {
          handleRequestPermissions();
        }
      }}
      itemRight={() => <Text className="text-muted-foreground">
        {
          permissionResponse?.granted
            ? "Enabled"
            : "Disabled"
        }
      </Text>}
    />
  );
};
