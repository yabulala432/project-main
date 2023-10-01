import { StyleSheet } from "react-native";
import { Card } from "./app/components/Card";

import Screen from "./app/components/Screen";
import HomeScreen from "./app/screens/HomeScreen";

export default function App() {
  return (
    <Screen style={styles.container}>
      <HomeScreen />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {},
});
