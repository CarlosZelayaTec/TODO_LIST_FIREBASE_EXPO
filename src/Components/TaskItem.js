import { TouchableOpacity, View } from "react-native";
import React from "react";
import { Text, Section, SectionContent } from "react-native-rapi-ui";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { database } from "../firebase/config";
import { deleteDoc, updateDoc, doc } from "firebase/firestore";

import { useNavigation } from "@react-navigation/native";

const TaskItem = (props) => {
  const navigation = useNavigation();
  const onDelete = () => {
    const ref = doc(database, "Tasks", props.id);
    deleteDoc(ref);
  };

  return (
    <Section style={{ marginBottom: 10, marginHorizontal: 10 }}>
      <SectionContent
        style={{
          marginBottom: 5,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <TouchableOpacity
          onPress={() =>
            navigation.push("Details", {
              id: props.id,
              title: props.titleTask,
              description: props.descriptionTask,
            })
          }
          style={{ minWidth: "80%" }}
        >
          <Text size="h3" style={{ color: "blue" }}>
            {props.titleTask}
          </Text>
          <Text style={{ maxWidth: "80%" }} size="lg">
            {props.descriptionTask}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onDelete}>
          <MaterialCommunityIcons name="delete" size={25} color="red" />
        </TouchableOpacity>
      </SectionContent>
    </Section>
  );
};

export default TaskItem;
