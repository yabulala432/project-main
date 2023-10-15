import React, { createContext, useState, useEffect } from "react";
import { Audio } from "expo-av";

export interface AudioPlayerContextType {
  pauseAudio: () => void;
  resumeAudio: () => void;
  stopAudio: () => void;
  isPlaying: boolean;
  loadAudio: (audio: { uri: string } | number) => Promise<void>;
  playPauseLoadedAudio: () => Promise<void>;
  playbackStatus: number | undefined;
  playbackPosition: number | undefined;
  playbackDuration: number | undefined;
  fastForward: () => void;
  rewind: () => void;
  seek: (seconds: number) => void;
}

export const AudioPlayerContext = createContext({} as AudioPlayerContextType);

const AudioPlayerProvider = ({ children }: any) => {
  const [sound, setSound] = useState<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackStatus] = useState<number | undefined>();
  const [playbackPosition, setPlaybackPosition] = useState<
    number | undefined
  >();
  const [playbackDuration, setPlaybackDuration] = useState<
    number | undefined
  >();

  useEffect(() => {
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isPlaying) {
      interval = setInterval(() => {
        handlePlaybackDurationUpdate();
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isPlaying]);

  const handlePlaybackDurationUpdate = async () => {
    try {
      if (sound) {
        const status = await sound.getStatusAsync();
        const seconds = Math.floor(status.positionMillis / 1000);
        setPlaybackPosition(seconds);

        if (playbackDuration === seconds) {
          stopAudio();
          setPlaybackPosition(0);
        }
      }
    } catch (error) {
      console.log("Error getting playback duration:", error);
    }
  };

  const loadAudio = async (audio: any) => {
    try {
      if (sound) {
        await sound.unloadAsync();
      }
      const { sound: newSound } = await Audio.Sound.createAsync(audio);

      await newSound.getStatusAsync().then((status: any) => {
        const durationInSeconds = Math.floor(status.durationMillis / 1000);
        setPlaybackDuration(durationInSeconds);
      });
      setSound(newSound);
      setIsPlaying(false);
    } catch (error) {
      console.log("Error loading audio:", error);
    }
  };

  const playPauseLoadedAudio = async () => {
    try {
      if (sound) {
        if (!isPlaying) {
          await sound.playAsync();
          setIsPlaying(true);
        } else {
          await sound.pauseAsync();
          setIsPlaying(false);
        }
      }
    } catch (error) {
      console.log("Error playing audio:", error);
    }
  };

  const pauseAudio = async () => {
    try {
      if (sound) {
        await sound.pauseAsync();
        setIsPlaying(false);
      }
    } catch (error) {
      console.log("Error pausing audio:", error);
    }
  };

  const resumeAudio = async () => {
    try {
      if (sound) {
        await sound.playAsync();
        setIsPlaying(true);
      }
    } catch (error) {
      console.log("Error resuming audio:", error);
    }
  };

  const stopAudio = async () => {
    try {
      if (sound) {
        await sound.stopAsync();
        setIsPlaying(false);
      }
    } catch (error) {
      console.log("Error stopping audio:", error);
    }
  };

  const fastForward = async () => {
    try {
      if (sound) {
        const currentPosition = await sound
          .getStatusAsync()
          .then((status: any) => status.positionMillis);
        const newPosition = currentPosition + 5000; // Add 5000 milliseconds (5 seconds)

        await sound.setPositionAsync(newPosition);
        setPlaybackPosition(Math.floor(newPosition / 1000));
      }
    } catch (error) {
      console.log("Error fast forwarding audio:", error);
    }
  };

  const rewind = async () => {
    try {
      if (sound) {
        const currentPosition = await sound
          .getStatusAsync()
          .then((status: any) => status.positionMillis);
        const newPosition = Math.max(currentPosition - 5000, 0); // Subtract 5000 milliseconds (5 seconds)

        await sound.setPositionAsync(newPosition);
        setPlaybackPosition(Math.floor(newPosition / 1000));
      }
    } catch (error) {
      console.log("Error rewinding audio:", error);
    }
  };

  const seek = async (seconds: number) => {
    try {
      if (sound) {
        const newPosition = seconds * 1000;
        await sound.setPositionAsync(newPosition);
        setPlaybackPosition(seconds);
      }
    } catch (error) {
      console.log("Error setting playback position:", error);
    }
  };

  return (
    <AudioPlayerContext.Provider
      value={{
        fastForward,
        isPlaying,
        loadAudio,
        pauseAudio,
        playbackDuration,
        playbackPosition,
        playbackStatus,
        playPauseLoadedAudio,
        resumeAudio,
        rewind,
        seek,
        stopAudio,
      }}
    >
      {children}
    </AudioPlayerContext.Provider>
  );
};

export default AudioPlayerProvider;
