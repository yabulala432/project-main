import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import Slider from "@react-native-community/slider";

interface props {
  color: string;
  progress: number;
  style?: object;
  onTouchMove?: () => void;
}

const ProgressBar = ({ progress, onProgressChange }: any) => {
  return (
    <Slider
      style={{ width: 350, height: 20 }}
      minimumValue={0}
      maximumValue={100}
      thumbTintColor="#FFD369"
      minimumTrackTintColor="#FFD369"
      maximumTrackTintColor="#FFF"
      onSlidingComplete={onProgressChange}
      value={50}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    // width: "100%",
    height: 10,
    backgroundColor: "#E0E0E0",
    borderRadius: 5,
    overflow: "hidden",
  },
});

export default ProgressBar;
