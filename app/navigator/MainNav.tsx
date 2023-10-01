import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";

import HomeScreen from "../screens/HomeScreen";
import PlayerScreen from "../screens/PlayerScreen";
import SCREEN_NAMES from "./SCREEN_NAMES";

const Stack = createStackNavigator();
export const MainNav = () => {
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
          name={SCREEN_NAMES.PLAYER_SCREEN}
          component={PlayerScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
