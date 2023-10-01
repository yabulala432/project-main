import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

interface props {
  title: string;
  imageUrl: string;
}

export const Card = ({ title, imageUrl }: props) => {
  return (
    <TouchableOpacity style={styles.card}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderColor: "#ccc",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderWidth: 3,
    height: 200,
    padding: 2,
    width: 150,
  },
  image: {
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    height: "70%",
    width: "100%",
  },
  titleContainer: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
