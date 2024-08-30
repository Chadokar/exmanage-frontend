import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useSession } from "@/components/ctx";

export default function RegisterScreen() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");
  const tintColor = useThemeColor({}, "tint");
  const iconColor = useThemeColor({}, "icon");
  const { signIn } = useSession();

  const handleRegister = () => {
    // Handle registration logic here
    console.log("Register");
    signIn({ name: username, email, password });
  };

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <ThemedText type="title" style={styles.title}>
        Register
      </ThemedText>

      <TextInput
        style={[styles.input, { color: textColor, borderColor: tintColor }]}
        placeholder="Username"
        placeholderTextColor={textColor}
        onChangeText={setUsername}
        value={username}
      />

      <TextInput
        style={[styles.input, { color: textColor, borderColor: tintColor }]}
        placeholder="Email"
        placeholderTextColor={textColor}
        onChangeText={setEmail}
        value={email}
      />

      <View style={styles.passwordContainer}>
        <TextInput
          style={[
            styles.input,
            styles.passwordInput,
            { color: textColor, borderColor: tintColor },
          ]}
          placeholder="Password"
          placeholderTextColor={textColor}
          onChangeText={setPassword}
          value={password}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity
          onPress={() => setShowPassword(!showPassword)}
          style={styles.showHideButton}
        >
          <ThemedText type="default" style={{ color: iconColor }}>
            {showPassword ? "Hide" : "Show"}
          </ThemedText>
        </TouchableOpacity>
      </View>

      <Button title="Register" onPress={handleRegister} color={"11181C"} />

      <ThemedText
        type="link"
        onPress={() => {
          console.log("pressed");
        }}
        style={styles.link}
      >
        Already have an account? Log in
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  title: {
    textAlign: "center",
    marginBottom: 24,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 12,
    paddingHorizontal: 10,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  passwordInput: {
    flex: 1,
  },
  showHideButton: {
    marginLeft: 10,
  },
  link: {
    marginTop: 20,
    textAlign: "center",
  },
});
