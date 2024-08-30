import React, { useEffect, useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { ThemedContainer } from "@/components/ThemeContainer";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useNavigation } from "expo-router";
import { useThemeColor } from "@/hooks/useThemeColor";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useSession } from "@/components/ctx";
import axios from "axios";

interface Group {
  groupname: string;
  id: string;
}

export default function HomeScreen() {
  const navigation = useNavigation<{
    navigate: (route: { name: string }) => void;
  }>();

  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");
  const tintColor = useThemeColor({}, "tint");
  const iconColor = useThemeColor({}, "icon");

  // using "use" hook of react call api to get data

  const { setGroup, session } = useSession();
  const [groups, setGroups] = useState<Group[]>([]);

  useEffect(() => {
    // console.log("session : ", session);
    const fetchData = () => {
      axios
        .get("group", {
          headers: {
            Authorization: `Bearer ${session}`,
          },
        })
        .then((res) => {
          // console.log("res : ", res);
          setGroups(res.data);
        })
        .catch((err) => {
          console.log("err : ", err);
        });
    };
    fetchData();
  }, [session]);

  const handlePress = (item: { groupname: string; id: string }) => {
    setGroup({ name: item.groupname, id: item.id });
    navigation.navigate({ name: "group" });
  };

  const navigateToNewPage = () => {
    navigation.navigate({ name: "creategroup" });
  };

  return (
    <View>
      <FlatList
        data={groups}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => handlePress(item)}
          >
            <ThemedText style={{ color: textColor }}>
              {item.groupname}
            </ThemedText>
          </TouchableOpacity>
        )}
      />
      <Pressable style={styles.addButton} onPress={navigateToNewPage}>
        <TabBarIcon name="add" color={tintColor} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.icon,
  },
  addButton: {
    position: "absolute",
    top: 4,
    right: 16,
    backgroundColor: Colors.light.icon,
    borderRadius: 24,
    width: 48,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
  },
});
