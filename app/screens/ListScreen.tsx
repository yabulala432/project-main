import React, { useLayoutEffect } from "react";
import { StyleSheet, View } from "react-native";

import ListItem from "../components/ListItem";
import SCREEN_NAMES from "../navigator/SCREEN_NAMES";
import { useKdaseTitle } from "../hooks/useKdase";

interface props {
  navigation: any;
  route: any;
}

const ListScreen = ({ navigation, route }: props) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: route.params.item.title,
    });
  }, []);

  const { data, loading } = useKdaseTitle();

  // console.log(data);

  return (
    <View style={styles.container}>
      {data.map((item, index) => (
        <ListItem
          key={index}
          title={item}
          onPress={() => {
            navigation.navigate(SCREEN_NAMES.PLAYER_SCREEN, { item });
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
