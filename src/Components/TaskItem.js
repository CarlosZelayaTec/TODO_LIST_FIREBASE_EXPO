import { TouchableOpacity } from "react-native";
import React from "react";
import { Text, Section, SectionContent } from "react-native-rapi-ui";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { deleteTask } from "../api/ApiFirebase";
import { useNavigation, useRoute } from "@react-navigation/native";

const TaskItem = (props) => {
  const navigation = useNavigation();
  const route = useRoute();

  const deleteOneTask = () => {
    try {
      deleteTask(props.id, route.params.user);
    } catch (e) {
      alert(e);
    }
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
              userId: route.params.user
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
        <TouchableOpacity onPress={deleteOneTask}>
          <MaterialCommunityIcons name="delete" size={25} color="red" />
        </TouchableOpacity>
      </SectionContent>
    </Section>
  );
};

export default TaskItem;
