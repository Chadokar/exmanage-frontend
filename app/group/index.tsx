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
import { paymentrelation } from "@/constants/names";
import axios from "axios";

interface Member {
  borrower: string;
  id: number | string;
  lender: string;
  amount: number | string;
  status: string;
}

export default function HomeScreen() {
  const navigation = useNavigation<{
    navigate: (route: { name: string }) => void;
  }>();

  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");
  const tintColor = useThemeColor({}, "tint");
  const iconColor = useThemeColor({}, "icon");
  const [payments, setPayments] = useState<Member[]>([]);
  const [algo, setAlgo] = useState<any>("");

  const { setGroup, group, session, grs } = useSession();

  const handlePress = (item: Member) => {
    console.log(`${item.lender} pressed`);
  };

  useEffect(() => {
    console.log("session : ", session);
    const fetchData = async () => {
      try {
        const { data } = await axios.post(
          "/transaction/list",
          {
            group_id: group?.id,
          },
          {
            headers: {
              Authorization: `Bearer ${session}`,
            },
          }
        );
        if (data && Array.isArray(data)) {
          console.log("data : ", data);
          setPayments(data);
        }
      } catch (error) {
        console.log("error : ");
        console.log("error : ", error);
      }
    };
    fetchData();
  }, [group, session, grs, algo]);

  const navigateToNewPage = () => {
    navigation.navigate({ name: "payments" });
  };

  const algorithmCall = () => {
    console.log("Algorithm call");
    axios
      .post(`/algorithm/${group?.id}`, {
        headers: {
          authorization: `Bearer ${session}`,
        },
      })
      .then((res) => {
        console.log("data : ", res.data);
        setAlgo(algo);
      })
      .catch((err) => {
        console.log("err : ", err);
      });
  };

  return (
    <View style={[{ marginBottom: 48, flex: 1 }]}>
      <View style={{ height: "100%" }}>
        <FlatList
          data={payments}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.item,
                {
                  backgroundColor:
                    item.status === "done" ? "green" : backgroundColor,
                },
              ]}
              onPress={() => handlePress(item)}
            >
              <ThemedText style={{ color: textColor }}>
                {item.lender} owes {item.borrower} ₹{item.amount}
              </ThemedText>
            </TouchableOpacity>
          )}
        />
      </View>
      <Pressable style={styles.addButton} onPress={navigateToNewPage}>
        <TabBarIcon name="add" color={tintColor} />
      </Pressable>
      <View
        style={{
          flexDirection: "row",
          backgroundColor: "transparent",
          paddingTop: 10,
          paddingLeft: 32,
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <Pressable
          style={[
            styles.settleButton,
            {
              backgroundColor: iconColor,
            },
          ]}
          onPress={algorithmCall}
        >
          <ThemedText style={{ color: backgroundColor }}>Settle Up</ThemedText>
        </Pressable>
        <Pressable
          style={[
            styles.settleButton,
            {
              backgroundColor: iconColor,
            },
          ]}
          onPress={() => navigation.navigate({ name: "addmember" })}
        >
          <ThemedText style={{ color: backgroundColor }}>Add Member</ThemedText>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.icon,
    flexDirection: "row",
    justifyContent: "space-between",
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
  settleButton: {
    bottom: 4,
    right: 16,
    borderRadius: 24,
    padding: 8,
    paddingHorizontal: 16,
    justifyContent: "center",
    alignItems: "center",
  },
});
