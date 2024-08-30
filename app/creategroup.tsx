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
import axios from "axios";
import { useSession } from "@/components/ctx";

export default function CreateGorup() {
  const [groupname, setGroupname] = useState("");

  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");
  const tintColor = useThemeColor({}, "tint");
  const iconColor = useThemeColor({}, "icon");
  const { group, session, setGrs } = useSession();

  const handleRegister = () => {
    // Handle registration logic here
    // console.log("session : ", session);
    axios
      .post(
        "/group",
        { groupname },
        { headers: { authorization: `Bearer ${session}` } }
      )
      .then((res) => {
        console.log(res.data);
        setGrs(Math.random());
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <ThemedText type="title" style={styles.title}>
        Create Group
      </ThemedText>

      <TextInput
        style={[styles.input, { color: textColor, borderColor: tintColor }]}
        placeholder="Groupname"
        placeholderTextColor={textColor}
        onChangeText={setGroupname}
        value={groupname}
      />

      <Button title="Save" onPress={handleRegister} color={"11181C"} />
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
