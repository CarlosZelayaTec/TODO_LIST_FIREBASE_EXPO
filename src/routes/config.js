import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { HomeScreen, DetailsScreen } from "../Screens/index";
import { Button } from "react-native";
import { navigation } from "@react-navigation/native";

const homeStack = createStackNavigator();
const HomeStackScreen = () => {
  const nav = navigation;

  return (
    <homeStack.Navigator>
      <homeStack.Screen
        name="Home"
        component={HomeScreen}
        options={() => {
          return {
            headerTitle: "Task List",
          };
        }}
      />
      <homeStack.Screen
        name="Details"
        component={DetailsScreen}
        options={{ presentation: "modal", headerTitle: "New Task" }}
      />
    </homeStack.Navigator>
  );
};

export default () => (
  <NavigationContainer>
    <HomeStackScreen />
  </NavigationContainer>
);
