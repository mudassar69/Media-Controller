import React, {useState, useRef} from 'react';
import {StyleSheet, View} from 'react-native';
import Video from 'react-native-video';
import MediaPanel from './components/mediaPanel';
import {PlayerStates} from './helper';

const App = () => {
  let videoPlayer = useRef(null);
  const [currentTime, setCurrentTime] = useState(1);
  const [duration, setDuration] = useState<number>(1);
  const [isLoading, setIsLoading] = useState(true);
  const [paused, setPaused] = useState(false);
  const [playerState, setPlayerState] = useState(PlayerStates.Playing);

  const onMediaButtonClick = () => {
    if (playerState === PlayerStates.Ended) {
      onReplay();
    } else {
      onPaused();
    }
  };
  const onSeek = (seek: number) => {
    videoPlayer.current?.seek(seek);
  };

  const onPaused = () => {
    if (paused) {
      setPlayerState(PlayerStates.Playing);
    } else {
      setPlayerState(PlayerStates.Paused);
    }
    setPaused(!paused);
  };

  const onReplay = () => {
    onSeek(6);
    setPaused(false);
    setPlayerState(PlayerStates.Playing);
  };

  const onSeekStarted = () => {
    setPaused(true);
    setPlayerState(PlayerStates.Paused);
  };

  const onProgress = (data: {currentTime: number}) => {
    if (!isLoading && playerState !== PlayerStates.Ended) {
      setCurrentTime(data.currentTime);
    }
  };

  const onEnd = () => {
    setPlayerState(PlayerStates.Ended);
    setPaused(true);
  };

  const onLoad = (data: {duration: number}) => {
    setDuration(data.duration);
    setIsLoading(false);
  };

  const onLoadStart = () => setIsLoading(true);

  return (
    <View style={styles.container}>
      <Video
        onEnd={onEnd}
        onLoad={onLoad}
        onLoadStart={onLoadStart}
        onProgress={onProgress}
        paused={paused}
        ref={videoPlayer}
        source={{
          uri:
            'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        }}
        style={styles.mediaPlayer}
        volume={100}
      />

      <MediaPanel
        playerState={playerState}
        currentTime={currentTime}
        duration={duration}
        onClick={onMediaButtonClick}
        onSeekStarted={onSeekStarted}
        onSeekCompleted={onSeek}
      />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  toolbar: {
    marginTop: 30,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
  mediaPlayer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 500,
    right: 0,
    justifyContent: 'center',
  },
  mediaControls: {
    position: 'absolute',
    left: 0,
    top: 100,
    bottom: 0,
    right: 0,
  },
});
