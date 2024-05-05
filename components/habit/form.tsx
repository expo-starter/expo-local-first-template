import React, { useState } from 'react';
import { View, TextInput } from 'react-native';
import { Button } from '~/components/ui/button';
import { Habit } from './storage';


interface HabitFormProps {
  onSubmit: (habit: Habit) => void;
  initialHabit?: Habit; // Optional for updating habits
}

export const HabitForm: React.FC<HabitFormProps> = ({ onSubmit, initialHabit }) => {
  const [name, setName] = useState(initialHabit?.name || '');
  const [completedDays, setCompletedDays] = useState<number[]>(initialHabit?.completedDays || []);

  const handleSubmit = () => {
    const newHabit: Habit = {
      id: Math.random().toString(36).substring(2, 15), // Generate a random ID
      name,
      completedDays,
    };
    onSubmit(newHabit);
    setName(''); // Reset form after submission
    setCompletedDays([]);
  };

  return (
    <View className={"mb-4"}>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Habit Name"
        className={"border border-gray-300 p-2 rounded-md mb-2"}
      />
      <View className={"flex flex-wrap"}>
        {[0, 1, 2, 3, 4, 5, 6].map((day) => (
          <Button
            key={day}
            onPress={() => {
              const dayIndex = completedDays.indexOf(day);
              if (dayIndex !== -1) {
                setCompletedDays(completedDays.filter((d) => d !== day));
              } else {
                setCompletedDays([...completedDays, day]);
              }
            }}
            className={`mr-2 mb-2 px-2 py-1 rounded-md ${completedDays.includes(day) ? 'green.500' : 'gray.300'}`}
          >
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][day]}
            </Button>
        ))}
      </View>
      <Button onPress={handleSubmit} 
      className={"bg-blue-500 py-2 rounded-md"}>
        {initialHabit ? 'Update' : 'Create'}
        </Button>
    </View>
  );
};
