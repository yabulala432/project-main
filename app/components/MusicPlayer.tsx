import { Audio, InterruptionModeIOS, InterruptionModeAndroid } from "expo-av";
import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import AppSlider from "./AppSlider";

interface props {
  track: any;
}

const MusicPlayer = ({ track }: props) => {
  const [playPauseIcon, setPlayPauseIcon] = useState<"caretright" | "pause">(
    "caretright"
  );
  const sound = useRef(new Audio.Sound());
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageState, setImageState] = useState<{
    buttonTitle: "Amharic" | "Geez";
    imageUrl: "amharic" | "geez";
  }>({
    buttonTitle: "Geez",
    imageUrl: "amharic",
  });

  useEffect(() => {
    loadAudio();
    setImageState({
      imageUrl: "amharic",
      buttonTitle: "Geez",
    });
  }, []);

  const loadAudio = async () => {
    setLoading(true);
    Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      interruptionModeIOS: InterruptionModeIOS.DoNotMix,
      playsInSilentModeIOS: true,
      interruptionModeAndroid: InterruptionModeAndroid.DoNotMix,
      staysActiveInBackground: true,
      shouldDuckAndroid: true,
      playThroughEarpieceAndroid: false,
    });
    const checkLoading = await sound.current.getStatusAsync();
    if (checkLoading.isLoaded === false) {
      try {
        const result = await sound.current.loadAsync(track, {}, true);
        if (result.isLoaded === false) {
          setLoading(false);
          console.log("Error in Loading Audio");
        } else {
          setLoading(false);
          setLoaded(true);
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

  const pauseAudio = async () => {
    try {
      const result = await sound.current.getStatusAsync();
      if (result.isLoaded) {
        if (result.isPlaying === true) {
          sound.current.pauseAsync();
        }
      }
      setPlayPauseIcon("caretright");
    } catch (error) {}
  };

  const playAudio = async () => {
    try {
      const result = await sound.current.getStatusAsync();
      console.log({ result });
      if (result.isLoaded) {
        if (result.isPlaying === false) {
          sound.current.playAsync();
        }
      }
      setPlayPauseIcon("pause");
    } catch (error) {}
  };

  const stopAudio = async () => {
    try {
      const result = await sound.current.getStatusAsync();
      if (result.isLoaded) {
        if (result.isPlaying === true) {
          sound.current.stopAsync();
        }
      }
      setPlayPauseIcon("caretright");
    } catch (error) {}
  };

  return (
    <View style={[styles.bottomContainer]}>
      <AppSlider
        maximumValue={100}
        minimumValue={0}
        onValueChange={() => {}}
        value={20}
        onSlidingComplete={() => {}}
      />
      <View style={styles.playerButtons}>
        <TouchableOpacity>
          <AntDesign
            name="stepbackward"
            color="black"
            size={30}
            style={{ marginHorizontal: 10 }}
          />
        </TouchableOpacity>

        <TouchableOpacity>
          <AntDesign
            name="banckward"
            color="black"
            size={30}
            style={{ marginHorizontal: 10 }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            if (playPauseIcon === "caretright") {
              //   playAudio();
              // } else {
              //   pauseAudio();
            }
          }}
        >
          <AntDesign
            name={playPauseIcon}
            color="black"
            size={50}
            style={{ marginHorizontal: 10 }}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <AntDesign
            name="forward"
            color="black"
            size={30}
            style={{ marginHorizontal: 10 }}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <AntDesign
            name="stepforward"
            color="black"
            size={30}
            style={{ marginHorizontal: 10 }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  playerButtons: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
  },
  bottomContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 20,
  },
});

export default MusicPlayer;
