import React, { useEffect, useState, useRef, useContext } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
  Animated,
  FlatList,
} from "react-native";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";

import AppButton from "../components/AppButton";
import AppText from "../components/AppText";
import { AudioPlayerContext } from "../contexts/AudioPlayerContext";
import { colors } from "../config/colors";
import { data, fetchAll } from "../services/fetchService";
import PlayerImage from "../components/PlayerImage";

const { width } = Dimensions.get("window");

const ZemaPlayerScreen = ({ route }: any) => {
  const [songs, setSongs] = useState<data[]>([]);
  const [imageState, setImageState] = useState<"አማርኛ" | "ግእዝ">("ግእዝ");
  const {
    fastForward,
    isPlaying,
    loadAudio,
    pauseAudio,
    playbackDuration,
    playbackPosition,
    playPauseLoadedAudio,
    rewind,
    seek,
  } = useContext(AudioPlayerContext);

  const fetchData = async () => {
    const data: data[] = await fetchAll(route.params.item.name);
    setSongs(data);
    await loadAudio({ uri: data[0].geezAudio });
    return data;
  };
  useEffect(() => {
    fetchData();
  }, []);
  const scrollX = useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [position, setPosition] = useState<string>("00:00");
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    navigateToSong(route.params.selectedIndex);
  }, [route.params.selectedIndex]);

  const navigateToSong = (index: number) => {
    setCurrentIndex(index);
    try {
      flatListRef.current?.scrollToIndex({ index });
    } catch (error) {
      console.log("Error Scrolling to index ", index, error);
    }
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

  useEffect(() => {
    scrollX.addListener(({ value }) => {
      const index = Math.floor(value / width);
      setCurrentIndex(index);
    });
    loadAudio({ uri: songs[currentIndex]?.geezAudio });
    return () => {
      scrollX.removeAllListeners();
    };
  }, [currentIndex]);

  return (
    <View style={styles.container}>
      <View style={styles.mainContainer}>
        {/* image */}
        <Animated.FlatList
          ref={flatListRef}
          data={songs}
          keyExtractor={(item) => item.title}
          renderItem={({ item, index }) => {
            const inputRange = [
              (index - 1) * width,
              index * width,
              (index + 1) * width,
            ];

            const opacity = scrollX.interpolate({
              inputRange,
              outputRange: [0, 1, 0],
            });

            return (
              <Animated.View
                style={[styles.mainImageWrapper, styles.elevation]}
              >
                <PlayerImage
                  source={{
                    uri:
                      imageState === "ግእዝ" ? item.geezImage : item.amharicImage,
                  }}
                  width={width}
                  height={400}
                  resizeMode="stretch"
                  style={styles.musicImage}
                />
                <View style={[styles.middleContainer]}>
                  <AppButton
                    style={styles.buttonStyle}
                    title={imageState === "ግእዝ" ? "አማርኛ" : "ግእዝ"}
                    onPress={() => {
                      setImageState(imageState === "ግእዝ" ? "አማርኛ" : "ግእዝ");
                    }}
                  />
                </View>
              </Animated.View>
            );
          }}
          horizontal
          pagingEnabled={true}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            {
              useNativeDriver: true,
              //   listener: (event: NativeSyntheticEvent<any>) =>
              //     handleScroll(event),
            }
          )}
          showsHorizontalScrollIndicator={false}
          centerContent
        />
        <View style={styles.playerUtilsContainer}>
          {
            <View>
              {songs[currentIndex] && (
                <Text style={[styles.songTitle, styles.songContent]}>
                  {songs[currentIndex]?.title}
                </Text>
              )}
            </View>
          }
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
              minimumTrackTintColor={colors.primary}
              maximumTrackTintColor={colors.teritiary}
              thumbTintColor={colors.primary}
              onSlidingStart={pauseAudio}
              onSlidingComplete={(position) => {
                seek(position);
                playPauseLoadedAudio();
              }}
            />
          </View>
          <View style={styles.controlButtonsContainer}>
            <TouchableOpacity onPress={rewind} style={styles.button}>
              <AntDesign name="banckward" size={20} color="white" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.pauseButton}>
              <MaterialCommunityIcons
                onPress={playPauseLoadedAudio}
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
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    height: "100%",
  },
  mainContainer: {
    flex: 1,
  },
  bottomContainer: {
    alignItems: "center",
    width: width,
    marginTop: 40,
  },
  bottomIcons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
  },
  middleContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  mainImageWrapper: {
    width: width,
    alignSelf: "flex-start",
    height: 340,
  },
  buttonStyle: {
    height: 50,
    marginVertical: 10,
    width: 100,
    backgroundColor: colors.primary,
  },
  musicImage: {
    borderRadius: 15,
    height: 370,
    resizeMode: "stretch",
    width: width,
    alignSelf: "center",
    borderBottomWidth: 1,
    borderColor: colors.primary,
  },
  elevation: {
    borderColor: colors.primary,
    elevation: 5,
    shadowColor: "#ccc",
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
  },
  songContent: {
    textAlign: "center",
    color: colors.teritiary,
  },
  songTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  artistName: {
    fontSize: 15,
    fontWeight: "300",
  },
  progressBar: {
    width: 350,
    height: 40,
    marginTop: 25,
    flexDirection: "row",
  },
  duration: {
    width: 340,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  musicControlContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "60%",
    marginTop: 10,
  },
  playerUtilsContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    paddingVertical: 40,
    width: "100%",
  },
  counterStyle: {
    color: colors.primary,
    fontSize: 17,
  },
  controlButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingBottom: 40,
    width: "100%",
  },
  pauseButton: {
    backgroundColor: colors.primary, //"#ee641f",
    width: 70,
    height: 70,
    borderRadius: 35,
    alignItems: "center",
    justifyContent: "center",
    elevation: 15,
  },
  button: {
    backgroundColor: colors.secondary,
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    elevation: 15,
  },
});

export default ZemaPlayerScreen;
