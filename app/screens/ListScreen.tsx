import React, { useEffect, useLayoutEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

import { endpoint } from "../env/urls";
import ListItem from "../components/ListItem";
import SCREEN_NAMES from "../navigator/SCREEN_NAMES";
import { useZemaTitle } from "../hooks/useKdase";

interface props {
  navigation: any;
  route: any;
}

const ListScreen = ({ navigation, route }: props) => {
  const { name } = route?.params?.item;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: route.params.item.title,
      headerTitleAlign: "flex-start",
      headerTitleStyle: {
        fontSize: 20,
        fontWeight: "bold",
      },
      backTitleVisible: true,
      headerBackTitle: "ተመለስ",
      headerBackTitleStyle: {
        fontSize: 20,
        fontWeight: "bold",
      },
      headerBackTitleVisible: true,
    });
  }, []);

  const { data, loading } = useZemaTitle(name);

  const fetchAllData = async () => {
    const response = await fetch(
      `${endpoint}/geez/audio/${route?.params?.item}`
    );
    const data = await response.json();
    return data;
  };

  useEffect(() => {}, []);

  return (
    <View style={styles.container}>
      {data.map((item, index) => (
        <ListItem
          key={index}
          title={item}
          onPress={() => {
            navigation.navigate(SCREEN_NAMES.Zema_PLAYER_SCREEN, {
              selectedIndex: index,
            });
          }}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // alignItems: "center",
  },
});

export default ListScreen;
