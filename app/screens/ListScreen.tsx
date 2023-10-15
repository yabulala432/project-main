import React, { useEffect, useLayoutEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

import ListItem from "../components/ListItem";
import SCREEN_NAMES from "../navigator/SCREEN_NAMES";
import { useZemaTitle } from "../hooks/useKdase";
import { endpoint } from "../env/urls";

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

  const [selectedItem, setSelectedItem] = useState<any>(null);

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
            setSelectedItem(item);
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
