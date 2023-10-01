import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import Screen from "../components/Screen";
import { Card } from "../components/Card";

const HomeScreen = () => {
  return (
    <Screen style={styles.screen}>
      <ScrollView>
        <View style={styles.container}>
          <Card
            title="Red Jacket"
            imageUrl="https://www.betesamuel.com/cdn/shop/products/17b.jpg?v=1665705255"
          />
          <Card
            title="Blue Jacket"
            imageUrl="https://www.betesamuel.com/cdn/shop/products/17b.jpg?v=1665705255"
          />
          <Card
            title="Green Jacket"
            imageUrl="https://www.betesamuel.com/cdn/shop/products/16aa.jpg?v=1665705255"
          />
          <Card
            title="Red Jacket"
            imageUrl="https://www.betesamuel.com/cdn/shop/products/17b.jpg?v=1665705255"
          />
          <Card
            title="Blue Jacket"
            imageUrl="https://www.betesamuel.com/cdn/shop/products/17b.jpg?v=1665705255"
          />
          <Card
            title="Green Jacket"
            imageUrl="https://www.betesamuel.com/cdn/shop/products/16aa.jpg?v=1665705255"
          />
          <Card
            title="Blue Jacket"
            imageUrl="https://www.betesamuel.com/cdn/shop/products/17b.jpg?v=1665705255"
          />
          <Card
            title="Green Jacket"
            imageUrl="https://www.betesamuel.com/cdn/shop/products/16aa.jpg?v=1665705255"
          />
          <Card
            title="Red Jacket"
            imageUrl="https://www.betesamuel.com/cdn/shop/products/17b.jpg?v=1665705255"
          />
          <Card
            title="Blue Jacket"
            imageUrl="https://www.betesamuel.com/cdn/shop/products/17b.jpg?v=1665705255"
          />
          <Card
            title="Green Jacket"
            imageUrl="https://www.betesamuel.com/cdn/shop/products/16aa.jpg?v=1665705255"
          />
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
