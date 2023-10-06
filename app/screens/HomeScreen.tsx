import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import axios from "axios";

import AppText from "../components/AppText";
import { Card } from "../components/Card";
import { Main } from "./item";
import Screen from "../components/Screen";
import SCREEN_NAMES from "../navigator/SCREEN_NAMES";

const HomeScreen = ({ navigation }: any) => {
  const [data, setData] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const fetchData = async () => {
    const response = await axios.get("http://192.168.0.36:3000/kdase/titles");

    const result = await response.data;
    setData(result);
    setLoading(false);
  };
  useEffect(() => {
    fetchData();
    console.log({ data, loading });
  }, []);

  return (
    <Screen style={styles.screen}>
      <ScrollView>
        <View style={styles.container}>
          {Main.map((item, index) => (
            <Card
              title={item.title}
              key={index}
              imageUrl={item.imageUrl}
              onPress={() =>
                navigation.navigate(SCREEN_NAMES.LIST_SCREEN, { item })
              }
            />
          ))}

          {data.map((item, index) => (
            <AppText key={index} children={item} />
          ))}
        </View>
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  screen: {
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    rowGap: 10,
    justifyContent: "space-evenly",
  },
});

export default HomeScreen;
