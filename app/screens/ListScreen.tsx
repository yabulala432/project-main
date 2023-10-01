import React, { useEffect, useLayoutEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import ListItem from "../components/ListItem";

interface props {
  navigation: any;
  route: any;
}

interface routeDataProps {
  amharic: string;
  geez: string;
  description: string;
  hymn: string;
  hymnLabel: Array<string>;
  title: string;
}

const ListScreen = ({ navigation, route }: props) => {
  const [routeData, setRouteData] = useState<routeDataProps[]>();
  useLayoutEffect(() => {
    navigation.setOptions({
      title: route.params.item.title,
    });
  }, []);

  useEffect(() => {
    setRouteData(route.params.item.data);
  }, [route.params.item]);

  // console.log({ data: routeData?.data });

  return (
    <View style={styles.container}>
      {routeData &&
        routeData?.map((item, index) => (
          <ListItem
            key={index}
            title={item.title}
            subtitle={item.hymn}
            // description={item.description}
          />
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // alignItems: "center",
  },
});

export default ListScreen;
