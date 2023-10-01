import { Dimensions, Image, StyleSheet, View } from "react-native";
import React from "react";

interface props {
  imageUrl: string;
  style?: object;
}

const PlayerScreenImage = ({ imageUrl, style }: props) => {
  const { width } = Dimensions.get("window");
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: imageUrl }}
        resizeMode="contain"
        width={width - 10}
        height={350}
        style={[styles.imageStyle, style]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  imageStyle: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});

export default PlayerScreenImage;
