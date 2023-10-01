import React from "react";
import { View, StyleSheet, Platform } from "react-native";
import Constants from "expo-constants";

interface props {
  children: React.ReactNode | Element | Element[] | any;
  style?: object;
}

const Screen = ({ children, style }: props) => {
  return <View style={[styles.container, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  },
});

export default Screen;
