import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import SCREEN_NAMES from "./SCREEN_NAMES";
import { StackNav } from "./StackNav";
import PlayerScreen from "../screens/PlayerScreen";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createStackNavigator();
export const TabNav = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name={SCREEN_NAMES.MAIN_SCREEN}
          component={StackNav}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name={SCREEN_NAMES.PLAYER_SCREEN}
          component={PlayerScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
