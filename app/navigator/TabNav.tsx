import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";

import ListScreen from "../screens/ListScreen";
import SCREEN_NAMES from "./SCREEN_NAMES";
import PlayerScreen from "../screens/PlayerScreen";

const Tab = createBottomTabNavigator();
export const TabNav = ({ route }: any) => {
  console.log({ route });
  const { item } = route.params;

  return (
    <Tab.Navigator>
      <Tab.Screen
        options={{
          headerStyle: {
            backgroundColor: "green",
          },
          headerTitleAlign: "center",
          headerTintColor: "white",
        }}
        name={SCREEN_NAMES.LIST_SCREEN}
        component={ListScreen}
        initialParams={{ item }}
      />
      <Tab.Screen
        options={{
          headerShown: false,
        }}
        name={SCREEN_NAMES.PLAYER_SCREEN}
        component={PlayerScreen}
        initialParams={{ item }}
      />
    </Tab.Navigator>
  );
};

// screenOptions={({ route }) => {
//   return {
//     tabBarIcon: ({ focused, color, size }: any) => {
//       let iconName = "list";
//       if (route.name === SCREEN_NAMES.HOME_SCREEN) {
//         iconName = focused ? "home" : "home-outline";
//       } else if (route.name === SCREEN_NAMES.LIST_SCREEN) {
//         iconName = focused ? "list" : "list-outline";
//       }
//       return <Ionicons name={iconName} size={size} color={color} />;
//     },
//   };
// }}
