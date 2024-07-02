import { MMKV } from "react-native-mmkv";

export const storage = new MMKV();

export function getItem<T>(key: string): T | null {
  const value = storage.getString(key);
  try {
    return value ? JSON.parse(value) || null : null;
  } catch (error) {
    // Handle the error here
    console.error("Error parsing JSON:", error);
    return null;
  }
}

export function setItem<T>(key: string, value: T) {
  storage.set(key, JSON.stringify(value));
}

export function removeItem(key: string) {
  storage.delete(key);
}

const HABIT_KEY = "habits";

export type Habit = {
  id: string;
  name: string;
  description: string;
  duration: number;
  category: string;
  enableNotifications: boolean;
  archived: boolean;
};

export async function getHabits(): Promise<Habit[]> {
  const habitsString = await storage.getString(HABIT_KEY);
  if (!habitsString) {
    return [];
  }
  return JSON.parse(habitsString) as Habit[];
}

export async function setHabits(habits: Habit[]): Promise<void> {
  await storage.set(HABIT_KEY, JSON.stringify(habits));
}

export async function deleteHabit(id: string): Promise<void> {
  const habits = await getHabits();
  const updatedHabits = habits.filter((habit) => habit.id !== id);
  await setHabits(updatedHabits);
}
