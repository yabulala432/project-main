import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import Slider from "@react-native-community/slider";

interface SliderProps {
  value: number;
  minimumValue: number;
  maximumValue: number;
  onValueChange: (value: number) => void;
  step?: number;
  minimumTrackTintColor?: string;
  maximumTrackTintColor?: string;
  thumbTintColor?: string;
  onSlidingComplete?: (value: number) => void;
}

const AppSlider: React.FC<SliderProps> = ({
  value,
  minimumValue,
  maximumValue,
  onValueChange,
  step = 1,
  minimumTrackTintColor = "#007AFF",
  maximumTrackTintColor = "#B7C3C4",
  thumbTintColor = "#007AFF",
  onSlidingComplete,
}) => {
  const [sliderValue, setSliderValue] = useState(value);

  const handleValueChange = (value: number) => {
    setSliderValue(value);
    onValueChange(value);
  };

  return (
    <View style={styles.container}>
      <Slider
        style={styles.slider}
        minimumValue={minimumValue}
        maximumValue={maximumValue}
        value={sliderValue}
        step={step}
        minimumTrackTintColor={minimumTrackTintColor}
        maximumTrackTintColor={maximumTrackTintColor}
        thumbTintColor={thumbTintColor}
        onValueChange={handleValueChange}
        onSlidingComplete={onSlidingComplete}
        // trackStyle={[styles.track, trackStyle]}
        // thumbStyle={[styles.thumb, thumbStyle]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  slider: {
    width: "100%",
    height: 40,
    // backgroundColor: "#d3d3d3",
  },
  track: {
    height: 5,
    borderRadius: 5,
  },
  thumb: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#fff",
  },
  text: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default AppSlider;
