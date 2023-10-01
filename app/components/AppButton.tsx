import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

interface ButtonProps {
  title: string;
  onPress: () => void;
  style?: object;
}

const AppButton: React.FC<ButtonProps> = ({ title, onPress, style }) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: "#007AFF",
    borderRadius: 5,
    justifyContent: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default AppButton;
