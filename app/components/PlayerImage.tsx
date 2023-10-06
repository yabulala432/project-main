import { Dimensions, Image, StyleSheet, View } from "react-native";
import React from "react";

interface props {
  imageUrl?: string;
  style?: object;
  source?: any;
}

const PlayerImage = ({ imageUrl, style, source }: props) => {
  const { width } = Dimensions.get("window");
  return (
    <View style={styles.container}>
      <Image
        // @ts-ignore
        source={source ? source : { uri: imageUrl }}
        resizeMode="stretch"
        width={width - 20}
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

export default PlayerImage;
