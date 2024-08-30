import { ThemedContainer } from "@/components/ThemeContainer";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useThemeColor } from "@/hooks/useThemeColor";
import CheckBox from "expo-checkbox";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { datalist } from "@/constants/listdata";
import { debounce } from "@/util/debounce";
import { useSession } from "@/components/ctx";
import axios from "axios";

// Define the type for each item in the list
interface ListItem {
  id: string;
  name: string;
  selected: boolean;
  amount: string;
}

const App: React.FC = () => {
  const [selectAll, setSelectAll] = useState<boolean>(false);
  const [total, setTotal] = useState<number>(0);
  const [listData, setListData] = useState<ListItem[]>([]);
  const [name, setName] = useState<string>("");

  const { group, session } = useSession();

  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");
  const tintColor = useThemeColor({}, "tint");
  const iconColor = useThemeColor({}, "icon");

  const toggleSelectAll = () => {
    const newState = !selectAll;
    setSelectAll(newState);
    const updatedList = listData.map((item) => ({
      ...item,
      selected: newState,
    }));
    setListData(updatedList);
  };

  useEffect(() => {
    // console.log("session : ", session);
    const fetchData = async () => {
      axios
        .get(`group/${group?.id}`, {
          headers: {
            Authorization: `Bearer ${session}`,
          },
        })
        .then((res) => {
          // console.log("res : ", res);
          setListData(res.data);
        })
        .catch((err) => {
          console.log("err : ", err);
        });
    };
    fetchData();
  }, [session]);

  const distributeEqually = () => {
    console.log("Distribute Equally");
    const selectedItems = listData.filter((item) => item.selected);
    const selectedCount = selectedItems.length;
    const distributedValue = total / selectedCount;
    const updatedList = listData.map((item) =>
      item.selected
        ? { ...item, input: distributedValue.toString() }
        : { ...item, input: "" }
    );
    setListData(updatedList);
  };

  const checkSum = () => {
    let sum = listData.reduce((acc, item) => acc + Number(item.amount), 0);
    if (Number(sum.toFixed(4)) > total) {
      alert("Sum of all inputs is greater than total value");
    }
  };

  const debouncedCheckSum = debounce(checkSum, 800);

  const updateInput = (id: string, value: string) => {
    const updatedList = listData.map((item) =>
      item.id === id ? { ...item, input: value } : item
    );
    setListData(updatedList);
  };

  const toggleCheckbox = (id: string) => {
    const updatedList = listData.map((item) =>
      item.id === id ? { ...item, selected: !item.selected } : item
    );
    setListData(updatedList);
  };

  useEffect(() => {
    // Check if all items are selected
    console.log("length : ", listData.length);
    const allSelected = listData.every((item) => item.selected);
    setSelectAll(allSelected);
    debouncedCheckSum();
  }, [listData]);

  const totalHasChanged = () => {
    // console.log("listData : ", listData);
    const updatedList = listData.map((item) => ({ ...item, input: "" }));
    setListData(updatedList);
  };

  const debouncedTotalHasChanged = debounce(totalHasChanged, 3000);

  const saveData = () => {
    // get all selected items
    const selectedItems = listData.filter((item) => item.selected);
    // save the this transaction
    axios
      .post(
        "/transaction/create-new",
        {
          groupId: group?.id,
          name: name,
          list: selectedItems,
        },
        {
          headers: {
            Authorization: `Bearer ${session}`,
          },
        }
      )
      .then((res) => {
        console.log("data : ", res.data);
      })
      .catch((err) => {
        console.log("err : ", err);
      });
  };

  useEffect(() => {
    // if total value changes, reset all inputs
    console.log(listData.length);
    if (total > 0) debouncedTotalHasChanged();
  }, [total]);

  const renderItem = ({ item }: { item: ListItem }) => (
    <ThemedView
      style={[
        styles.listItem,
        { borderBottomWidth: 1, borderBottomColor: textColor },
      ]}
    >
      <CheckBox
        value={item.selected}
        onValueChange={() => toggleCheckbox(item.id)}
      />
      <ThemedText style={styles.nameText}>{item.name}</ThemedText>
      <TextInput
        style={[styles.input, { color: textColor, borderColor: tintColor }]}
        placeholder="Input here"
        keyboardType="numeric"
        value={item.amount}
        placeholderTextColor={iconColor}
        onChangeText={(value) => updateInput(item.id, value)}
      />
    </ThemedView>
  );

  return (
    <>
      <Pressable
        style={[styles.addButton, { opacity: total === 0 ? 0.5 : 1 }]}
        onPress={distributeEqually}
        disabled={total === 0}
      >
        <FontAwesome5 name="equals" size={20} color={textColor} />
      </Pressable>

      <View style={styles.container}>
        <ThemedView
          style={[
            styles.listItem,
            { borderBottomWidth: 1, borderBottomColor: textColor },
          ]}
        >
          <CheckBox value={selectAll} onValueChange={toggleSelectAll} />
          <ThemedText style={styles.nameText}>Select All</ThemedText>
          <TextInput
            style={[styles.input, { color: textColor, borderColor: tintColor }]}
            placeholder="Input here"
            keyboardType="numeric"
            value={total.toString()}
            placeholderTextColor={iconColor}
            onChangeText={(value) => setTotal(Number(value))}
          />
        </ThemedView>
        <View style={{ height: "70%" }}>
          <FlatList
            data={listData}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        </View>
        <TextInput
          style={[
            styles.input,
            {
              color: textColor,
              borderColor: tintColor,
              width: "80%",
              marginVertical: 16,
            },
          ]}
          placeholder="Name"
          value={name}
          onChangeText={setName}
          placeholderTextColor={iconColor}
        />
        <Pressable
          style={{
            opacity: total === 0 ? 0.5 : 1,
            marginBottom: 64,
            padding: 10,
            borderRadius: 10,
            backgroundColor: "#666",
            // width: "50%",
          }}
          onPress={saveData}
          disabled={total === 0}
        >
          <ThemedText style={{ color: textColor, textAlign: "center" }}>
            Save Data
          </ThemedText>
        </Pressable>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 16,
    marginTop: 0,
  },
  selectAllContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    height: 64,
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  nameText: {
    flex: 1,
    marginLeft: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    width: 150,
    borderRadius: 8,
  },
  addButton: {
    position: "absolute",
    top: 0,
    right: 16,
    backgroundColor: Colors.light.icon,
    borderRadius: 24,
    width: 48,
    zIndex: 1,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default App;
