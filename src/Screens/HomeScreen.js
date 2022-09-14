import React, { useEffect, useLayoutEffect } from "react";
import { TouchableOpacity, FlatList, View } from "react-native";
import { Layout, themeColor, TopNav, Text } from "react-native-rapi-ui";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { database } from "../firebase/config";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import TaskItem from "../Components/TaskItem";

const HomeScreen = () => {
  const navigation = useNavigation();

  const [tasks, setTasks] = React.useState([]);

  useEffect(() => {
    const dbRef = collection(database, "Tasks");
    const q = query(dbRef, orderBy("createAt", "desc"));

    const unsuscribe = onSnapshot(q, (querySnapshot) => {
      setTasks(
        querySnapshot.docs.map((x) => ({
          id: x.id,
          titleTask: x.data().titleTask,
          descriptionTask: x.data().descriptionTask,
          createAt: x.data().createAt,
        }))
      );
    });
    return unsuscribe;
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={{ marginRight: 14 }}
          onPress={() => navigation.push("Details")}
        >
          <FontAwesome5 name="plus-circle" size={25} />
        </TouchableOpacity>
      ),
    });
  }, []);

  const TaskList = ({ item }) => <TaskItem id={item.id} {...item} />;

  return (
    <View backgroundColor={themeColor.info700} style={{ flex: 1 }}>
      <FlatList
        data={tasks}
        keyExtractor={(x) => x.id}
        renderItem={TaskList}
        style={{ marginTop: 10 }}
      />
    </View>
  );
};

export default HomeScreen;
