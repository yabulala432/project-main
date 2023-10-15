import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import SCREEN_NAMES from "./SCREEN_NAMES";
import { TabNav } from "./TabNav";
import PlayerScreen from "../screens/PlayerScreen";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "../screens/HomeScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
export const StackNav = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name={SCREEN_NAMES.HOME_SCREEN}
          component={HomeScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name={SCREEN_NAMES.PLAYER_AND_LIST_SCREEN}
          component={TabNav}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
