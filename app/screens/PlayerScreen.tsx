import React, { useEffect, useMemo, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";

import AppButton from "../components/AppButton";
import { endpoint } from "../env/urls";
import PlayerImage from "../components/PlayerImage";
import Screen from "../components/Screen";
import AudioPlayerService from "../services/AudioPlayerService";
import SCREEN_NAMES from "../navigator/SCREEN_NAMES";
import AppText from "../components/AppText";

const url = endpoint;
interface props {
  route: any;
  navigation: any;
}

const PlayerScreen = ({ route, navigation }: props) => {
  const audioPlayer = useMemo(() => {
    return new AudioPlayerService({
      uri: `${endpoint}/geez/audio/${route?.params?.item}`,
    });
  }, [route?.params?.item]);

  const [imageState, setImageState] = useState<{
    buttonTitle: "አማርኛ" | "ግእዝ";
    imageUrl: "amharic" | "geez";
  }>({
    buttonTitle: "ግእዝ",
    imageUrl: "amharic",
  });
  const routeData = route?.params?.item;
  const [playbackPosition, setPlaybackPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playing, setPlaying] = useState<boolean>(false);

  if (!routeData) return null;

  useEffect(() => {
    const intervalId = setInterval(async () => {
      const newPosition = audioPlayer.getCurrentPlaybackPosition();
      setPlaybackPosition(newPosition);
      if (playbackPosition !== 0 && playbackPosition === duration) {
        await audioPlayer.stop().then(() => {
          setPlaying(false);
        });
      }
      // console.log({ playbackPosition, duration });
    }, 1000);
    audioPlayer.getDuration();
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (formatDuration(duration) === formatPlaybackPosition(playbackPosition)) {
      setPlaying(false);
    }
  }, [playbackPosition]);

  const formatPlaybackPosition = (position: number): string => {
    const seconds = Math.floor(position / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const formattedSeconds =
      remainingSeconds < 10 ? `0${remainingSeconds}` : `${remainingSeconds}`;
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  const handlePlay = async () => {
    if (!playing) {
      await audioPlayer.play().then(() => {
        setPlaying(true);
      });
      handleGetDuration();
    }
  };

  const handlePause = async () => {
    await audioPlayer.pause().then(() => {
      setPlaying(false);
    });
  };

  const handleFastForward = async () => {
    await audioPlayer.fastForward();
  };

  const handleRewind = async () => {
    await audioPlayer.rewind();
  };

  const handleSetPlaybackPosition = async (position: number) => {
    await audioPlayer.setPlaybackPosition(position);
    setPlaybackPosition(position);
  };

  const handleGetDuration = () => {
    const duration = audioPlayer.getDuration();
    setDuration(duration);
    // if(duration === )
    return duration;
  };

  const formatDuration = (duration: number): string => {
    const seconds = Math.floor(duration / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const formattedSeconds =
      remainingSeconds < 10 ? `0${remainingSeconds}` : `${remainingSeconds}`;
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  return (
    <Screen style={styles.container}>
      <View style={styles.upperContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate(SCREEN_NAMES.LIST_SCREEN)}
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
          imageUrl={`${url}/${imageState.imageUrl}/image/${routeData}`}
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

        <View style={styles.titleContainer}>
          <AppText style={{ color: "white", fontSize: 30, fontWeight: "bold" }}>
            {routeData}
          </AppText>
          <Text style={{ color: "grey", fontSize: 17 }}></Text>
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
            <AppText style={{ color: "white" }}>
              {formatPlaybackPosition(playbackPosition)}
            </AppText>
            <AppText style={{ color: "white" }}>
              {formatDuration(duration)}
            </AppText>
          </View>
          <Slider
            style={{ width: "100%", height: 40 }}
            minimumValue={0}
            maximumValue={duration}
            value={playbackPosition}
            minimumTrackTintColor="#ee641f"
            maximumTrackTintColor="#fff"
            thumbTintColor="#ee641f"
            onSlidingStart={handlePause}
            onSlidingComplete={(position) => {
              handleSetPlaybackPosition(position);
              handlePlay();
            }}
          />
        </View>
        <View style={styles.controlButtonsContainer}>
          <TouchableOpacity onPress={handleRewind} style={styles.button}>
            <AntDesign name="banckward" size={20} color="white" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.pauseButton}>
            <MaterialCommunityIcons
              onPress={playing ? handlePause : handlePlay}
              name={playing ? "pause" : "play"}
              size={48}
              color="white"
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={handleFastForward} style={styles.button}>
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
});

export default PlayerScreen;
