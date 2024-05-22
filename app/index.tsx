import { useScrollToTop } from "@react-navigation/native";
import { FlashList } from "@shopify/flash-list";
import { eq } from "drizzle-orm";
import { Link, Stack, useRouter } from "expo-router";
import * as React from "react";
import { FlatList, View } from "react-native";
import { ThemeToggle } from "~/components/ThemeToggle";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Progress } from "~/components/ui/progress";
import { Text } from "~/components/ui/text";
import { Habit, habitTable } from "~/db/schema";
import { db, useMigrationHelper } from "~/db";


type HabitProps = {
  habit: Habit;
  onDelete?: () => void;
};

const HabitCard: React.FC<HabitProps> = ({ habit, onDelete }) => {
  const getCompletedDayCount = () => {
    // return habit.completedDays?.length || 0;
  };

  return (
    <Card className="w-full rounded-2xl">
      <CardHeader>
        <CardTitle className="pb-2">
          {habit.name}
          <Badge variant="outline">
            <Text>Morning</Text>
          </Badge>
        </CardTitle>
        <View className="flex-row">
          <CardDescription className="text-base font-semibold">
            {habit.description}
          </CardDescription>
        </View>
      </CardHeader>
      <CardContent/>
      <CardFooter className="flex-col gap-3 flex-1">
        <Progress value={10} className="h-2" indicatorClassName="bg-sky-600" />
        <Button variant="outline" className="shadow shadow-foreground/5" onPress={onDelete}>
          <Text>Delete</Text>
        </Button>
        </CardFooter>
    </Card>
  );
};


export default function Screen() {

  const { success, error } = useMigrationHelper();

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


  return <ScreenContent />
}


function ScreenContent() {
  const [habits, setHabits] = React.useState<Habit[]>([]);
  const ref = React.useRef(null);
  useScrollToTop(ref);

  const router = useRouter();

  const fetchHabits = async () => {
    const fetchedHabits = await db.select().from(habitTable).execute()
    setHabits(fetchedHabits);
  };


  const handleDeleteHabit = async (id: string) => {
    await db.delete(habitTable).where(eq(habitTable.id, id)).execute();;
    await fetchHabits();
    return;
  };

  React.useEffect(() => {
    fetchHabits();
  }, []);


  return (
    <View className="flex-1 gap-5 p-6 bg-secondary/30">
      <Stack.Screen
        options={{
          title: "Habits",
          headerRight: () => <ThemeToggle />,
        }}
      />
      <FlashList
        ref={ref}
        className="native:overflow-hidden rounded-t-lg"
        estimatedItemSize={49}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View className="p-2" />}
        data={habits}
        renderItem={({ item }) => (
          <HabitCard habit={item} onDelete={() => handleDeleteHabit(item.id)} />
        )}
        keyExtractor={(item) => item.id}
        ListFooterComponent={<View className="py-4" />}
      />
      <Link href="/create" asChild>
        <Button>
          <Text>Add</Text>
        </Button>
      </Link>

    </View >
  );
}
