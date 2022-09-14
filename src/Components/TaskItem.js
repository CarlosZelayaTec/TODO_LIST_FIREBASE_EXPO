import { View } from "react-native";
import React from "react";
import { Text, Section, SectionContent } from "react-native-rapi-ui";

const TaskItem = (props) => {
  return (
    <Section style={{marginBottom: 10, marginHorizontal: 10}}>
      <SectionContent style={{ marginBottom: 5}}>
        <Text size='h3' style={{color: 'blue'}}>{props.titleTask}</Text>
        <Text size='lg' >{props.descriptionTask}</Text>
      </SectionContent>
    </Section>
  );
};

export default TaskItem;
