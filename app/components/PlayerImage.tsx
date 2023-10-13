import { Dimensions, Image, StyleSheet, ScrollView, View } from "react-native";
import React from "react";
// import { ScrollView } from "react-native-gesture-handler";

interface props {
  imageUrl?: string;
  style?: object;
  source?: any;
}

const PlayerImage = ({ imageUrl, style, source }: props) => {
  const { width } = Dimensions.get("window");
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image
          // @ts-ignore
          source={source ? source : { uri: imageUrl }}
          resizeMode="stretch"
          width={width - 30}
          height={350}
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
