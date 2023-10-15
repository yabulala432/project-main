import React, { useEffect, useState, useRef } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  Text,
  Animated,
  NativeSyntheticEvent,
  Button,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import { data, fetchAll } from "../services/fetchService";
import AppButton from "../components/AppButton";

const { width } = Dimensions.get("window");

const MusicPlayer = ({ route }: any) => {
  const [songs, setSongs] = useState<data[]>([]);
  const [geezAmhImage, setGeezAmhImage] = useState<"geez" | "amharic">("geez");

  const fetchData = async () => {
    const data: data[] = await fetchAll(route.params.item.name);
    setSongs(data);
    console.log(data[0].amharicImage);
    return data;
  };
  useEffect(() => {
    fetchData();
  }, []);
  const scrollX = useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    scrollX.addListener(({ value }) => {
      const index = Math.floor(value / width);
      setCurrentIndex(index);
    });

    console.log({ currentIndex });

    return () => {
      scrollX.removeAllListeners();
    };
  }, [handleScroll]);

  function handleScroll(event: NativeSyntheticEvent<any>) {
    // console.log({currentIndex});
  }

  //   const renderSongs =

  return (
    <View style={styles.container}>
      <View style={styles.mainContainer}>
        {/* image */}
        <Animated.FlatList
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
                <Image
                  source={{
                    uri:
                      geezAmhImage === "geez"
                        ? item.geezImage
                        : item.amharicImage,
                  }}
                  width={300}
                  height={340}
                  resizeMode="stretch"
                  style={styles.musicImage}
                />
                <AppButton
                  style={{
                    position: "relative",
                    top: 10,
                    right: 10,
                    width: 100,
                    height: 50,
                    alignSelf: "center",
                  }}
                  title={geezAmhImage}
                  onPress={() =>
                    setGeezAmhImage(
                      geezAmhImage === "amharic" ? "geez" : "amharic"
                    )
                  }
                />
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
              listener: (event: NativeSyntheticEvent<any>) =>
                handleScroll(event),
            }
          )}
          showsHorizontalScrollIndicator={false}
          centerContent
        />

        {/* <View>
          <Text style={[styles.songTitle, styles.songContent]}>
            {songs[currentIndex].title}
          </Text>
        </View> */}

        {/* slider */}
        <View>
          <Slider
            style={styles.progressBar}
            value={10}
            minimumValue={100}
            maximumValue={1}
            minimumTrackTintColor="#ffd369"
            maximumTrackTintColor="#fff"
            thumbTintColor="#ffd369"
            onSlidingComplete={() => {}}
          />
        </View>

        {/* music durations */}
        <View style={styles.duration}>
          <Text style={styles.durationText}>00:00</Text>
          <Text style={styles.durationText}>00:00</Text>
        </View>

        {/* music controls */}
        <View style={styles.musicControlContainer}>
          <TouchableOpacity>
            <Ionicons name="play-skip-back-outline" size={35} color="#ffd369" />
          </TouchableOpacity>
          <TouchableOpacity
          // onPress={() => togglePlayback(playbackState)}
          >
            <Ionicons name={"ios-pause-circle"} size={75} color="#ffd369" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons
              name="play-skip-forward-outline"
              size={38}
              color="#ffd369"
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.bottomContainer}>
        <View style={styles.bottomIcons}>
          <TouchableOpacity>
            <Ionicons name="heart-outline" size={38} color="#888888" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="repeat" size={38} color="#888888" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="share-outline" size={38} color="#888888" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="ellipsis-horizontal" size={38} color="#888888" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#222831",
  },
  mainContainer: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  bottomContainer: {
    alignItems: "center",
    width: width,
    backgroundColor: "#393e46",
    marginTop: 40,
  },
  bottomIcons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
  },
  mainImageWrapper: {
    width: width,
    alignSelf: "center",
    height: 340,
  },
  musicImage: {
    borderRadius: 15,
    height: 340,
    resizeMode: "stretch",
    width: 300,
    alignSelf: "center",
  },

  elevation: {
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
    color: "#EEEEEE",
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
  durationText: {
    color: "#fff",
    fontWeight: "500",
  },
  musicControlContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "60%",
    marginTop: 10,
  },
});

export default MusicPlayer;
