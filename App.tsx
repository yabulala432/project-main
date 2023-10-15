import AudioPlayerProvider from "./app/contexts/AudioPlayerContext";
import { StackNav } from "./app/navigator/StackNav";

export default function App() {
  return (
    <AudioPlayerProvider>
      <StackNav />
    </AudioPlayerProvider>
  );
}
