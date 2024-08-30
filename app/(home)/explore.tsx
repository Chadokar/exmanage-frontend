import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, Image, Platform, Pressable } from "react-native";

import { Collapsible } from "@/components/Collapsible";
import { ExternalLink } from "@/components/ExternalLink";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { ThemedContainer } from "@/components/ThemeContainer";
import { useSession } from "@/components/ctx";

export default function TabTwoScreen() {
  const { signOut } = useSession();
  return (
    <ThemedContainer>
      <Pressable style={styles.logoutButton} onPress={signOut}>
        <ThemedText type="subtitle">Logout</ThemedText>
      </Pressable>
    </ThemedContainer>
  );
}

const styles = StyleSheet.create({
  logoutButton: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#f00",
    width: "50%",
  },
});
