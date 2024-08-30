import { useNavigation } from "expo-router";
import { View, Text, StyleSheet, Button } from "react-native";

export default function DetailsScreen() {
  const navigation = useNavigation<{
    navigate: (route: { name: string }) => void;
  }>();

  return (
    <View style={styles.container}>
      <Text>Details</Text>
      <Button
        title="Go to Login"
        onPress={() => {
          navigation.navigate({ name: "auth" });
        }}
      />
      <Button
        title="Go to Home"
        onPress={() => {
          navigation.navigate({ name: "(home)" });
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
