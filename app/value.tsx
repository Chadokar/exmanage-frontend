import { HelloWave } from "@/components/HelloWave";
import { ThemedContainer } from "@/components/ThemeContainer";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useNavigation } from "expo-router";
import React from "react";
import { Button, Image, Platform, StyleSheet, Text, View } from "react-native";

const Home = () => {
  const navigation = useNavigation<{
    navigate: (route: { name: string }) => void;
  }>();
  return (
    <ThemedContainer>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Hello worl!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 1: Try it</ThemedText>
        <ThemedText>
          Edit{" "}
          <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText>{" "}
          to see changes. Press{" "}
          <ThemedText type="defaultSemiBold">
            {Platform.select({ ios: "cmd + d", android: "cmd + m" })}
          </ThemedText>{" "}
          to open developer tools.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <Button
          title="Press me"
          onPress={() => {
            navigation.navigate({ name: "login" });
          }}
        />
      </ThemedView>
    </ThemedContainer>
  );
};

export default Home;

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
