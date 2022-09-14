import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import {
  TextInput,
  themeColor,
  Layout,
  Text,
  Button,
} from "react-native-rapi-ui";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

import { database } from "../firebase/config";
import { addDoc, collection, updateDoc, doc } from "firebase/firestore";

const DetailsScreen = ({ navigation, route }) => {
  const id = route.params.id;
  const [TasksSend, setTaskSend] = React.useState({
    titleTask: "",
    descriptionTask: "",
  });

  /**
   *! Refactor this lines
   *? In process 
   * * Refactor using operador ternario and quemadores ?? 
   * * Creamos un solo useState que envia todo el formulario
   * * Actualizamos los valores que estabamos utilizando con los useState anteriores
   */
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

  const onSend = async () => {
    await addDoc(collection(database, "Tasks"), {
      titleTask: TasksSend.titleTask,
      descriptionTask: TasksSend.descriptionTask,
      createAt: new Date(),
    });
    navigation.goBack();
  };

  const updateTask = async () => {
    const ref = doc(database, "Tasks", id);
    await updateDoc(ref, {
      titleTask: TasksSend.titleTask || route.params.title,
      descriptionTask: TasksSend.descriptionTask || route.params.description,
    });

    navigation.goBack();
  };

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
        onPress={id ? updateTask : onSend}
        rightContent={<Ionicons name="ios-create-outline" size={25} />}
      />
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
