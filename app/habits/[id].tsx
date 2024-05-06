import { zodResolver } from "@hookform/resolvers/zod";
import { Stack, useRouter } from "expo-router";
import * as React from "react";
import { useForm } from "react-hook-form";
import { Alert, ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as z from "zod";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormCheckbox,
  FormCombobox,
  FormField,
  FormInput,
  FormRadioGroup,
  FormSelect,
  FormSwitch,
  FormTextarea,
} from "~/components/ui/form";
import { Label } from "~/components/ui/label";
import { RadioGroupItem } from "~/components/ui/radio-group";
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Text } from "~/components/ui/text";
import { getHabits, setHabits } from "~/lib/storage";
import { cn } from "~/lib/utils";


const HabitCategories = [
  { value: "tom@cruise.com", label: "Health And Wellness", },
  { value: "napoleon@dynamite.com", label: "Personal Development" },
  { value: "kunfu@panda.com", label: "Social And Relationships" },
  { value: "bruce@lee.com", label: "Productivity" },
  { value: "harry@potter.com", label: "Creativity" },
  { value: "jane@doe.com", label: "Mindfulness" },
  { value: "elon@musk.com", label: "Financial" },
  { value: "lara@croft.com", label: "Leisure" },
];

const HabitDurations  = [
  {value: 5, label: "5 minutes"},
  {value: 10, label: "10 minutes"},
  {value: 15, label: "15 minutes"},
  {value: 30, label: "30 minutes"}
];

const formSchema = z.object({
  name: z.string().min(4, {
    message: "Please enter a habit name.",
  }),
  description: z.string().min(1, {
    message: "We need to know.",
  }),
  category: z.object(
    { value: z.string(), label: z.string() },
    {
      invalid_type_error: "Please select a favorite email.",
    }
  ),
  duration: z.number().int().positive(),
  enableNotifications: z.boolean(),
});

// TODO: refactor to use UI components

export default function FormScreen() {
  const router = useRouter();
  const scrollRef = React.useRef<ScrollView>(null);
  const insets = useSafeAreaInsets();
  const [selectTriggerWidth, setSelectTriggerWidth] = React.useState(0);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      duration: 5,
      enableNotifications: false,
    },
  });

  const contentInsets = {
    top: insets.top,
    bottom: insets.bottom,
    left: 12,
    right: 12,
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {


    const oldHabits = await getHabits();
    setHabits([...oldHabits, {
      ...values,
      id: Math.random().toString(36).substring(7),
      category: values.category.value,
  }]);
    router.replace('/'); 
    
  }

  return (
    <ScrollView
      ref={scrollRef}
      contentContainerClassName="p-6 mx-auto w-full max-w-xl"
      showsVerticalScrollIndicator={false}
      automaticallyAdjustContentInsets={false}
      contentInset={{ top: 12 }}
    >
       <Stack.Screen
        options={{
          title: "New Habit",
        }}
      />
      <Form {...form}>
        <View className="gap-7">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormInput
                label="Name"
                placeholder="habit name"
                description="This will help you remind."
                autoCapitalize="none"
                {...field}
              />
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormTextarea
                label="Description"
                placeholder="Habit for ..."
                description="habit description"
                {...field}
              />
            )}
          />

<FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormSelect
                label="Category"
                description="Select on of the habit description"
                {...field}
              >
                <SelectTrigger
                  onLayout={(ev) => {
                    setSelectTriggerWidth(ev.nativeEvent.layout.width);
                  }}
                >
                  <SelectValue
                    className={cn(
                      "text-sm native:text-lg",
                      field.value ? "text-foreground" : "text-muted-foreground"
                    )}
                    placeholder="Select a habit category"
                  />
                </SelectTrigger>
                <SelectContent
                  insets={contentInsets}
                  style={{ width: selectTriggerWidth }}
                >
                  <SelectGroup>
                    {HabitCategories.map((cat) => (
                      <SelectItem
                        key={cat.value}
                        label={cat.label}
                        value={cat.value}
                      >
                        <Text>{cat.label}</Text>
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </FormSelect>
            )}
          />

          <FormField
            control={form.control}
            name="duration"
            render={({ field }) => {
              function onLabelPress(value: number) {
                return () => {
                  form.setValue("duration", value);
                };
              }
              return (
                <FormRadioGroup
                  label="Duration"
                  description="Select your duration."
                  className="gap-4"
                  {...field}
                  value={field.value.toString()}
                >
                  {HabitDurations.map((item) => {
                    return (
                      <View
                        key={item.value}
                        className={"flex-row gap-2 items-center"}
                      >
                        <RadioGroupItem
                          aria-labelledby={`label-for-${item.label}`}
                          value={item.value.toString()}
                        />
                        <Label
                          nativeID={`label-for-${item.label}`}
                          className="capitalize"
                          onPress={onLabelPress(item.value)}
                        >
                          {item.label}
                        </Label>
                      </View>
                    );
                  })}
                </FormRadioGroup>
              );
            }}
          />

         
          <FormField
            control={form.control}
            name="enableNotifications"
            render={({ field }) => (
              <FormSwitch
                label="Enable reminder"
                description="We will send you notification reminder."
                {...field}
              />
            )}
          />
          
          <Button onPress={form.handleSubmit(onSubmit)}>
            <Text>Submit</Text>
          </Button>
          <View>
            <Button
              variant="ghost"
              onPress={() => {
                form.reset();
              }}
            >
              <Text>Clear</Text>
            </Button>
          </View>
        </View>
      </Form>
    </ScrollView>
  );
}

