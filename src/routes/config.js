import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { HomeScreen, DetailsScreen } from "../Screens/index";
import { navigation } from "@react-navigation/native";
import { themeColor } from "react-native-rapi-ui";

const homeStack = createStackNavigator();
const HomeStackScreen = () => {
  const nav = navigation;

  return (
    <homeStack.Navigator>
      <homeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerTitle: "Task List",
          headerStyle: {
            backgroundColor: `${themeColor.primary100}`,
            height: 105,
          },
          headerTitleStyle: {
            fontSize: 36,
            fontWeight: "700",
          },
          headerTitleAlign: "left",
        }}
      />
      <homeStack.Screen
        name="Details"
        component={DetailsScreen}
        options={{ presentation: "modal", headerTitle: "Task Options", }}
      />
    </homeStack.Navigator>
  );
};

export default () => (
  <NavigationContainer>
    <HomeStackScreen />
  </NavigationContainer>
);
