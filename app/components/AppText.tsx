import React from "react";

import { Text, StyleSheet, Platform } from "react-native";

interface props {
  children: any;
  style?: Object;
}

const AppText = ({ children, style }: props) => {
  return <Text style={[styles.container, style]}>{children}</Text>;
};

const styles = StyleSheet.create({
  container: {
    color: "#000",
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
    fontSize: 18,
  },
});

export default AppText;
