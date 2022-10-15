import React, { useEffect, useLayoutEffect } from "react";
import { TouchableOpacity, FlatList, View, Image } from "react-native";
import { themeColor } from "react-native-rapi-ui";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import TaskItem from "../Components/TaskItem";
import { getTasks } from "../api/ApiFirebase";

const HomeScreen = () => {
  const navigation = useNavigation();

  const [tasks, setTasks] = React.useState([]);

  useEffect(() => {
    try {
      getTasks(setTasks);
    } catch (e) {
      alert(e);
    }
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={{ marginRight: 22 }}
          onPress={() => navigation.push("Details", {})}
        >
          <FontAwesome5 name="plus-circle" size={35} />
        </TouchableOpacity>
      ),
    });
  }, []);

  const TaskList = ({ item }) => <TaskItem id={item.id} {...item} />;

  return (
    <View style={{ flex: 1, backgroundColor: `${themeColor.info600}`, borderTopLeftRadius: 15, borderTopRightRadius: 15 }}>
      {tasks.length === 0 ? (
        <View style={{flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Image
            source={require("../../assets/wait.png")}
            style={{ width: "80%"}}
            resizeMode="contain"
          />
        </View>
      ) : (
        <FlatList
          data={tasks}
          keyExtractor={(x) => x.id}
          renderItem={TaskList}
          style={{ marginTop: 10 }}
        />
      )}
    </View>
  );
};

export default HomeScreen;
