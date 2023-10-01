import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import AppButton from "../components/AppButton";
import ListItem from "../components/ListItem";
import PlayerImage from "../components/PlayerImage";
import Screen from "../components/Screen";

interface props {
  route: any;
}

interface routeDataProps {
  amharic: string;
  description: string;
  geez: string;
  hymn: string;
  hymnLabel: Array<string>;
  title: string;
}

const PlayerScreen = ({ route }: props) => {
  const [routeData, setRouteData] = useState<routeDataProps>(
    route?.params?.item
  );

  useEffect(() => {
    setRouteData(route?.params?.item);
    console.log({ routeData });
  }, [route?.params?.item]);

  const [imageState, setImageState] = useState<{
    buttonTitle: "Amharic" | "Geez";
    imageUrl: string;
  }>({
    buttonTitle: "Geez",
    imageUrl: routeData?.amharic,
  });
  if (!routeData) return null;
  return (
    <Screen style={styles.container}>
      <PlayerImage imageUrl={imageState.imageUrl} />

      <View style={styles.middleContainer}>
        <View style={{ flex: 1 }}>
          <AppButton
            style={styles.buttonStyle}
            title={imageState.buttonTitle}
            onPress={() => {
              setImageState({
                imageUrl:
                  imageState.imageUrl === routeData.geez
                    ? routeData?.amharic
                    : routeData?.geez,
                buttonTitle:
                  imageState?.buttonTitle === "Amharic" ? "Geez" : "Amharic",
              });
            }}
          />
        </View>
        <View
          style={{
            flex: 2,
            height: 200,
          }}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ minHeight: 150 }}
          >
            {routeData?.hymnLabel?.map((item, index) => (
              <ListItem
                key={index}
                title={item}
                onPress={() => {}}
                style={{
                  backgroundColor: "#f8f4f4",
                }}
                rightIcon={
                  <MaterialCommunityIcons
                    name="play-circle-outline"
                    color="black"
                    size={40}
                  />
                }
              />
            ))}
          </ScrollView>
        </View>
      </View>

      <View style={styles.bottomContainer}></View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
  buttonStyle: {
    alignSelf: "flex-start",
    height: 50,
    marginVertical: 10,
    width: 100,
  },
  middleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  bottomContainer: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    backgroundColor: "dodgerblue",
  },
});

export default PlayerScreen;
