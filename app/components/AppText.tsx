import React from "react";

import { Text, StyleSheet, Platform } from "react-native";

interface props {
  children: string;
}

const AppText = ({ children }: props) => {
  return <Text style={styles.container}>{children}</Text>;
};

const styles = StyleSheet.create({
  container: {
    color: "#000",
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
    fontSize: 18,
  },
});

export default AppText;
