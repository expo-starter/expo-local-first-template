import { useScrollToTop } from "@react-navigation/native";
import { FlashList } from "@shopify/flash-list";
import { Stack, useRouter } from "expo-router";
import * as React from "react";
import { FlatList, View } from "react-native";
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
import { Habit, deleteHabit, getHabits } from "~/lib/storage";

type HabitProps = {
  habit: Habit;
  onDelete?: () => void;
};

const HabitCard: React.FC<HabitProps> = ({ habit, onDelete }) => {
  const getCompletedDayCount = () => {
    return habit.completedDays?.length || 0;
  };

  return (
    <Card className="w-full max-w-sm rounded-2xl">
      <CardHeader>
        <CardTitle className="pb-2">{habit.name}<Badge variant="outline"> <Text>Morning</Text></Badge></CardTitle>
        <View className="flex-row">
          <CardDescription className="text-base font-semibold">
            {habit.description}
          </CardDescription>
        </View>
      </CardHeader>
      <CardContent>
        
      </CardContent>
      <CardFooter className="flex-col gap-3">
        <Progress value={10} className="h-2" indicatorClassName="bg-sky-600" />
        <View />
        <Button variant="outline" className="shadow shadow-foreground/5">
          <Text>Update</Text>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default function Screen() {
  const [habits, setHabits] = React.useState<Habit[]>([]);
  const ref = React.useRef(null);
  useScrollToTop(ref);
  
  const router = useRouter();

  React.useEffect(() => {
    const fetchHabits = async () => {
      const fetchedHabits = await getHabits();
      setHabits(fetchedHabits);
    };
    fetchHabits();
  }, []);

  const handleDeleteHabit = (id: string) => {
    const updatedHabits = habits.filter((habit) => habit.id !== id);
    setHabits(updatedHabits);
    deleteHabit(id); // Update storage as well
  };

  return (
    <View className="flex-1 gap-5 p-6 bg-secondary/30">
      <Stack.Screen
        options={{
          title: "Habits",
          headerRight: () => (
            <Button onPress={() => router.push("/habits/new")}>
              <Text>Add Habit</Text>
            </Button>
          ),
        }}
      />
      <FlashList
        ref={ref}
        className='native:overflow-hidden rounded-t-lg'
        estimatedItemSize={49}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View className='p-2' />}
        data={habits}
        renderItem={({ item }) => (
          <HabitCard habit={item} onDelete={() => handleDeleteHabit(item.id)} />
        )}
        keyExtractor={(item) => item.id}
        ListFooterComponent={<View className='py-4' />}
      />
    </View>
  );
}
