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
import { addDoc, collection } from "firebase/firestore";

const DetailsScreen = ({navigation}) => {
  const [titleTask, setTitleTask] = React.useState("");
  const [descriptionTask, setDescriptionTask] = React.useState("");

  const onSend = async () => {
    await addDoc(collection(database, "Tasks"), {
      titleTask: titleTask,
      descriptionTask: descriptionTask,
      createAt: new Date(),
    });
    navigation.goBack();
  };

  return (
    <Layout
      style={{ flex: 1, alignItems: "center" }}
      backgroundColor={themeColor.primary100}
    >
      <Text size="h3" style={{ marginBottom: 10 }}>
        Crea una nueva tarea
      </Text>
      <View style={style.container}>
        <View>
          <TextInput
            placeholder="Title Task"
            value={titleTask}
            onChangeText={(e) => setTitleTask(e)}
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
            value={descriptionTask}
            onChangeText={(e) => setDescriptionTask(e)}
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
        text="Crear nueva Tarea"
        status="info"
        onPress={onSend}
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
