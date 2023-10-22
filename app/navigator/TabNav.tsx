import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { colors } from "../config/colors";
import ListScreen from "../screens/ListScreen";
import SCREEN_NAMES from "./SCREEN_NAMES";
import ZemaPlayerScreen from "../screens/ZemaPlayerScreen";

const Tab = createBottomTabNavigator();

export const TabNav = ({ route }: any) => {
  const { item } = route.params;
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: colors.primary,
          width: "90%",
          alignSelf: "center",
          position: "relative",
          bottom: 10,
          height: 60,
        },
        tabBarActiveTintColor: colors.teritiary,
        tabBarLabelStyle: {
          fontSize: 15,
          fontWeight: "bold",
        },
        tabBarActiveBackgroundColor: colors.primary,
        tabBarInactiveBackgroundColor: colors.white,
      }}
    >
      <Tab.Screen
        options={{
          headerStyle: {
            backgroundColor: "#ee641f",
          },
          headerTitleAlign: "center",
          headerTintColor: "white",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="church" color={color} size={size} />
          ),
        }}
        name={SCREEN_NAMES.LIST_SCREEN}
        component={ListScreen}
        initialParams={{ item }}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="speaker-wireless"
              color={color}
              size={size}
            />
          ),
          tabBarLabel: () => null,
        }}
        name={SCREEN_NAMES.Zema_PLAYER_SCREEN}
        component={ZemaPlayerScreen}
        initialParams={{ item }}
      />
    </Tab.Navigator>
  );
};
