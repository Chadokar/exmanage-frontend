import { useSession } from "@/components/ctx";
import { Redirect, Stack } from "expo-router";
import { Text } from "react-native";
import "react-native-reanimated";

export default function RootLayout() {
  const { session, isLoading, group } = useSession();

  // console.log("session : ", session);

  // console.log("isLoading : ", isLoading);

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (!session) {
    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
    return <Redirect href="/auth" />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="index"
        options={{ headerShown: true, title: group?.name || "Group" }}
      />
      <Stack.Screen
        name="payments"
        options={{ headerShown: true, title: group?.name || "Group" }}
      />
      <Stack.Screen
        name="addmember"
        options={{ headerShown: true, title: group?.name || "Group" }}
      />
    </Stack>
  );
}
