import React, { useEffect, useLayoutEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

interface props {
  navigation: any;
  route: any;
}

const PlayerScreen = ({ navigation, route }: props) => {
  const [routeData, setRouteData] = useState<any>();
  useLayoutEffect(() => {
    navigation.setOptions({
      title: route.params.item.title,
    });
  }, []);

  useEffect(() => {
    setRouteData(route.params.item);
  }, [route.params.item]);

  // console.log({ data: routeData?.data });

  return (
    <View style={styles.container}>
      <Text>Player Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // alignItems: "center",
  },
});

export default PlayerScreen;
