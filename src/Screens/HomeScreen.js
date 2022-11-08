import React, { useEffect, useLayoutEffect } from "react";
import { TouchableOpacity, FlatList, View, Image, RefreshControl } from "react-native";
import { themeColor } from "react-native-rapi-ui";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import TaskItem from "../Components/TaskItem";
import { getTasks } from "../api/ApiFirebase";

const HomeScreen = () => {
  const navigation = useNavigation();

  const [tasks, setTasks] = React.useState([]);
  const [input, setInput] = React.useState("");
  const [refreshing, setRefreshing] = React.useState(false);
  const [ready, setReady] = React.useState(false);

  const readData = async () => {
    try {
      const value = await AsyncStorage.getItem("@user_token");
      if (value !== null) {
        setInput(value);
        setReady(true);
      }
    } catch (e) {
      alert("Failed to fetch the input from storage");
    }
  };

  useEffect(() => {
    try {
      if(input !== ''){
        getTasks(setTasks, input);
      } else{
        readData();
      }
    } catch (e) {
      alert(e);
    }
  }, [ready]);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true)
    await getTasks();
    setRefreshing(false);
  })

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={{ marginRight: 22 }}
          onPress={() => navigation.push("Details", { user: input })}
        >
          <FontAwesome5 name="plus-circle" size={35} />
        </TouchableOpacity>
      ),
    });
  }, [ready]);

  const TaskList = ({ item }) => (
    <TaskItem id={item.id} {...item} userToken={input} />
  );

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: `${themeColor.info600}`,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
      }}
    >
      {tasks.length === 0 ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Image
            source={require("../../assets/wait.png")}
            style={{ width: "80%" }}
            resizeMode="contain"
          />
        </View>
      ) : (
        <FlatList
          data={tasks}
          keyExtractor={(x) => x.id}
          renderItem={TaskList}
          style={{ marginTop: 10 }}
          refreshing={refreshing}
          refreshControl={
            <RefreshControl 
            // colors='blue'
              onRefresh={onRefresh}
            />
          }
        />
      )}
    </View>
  );
};

export default HomeScreen;
