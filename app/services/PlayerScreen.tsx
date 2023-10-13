import React, { useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";

import AppButton from "../components/AppButton";
import { endpoint } from "../env/urls";
import PlayerImage from "../components/PlayerImage";
import Screen from "../components/Screen";

const url = endpoint;
interface props {
  route: any;
}

const PlayerScreen = ({ route }: props) => {
  // const sampleTrack = require("./audios/emneBeha.mp3");
  const [routeData, setRouteData] = useState(route?.params?.item);
  // setRouteData(route.params.item);

  const [imageState, setImageState] = useState<{
    buttonTitle: "Amharic" | "Geez";
    imageUrl: "amharic" | "geez";
  }>({
    buttonTitle: "Geez",
    imageUrl: "amharic",
  });

  // setRouteData(route.params.item);
  // useEffect();//() => {}, [routeData]);

  if (!routeData) return null;

  console.log({ routeData });

  return (
    <Screen style={styles.container}>
      <View style={styles.upperContainer}>
        <PlayerImage
          imageUrl={`${url}/${imageState.imageUrl}/image/${routeData}`}
        />
        <View>
          <AppButton
            style={styles.buttonStyle}
            title={imageState.buttonTitle}
            onPress={() => {
              setImageState({
                imageUrl:
                  imageState.imageUrl === "amharic" ? "geez" : "amharic",
                buttonTitle:
                  imageState?.buttonTitle === "Amharic" ? "Geez" : "Amharic",
              });
            }}
          />
        </View>
      </View>

      <View style={styles.middleContainer}>
        <Image
          source={{ uri: "https://picsum.photos/300/300" }}
          style={{ width: 250, height: 200 }}
        />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
  upperContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  buttonStyle: {
    alignSelf: "flex-start",
    height: 50,
    marginVertical: 10,
    width: 100,
  },
  middleContainer: {
    alignItems: "center",
  },
});

export default PlayerScreen;
