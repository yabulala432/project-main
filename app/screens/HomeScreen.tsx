import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import { Card } from "../components/Card";
import { Main } from "../mock/item";
import Screen from "../components/Screen";
import SCREEN_NAMES from "../navigator/SCREEN_NAMES";

const HomeScreen = ({ navigation }: any) => {
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
