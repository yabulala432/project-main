import { Dimensions, Image, StyleSheet, ScrollView, View } from "react-native";
import React from "react";

interface props {
  imageUrl?: string;
  style?: object;
  source?: any;
  width?: number;
  height?: number;
  resizeMode?: any;
}

const PlayerImage = ({
  imageUrl,
  style,
  source,
  width,
  height,
  resizeMode,
}: props) => {
  const { width: window } = Dimensions.get("window");
  return (
    <View style={[styles.container, { height: height }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image
          source={source ? source : { uri: imageUrl }}
          width={width ? width : window - 30}
          height={height ? height : 550}
          resizeMode={resizeMode ? resizeMode : "cover"}
          style={[styles.imageStyle, style]}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    height: 300,
  },
  imageStyle: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});

export default PlayerImage;
