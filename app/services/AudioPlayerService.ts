import {
  AVPlaybackStatus,
  Audio,
  InterruptionModeAndroid,
  InterruptionModeIOS,
} from "expo-av";

type SoundStatus = "loading" | "loaded" | "error";

class AudioPlayerService {
  private sound: Audio.Sound | null = null;
  private soundStatus: SoundStatus = "loading";
  private playbackPosition: number = 0;
  private duration: number = 0;

  constructor(private soundObj: any) {
    Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      interruptionModeAndroid: InterruptionModeAndroid.DuckOthers,
      interruptionModeIOS: InterruptionModeIOS.DuckOthers,
      playsInSilentModeIOS: true,
      playThroughEarpieceAndroid: false,
      shouldDuckAndroid: true,
      staysActiveInBackground: true,
    });

    this.loadSound(this.soundObj).then((response) => {
      if (response) {
        this.duration = response.duration;
        console.log(response.duration, "from constructor");
      }
    });
  }

  async loadSound(
    soundObj: any
  ): Promise<{ soundData: any; duration: number } | undefined> {
    try {
      this.sound = new Audio.Sound();
      this.soundStatus = "loaded";
      const soundData = await this.sound.loadAsync(
        // require("../assets/music/emne_beha.mp3")
        soundObj
      );
      this.sound.setOnPlaybackStatusUpdate(this.handlePlaybackStatusUpdate);
      // @ts-ignore
      const duration = soundData?.durationMillis;
      // console.log("duration", duration);
      return { soundData, duration };
      // return {soundData};
    } catch (error) {
      console.log("Error loading sound:", error);
    }
  }

  private handlePlaybackStatusUpdate = (status: AVPlaybackStatus) => {
    if (status.isLoaded) {
      this.playbackPosition = status.positionMillis;
      if (this.duration === this.playbackPosition) {
        setTimeout(() => {
          this.stop();
        }, 200);
      }
    }
  };

  async play(): Promise<void> {
    if (this.sound && this.soundStatus === "loaded") {
      await this.sound.playAsync();
    }
  }

  async pause(): Promise<void> {
    if (this.sound && this.soundStatus === "loaded") {
      await this.sound.pauseAsync();
    }
  }

  async resume(): Promise<void> {
    if (this.sound && this.soundStatus === "loaded") {
      await this.sound.playAsync();
    }
  }

  async stop(): Promise<void> {
    if (this.sound && this.soundStatus === "loaded") {
      await this.sound.stopAsync();
      this.playbackPosition = 0;
    }
  }

  async fastForward(): Promise<void> {
    if (this.sound && this.soundStatus === "loaded") {
      const status = await this.sound.getStatusAsync();
      // @ts-ignore
      const newPosition = status.positionMillis + 10000;
      await this.setPlaybackPosition(newPosition);
    }
  }

  async rewind(): Promise<void> {
    if (this.sound && this.soundStatus === "loaded") {
      const status = await this.sound.getStatusAsync();
      // @ts-ignore
      const newPosition = status.positionMillis - 10000;
      await this.setPlaybackPosition(newPosition);
    }
  }

  async setPlaybackPosition(position: number): Promise<void> {
    if (this.sound && this.soundStatus === "loaded") {
      await this.sound.setPositionAsync(position);
      this.playbackPosition = position;
    }
  }

  getDuration(): number {
    // console.log(this.duration, "from the getDuration function");
    return this.duration;
  }

  getCurrentTime(): string {
    const seconds = Math.floor(this.playbackPosition / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const formattedSeconds =
      remainingSeconds < 10 ? `0${remainingSeconds}` : `${remainingSeconds}`;
    return `${formattedMinutes}:${formattedSeconds}`;
  }

  getCurrentPlaybackPosition(): number {
    return this.playbackPosition;
  }
}

export default AudioPlayerService;
