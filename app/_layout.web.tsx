import "./global.css";
import {Button} from "@/components/ui";
import {DatabaseProvider} from "@/db/provider";
import {Link, Slot, Stack} from "expo-router";
// This is a general react-dom library and only requires the framework support server rendering.
// Adding it will ensure the body tag has the class="dark" injected when dark mode is enabled,
// this is required for tailwind css/shadcn to style correctly in dark mode.
import {ThemeProvider, useTheme} from "next-themes";
import {Text} from "@/components/ui/text";
import {SettingsIcon} from "lucide-react-native";
import {List} from "@/lib/icons/List"
import {ThemeToggle} from "@/components/ThemeToggle";
import {View} from "react-native";
import {PortalHost} from "@/components/primitives/portal";
import {BottomSheetModalProvider} from "@gorhom/bottom-sheet";
const TopNav = () => {
  return (
    <div className="flex h-14 px-4 flex-row  justify-end  bg-background border-b dark:border-border/60">

    </div>
  );
}
export default function RootLayout() {
  return (
    <>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <DatabaseProvider>
          <BottomSheetModalProvider>


            <div className="flex flex-1 flex-col md:flex-row bg-background">

              <div className=" p-6 flex flex-col justify-between w-[240px] border-r dark:border-border/60">
                <div className="space-y-4">

                  <nav className="flex flex-col justify-start gap-y-5 mt-11">
                    <Link href="/" asChild>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="flex-row gap-2 justify-start"
                      >
                        <List className="text-foreground" />
                        <Text className="text-base">Habits</Text>
                      </Button>
                    </Link>
                    <Link href="/settings" asChild>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="flex-row gap-2 justify-start"
                      >
                        <SettingsIcon />
                        <Text className="text-base">Settings</Text>
                      </Button>
                    </Link>
                  </nav>
                </div>

              </div>
              <div className="flex flex-1 flex-col">
                <TopNav />
                <View className="flex h-[700px]">
                  <Slot />
                </View>

              </div>
            </div>
          </BottomSheetModalProvider>
        </DatabaseProvider>
      </ThemeProvider>
      <PortalHost />
    </>


  );
}
