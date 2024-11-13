import { View, Text, StyleSheet, StatusBar, Dimensions } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { misc_colors } from '../constants/color'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import Slider from '@react-native-community/slider';
import PlayerButton from '../components/PlayerButton';

import { AudioContext } from '../context/AudioProvider';

const {width} = Dimensions.get('window')

const Player = () => {
  const context = useContext(AudioContext)

  const {playbackPosition, playbackDuration} = context

  let calculateSeekbar = () => {
    if(playbackPosition !== null && playbackDuration !== null) {
      return playbackPosition / playbackDuration
    }
    return 0
  }

  return (
    <View style={styles.container}>
      <View style={styles.smallContainer}>
        <Text style={styles.audioCount}>
          {`${context.currentAudioIndex + 1} / ${context.totalAudioCount}`}
        </Text>
        <View style={styles.midBannerContainer}>
          <MaterialCommunityIcons 
            name="music-circle" 
            size={300} 
            color={context.isPlaying ? misc_colors.ACTIVE_BG: misc_colors.FONT_MEDIUM}
          />
        </View>
        <View style={styles.audioPlayerContainer}>
          <Text numberOfLines={1} style={styles.audioTitle}>
            {context.currentAudio.filename} - {playbackDuration} - {playbackPosition}
          </Text>
          <Slider
            style={{width: width, height: 40}}
            minimumValue={0}
            maximumValue={1}
            value={calculateSeekbar()}
            minimumTrackTintColor={misc_colors.FONT_MEDIUM}
            maximumTrackTintColor={misc_colors.ACTIVE_BG}
          >
          </Slider>
          <View style={styles.audioControllers}>
            <PlayerButton iconType='PREVIOUS'/>
            <PlayerButton 
              onPress={() => console.log('Play')}
              style={{marginLeft: 15, marginRight: 15}} 
              iconType={context.isPlaying ? 'PLAY' : 'PAUSE'}
              size={60}
            />
            <PlayerButton iconType='NEXT'/>
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: misc_colors.APP_BG,
    paddingTop: StatusBar.currentHeight
  },
  smallContainer: {
    // flex: 1,

  },
  audioCount: {
    textAlign: 'right',
    padding: 15,
    color: misc_colors.FONT_LIGHT,
    fontSize: 14
  },
  midBannerContainer: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  audioTitle: {
    fontSize: 16,
    color: misc_colors.FONT,
    padding: 15
  },
  audioControllers: {
    width: width,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10
  }
})

export default Player