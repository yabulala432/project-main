import React, { useEffect, useState, useContext } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";

import AppButton from "../components/AppButton";
import AppText from "../components/AppText";
// import { endpoint } from "../env/urls";
import PlayerImage from "../components/PlayerImage";
import Screen from "../components/Screen";
import SCREEN_NAMES from "../navigator/SCREEN_NAMES";
import { AudioPlayerContext } from "../contexts/AudioPlayerContext";

// const url = endpoint;
interface props {
  route: any;
  navigation: any;
}

const PlayerScreen = ({ navigation }: props) => {
  const {
    fastForward,
    isPlaying,
    loadAudio,
    pauseAudio,
    playbackDuration,
    playbackPosition,
    playPauseLoadedAudio: playLoadedAudio,
    rewind,
    seek,
  } = useContext(AudioPlayerContext);

  const [imageState, setImageState] = useState<{
    buttonTitle: "አማርኛ" | "ግእዝ";
    imageUrl: "amharic" | "geez";
  }>({
    buttonTitle: "ግእዝ",
    imageUrl: "amharic",
  });
  // const routeData = route?.params?.item;

  const [position, setPosition] = useState<string>("00:00");

  const formatPlaybackPosition = (position: number | undefined): string => {
    if (!position) return "00:00";
    const seconds = Math.floor(position / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const formattedSeconds =
      remainingSeconds < 10 ? `0${remainingSeconds}` : `${remainingSeconds}`;
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  useEffect(() => {
    setPosition(formatDuration(playbackPosition));
  }, [playbackPosition]);

  const formatDuration = (seconds: number | undefined): string => {
    if (!seconds) return "00:00";
    const minutes = Math.floor(seconds! / 60);
    const remainingSeconds = seconds! % 60;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const formattedSeconds =
      remainingSeconds < 10 ? `0${remainingSeconds}` : `${remainingSeconds}`;
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  return (
    <Screen style={styles.container}>
      <View style={styles.upperContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(SCREEN_NAMES.LIST_SCREEN);
          }}
          style={styles.upperIcons}
        >
          <MaterialCommunityIcons name="arrow-left" size={20} color="white" />
        </TouchableOpacity>

        <Text style={styles.header}>Playing Now</Text>

        <TouchableOpacity style={styles.upperIcons}>
          <MaterialCommunityIcons name="menu" size={20} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.middleContainer}>
        <PlayerImage
          source={require("../../assets/icon.png")}
          style={styles.image}
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
                  imageState?.buttonTitle === "አማርኛ" ? "ግእዝ" : "አማርኛ",
              });
            }}
          />
        </View>
      </View>

      <View style={styles.playerUtilsContainer}>
        <View
          style={{
            width: "100%",
          }}
        >
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <AppText style={styles.counterStyle}>{position}</AppText>
            <AppText style={styles.counterStyle}>
              {playbackDuration ? formatDuration(playbackDuration) : "00:00"}
            </AppText>
          </View>
          <Slider
            style={{ width: "100%", height: 40 }}
            minimumValue={0}
            maximumValue={playbackDuration}
            value={playbackPosition}
            minimumTrackTintColor="#ee641f"
            maximumTrackTintColor="#fff"
            thumbTintColor="#ee641f"
            onSlidingStart={pauseAudio}
            onSlidingComplete={(position) => {
              seek(position);
              playLoadedAudio();
            }}
          />
        </View>
        <View style={styles.controlButtonsContainer}>
          <TouchableOpacity onPress={rewind} style={styles.button}>
            <AntDesign name="banckward" size={20} color="white" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.pauseButton}>
            <MaterialCommunityIcons
              onPress={playLoadedAudio}
              name={isPlaying ? "pause" : "play"}
              size={48}
              color="white"
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={fastForward} style={styles.button}>
            <AntDesign name="forward" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#373e44",
    paddingVertical: 50,
    paddingHorizontal: 20,
    justifyContent: "space-between",
  },
  upperContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    padding: 10,
  },
  header: {
    color: "white",
    fontSize: 17,
    fontWeight: "bold",
  },
  upperIcons: {
    padding: 10,
    backgroundColor: "#2a2d32",
    borderRadius: 50,
    elevation: 15,
  },
  middleContainer: {
    alignItems: "center",
    justifyContent: "center",
    elevation: 50,
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 10,
    borderColor: "#212529",
    borderWidth: 5,
  },
  titleContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
    padding: 10,
  },
  playerUtilsContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    width: "100%",
  },
  controlButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 20,
    width: "100%",
  },
  pauseButton: {
    backgroundColor: "#ee641f",
    width: 70,
    height: 70,
    borderRadius: 35,
    alignItems: "center",
    justifyContent: "center",
    elevation: 15,
  },
  button: {
    backgroundColor: "#282b30",
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    elevation: 15,
  },
  buttonStyle: {
    alignSelf: "flex-start",
    height: 50,
    marginVertical: 10,
    width: 100,
    backgroundColor: "#ee641f",
  },
  counterStyle: {
    color: "white",
    fontSize: 17,
  },
});

export default PlayerScreen;
