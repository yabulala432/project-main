import React, { useEffect, useLayoutEffect } from "react";
import { StyleSheet, View } from "react-native";

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
      headerBackTitleStyle: {
        fontSize: 20,
        fontWeight: "bold",
      },
      headerBackTitleVisible: true,
    });
  }, []);

  const { data, loading } = useZemaTitle(name);

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
  container: {},
});

export default ListScreen;
