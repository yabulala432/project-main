import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";

import SCREEN_NAMES from "./SCREEN_NAMES";
import { StackNav } from "./StackNav";
import PlayerScreen from "../screens/PlayerScreen";
import { NavigationContainer } from "@react-navigation/native";

const Tab = createBottomTabNavigator();
export const TabNav = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          options={{ headerShown: false }}
          name={SCREEN_NAMES.MAIN_SCREEN}
          component={StackNav}
        />
        <Tab.Screen
          options={{ headerShown: false }}
          name={SCREEN_NAMES.PLAYER_SCREEN}
          component={PlayerScreen}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
