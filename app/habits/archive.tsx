import {View, Alert} from "react-native";
import {useScrollToTop} from "@react-navigation/native";
import {FlashList} from "@shopify/flash-list";
import {eq} from "drizzle-orm";
import {Stack} from "expo-router";
import * as React from "react";
import {useLiveQuery} from "drizzle-orm/expo-sqlite";

import {Text} from "@/components/ui/text";
import {habitTable} from "@/db/schema";
import {useDatabase} from "@/db/provider";
import {Archive} from "lucide-react-native";
import {HabitCard} from "@/components/habit";
import type {Habit} from "@/lib/storage";

export default function Home() {
  const {db} = useDatabase();
  const {data: habits, error} = useLiveQuery(
    db?.select().from(habitTable).where(eq(habitTable.archived, true)),
  );

  const ref = React.useRef(null);
  useScrollToTop(ref);

  async function handleRestoreHabit(habitId: string) {
    try {
      await db
        ?.update(habitTable)
        .set({
          archived: false,
        })
        .where(eq(habitTable.id, habitId))
        .execute();
    } catch (error) {
      console.error("error", error);
    }
  }

  async function handleDeleteHabit(habitId: string) {
    Alert.alert('Are you absolutely sure?', 'Are you sure you want to delete this Habit ?', [
      {
        text: 'Cancel',
      },
      {
        text: 'Continue',
        onPress: async () => {
          try {
            await db?.delete(habitTable).where(eq(habitTable.id, habitId)).execute();
          } catch (error) {
            console.error("error", error);
          }
        },
        style: 'destructive',
      },
    ]);
    // Are you sure you want to delete this Habit ?

  }
  const renderItem = React.useCallback(
    ({item}: {item: Habit}) => <HabitCard onDelete={handleDeleteHabit} onRestore={handleRestoreHabit} {...item} />,
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
    <View className="flex flex-1 bg-background  p-8">
      <Stack.Screen
        options={{
          title: "Archived Habits",
        }}
      />
      <FlashList
        ref={ref}
        className="native:overflow-hidden rounded-t-lg "
        estimatedItemSize={10}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <View className="flex flex-1 grow-1 items-center justify-center">
            <Archive className="text-foregound" />
            <Text className="text-lg text-bold">Your archive is empty</Text>
            <Text className="text-sm">
              You need to archive at least one habit to see it here.
            </Text>
          </View>
        )}
        ItemSeparatorComponent={() => <View className="p-2" />}
        data={habits}
        renderItem={renderItem}
        keyExtractor={(_, index) => `item-${ index }`}
        ListFooterComponent={<View className="py-4" />}
      />
    </View>
  );
}
