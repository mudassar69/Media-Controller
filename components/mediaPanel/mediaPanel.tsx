import React from 'react';
import {Image, Pressable, View} from 'react-native';
import Slider from '@react-native-community/slider';
import styles from './styles';
import {Text} from 'react-native';
import {PlayerStates} from '../../helper';

interface Props {
  playerState: PlayerStates;
  duration: number;
  currentTime: number;
  onSeekCompleted: (time: number) => void;
  onSeekStarted: () => void;
  onClick: () => void;
}
const MediaPanel: React.FC<Props> = ({
  playerState,
  currentTime,
  duration,
  onSeekCompleted,
  onSeekStarted,
  onClick,
}) => {
  function renderPlayerButton() {
    return (
      <Pressable onPress={onClick}>
        {playerState === PlayerStates.Paused && (
          <Image
            style={styles.buttonStyle}
            source={require('../../assets/play.jpg')}
          />
        )}
        {playerState === PlayerStates.Playing && (
          <Image
            style={styles.buttonStyle}
            source={require('../../assets/pause.jpg')}
          />
        )}
        {playerState === PlayerStates.Ended && (
          <Image
            style={styles.buttonStyle}
            source={require('../../assets/replay.png')}
          />
        )}
      </Pressable>
    );
  }

  return (
    <View style={styles.container}>
      {renderPlayerButton()}
      <View style={styles.sliderContainer}>
        <Slider
          value={currentTime}
          maximumValue={duration}
          onSlidingStart={onSeekStarted}
          onSlidingComplete={onSeekCompleted}
          minimumTrackTintColor="red"
          maximumTrackTintColor="grey"
          thumbTintColor="red"
        />
      </View>
    </View>
  );
};

export default MediaPanel;
