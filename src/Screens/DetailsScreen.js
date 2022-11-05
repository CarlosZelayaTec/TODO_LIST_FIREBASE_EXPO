import React, { useEffect } from "react";
import { View, StyleSheet, Image } from "react-native";
import {
  TextInput,
  themeColor,
  Layout,
  Text,
  Button,
} from "react-native-rapi-ui";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

import { createTask, updateTask } from "../api/ApiFirebase";

const DetailsScreen = ({ navigation, route }) => {
  const id = route.params.id;
  const [TasksSend, setTaskSend] = React.useState({
    titleTask: "",
    descriptionTask: "",
  });

  const textButton = id ? "Actualizar tarea" : "Crear una nueva Tarea";
  const textTask = id ? "Actualiza esta tarea" : "Crear una nueva Tarea";

  useEffect(() => {
    id
      ? setTaskSend({
          titleTask: route.params.title,
          descriptionTask: route.params.description,
        })
      : TasksSend.titleTask;
  }, []);

  async function createOneTask() {
    try {
      await createTask(TasksSend, route.params.user);
      navigation.goBack();
    } catch (e) {
      alert(`Tuvimos error en tu peticion ${e}`);
    }
  }

  async function updateOneTask() {
    try {
      await updateTask(id, route.params.userId, TasksSend, route);
      navigation.goBack();
    } catch (e) {
      alert(`Tuvimos error en tu peticion ${e}`);
    }
  }
  
  return (
    <Layout
      style={{ flex: 1, alignItems: "center" }}
      backgroundColor={themeColor.primary100}
    >
      <Text size="h3" style={{ marginBottom: 10 }}>
        {textTask}
      </Text>
      <View style={style.container}>
        <View>
          <TextInput
            placeholder="Title Task"
            value={TasksSend.titleTask}
            onChangeText={(e) => setTaskSend({ ...TasksSend, titleTask: e })}
            rightContent={
              <MaterialIcons
                name="title"
                size={23}
                color={themeColor.gray100}
              />
            }
          />
        </View>
        <View>
          <TextInput
            placeholder="Description Task"
            value={TasksSend.descriptionTask}
            onChangeText={(e) =>
              setTaskSend({ ...TasksSend, descriptionTask: e })
            }
            rightContent={
              <MaterialIcons
                name="description"
                size={23}
                color={themeColor.gray100}
              />
            }
          />
        </View>
      </View>

      <Button
        text={textButton}
        status="info"
        onPress={id ? updateOneTask : createOneTask}
        rightContent={<Ionicons name="ios-create-outline" size={25} />}
      />

        <Image source={require('../../assets/add.png')} style={{ width: '80%', marginTop: 20 }} resizeMode='contain' />

    </Layout>
  );
};

const style = StyleSheet.create({
  container: {
    justifyContent: "space-evenly",
    minHeight: 100,
    minWidth: "80%",
  },
});

export default DetailsScreen;
