import {View, Pressable} from "react-native";
import {useScrollToTop} from "@react-navigation/native";
import {FlashList} from "@shopify/flash-list";
import {eq} from "drizzle-orm";
import {Link, Stack} from "expo-router";
import * as React from "react";
import {useLiveQuery} from "drizzle-orm/expo-sqlite";

import {Text} from "@/components/ui/text";
import {habitTable} from "@/db/schema";
import {Plus} from "@/components/Icons";
import {useMigrationHelper} from "@/db/drizzle";
import {useDatabase} from "@/db/provider";
import {HabitCard} from "@/components/habit";
import type {Habit} from "@/lib/storage";

export default function Home() {
  const {success, error} = useMigrationHelper();

  if (error) {
    return (
      <View className="flex-1 gap-5 p-6 bg-secondary/30">
        <Text>Migration error: {error.message}</Text>
      </View>
    );
  }
  if (!success) {
    return (
      <View className="flex-1 gap-5 p-6 bg-secondary/30">
        <Text>Migration is in progress...</Text>
      </View>
    );
  }

  return <ScreenContent />;
}

function ScreenContent() {
  const {db} = useDatabase();
  const {data: habits, error} = useLiveQuery(
    db?.select().from(habitTable).where(eq(habitTable.archived, false)),
  );

  const ref = React.useRef(null);
  useScrollToTop(ref);

  const renderItem = React.useCallback(
    ({item}: {item: Habit}) => <HabitCard {...item} />,
    [],
  );

  if (error) {
    return (
      <View className="flex-1 items-center justify-center bg-secondary/30">
        <Text className="text-destructive pb-2 ">Error Loading data</Text>
      </View>
    );
  }
  return (
    <View className="flex flex-col basis-full bg-background  p-8">
      <Stack.Screen
        options={{
          title: "Habits",
        }}
      />
      <FlashList
        ref={ref}
        className="native:overflow-hidden rounded-t-lg"
        estimatedItemSize={49}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <View>
            <Text className="text-lg">Hi There 👋</Text>
            <Text className="text-sm">
              This example use sql.js on Web and expo/sqlite on native
            </Text>
            <Text className="text-sm">
              If you change the schema, you need to run{" "}
              <Text className="text-sm font-mono text-muted-foreground bg-muted">
                bun db:generate
              </Text>
              <Text className="text-sm px-1">
                then
              </Text>
              <Text className="text-sm font-mono text-muted-foreground bg-muted">
                bun migrate
              </Text>
            </Text>
          </View>
        )}
        ItemSeparatorComponent={() => <View className="p-2" />}
        data={habits}
        renderItem={renderItem}
        keyExtractor={(_, index) => `item-${ index }`}
        ListFooterComponent={<View className="py-4" />}
      />
      <View className="absolute web:bottom-20 bottom-10 right-8">
        <Link href="/create" asChild>
          <Pressable>
            <View className="bg-primary justify-center rounded-full h-[45px] w-[45px]">
              <Plus className="text-background self-center" />
            </View>
          </Pressable>
        </Link>
      </View>
    </View>
  );
}
