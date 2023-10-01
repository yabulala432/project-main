import { StyleSheet } from "react-native";
import { MainNav } from "./app/navigator/MainNav";
import PlayerScreenImage from "./app/components/PlayerScreenImage";
import Screen from "./app/components/Screen";

export default function App() {
  return (
    <Screen>
      <PlayerScreenImage imageUrl="https://www.picsum.photos/200/200" />
    </Screen>
    // <MainNav />
  );
}

const styles = StyleSheet.create({
  container: {},
});
