import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, {useContext} from 'react'
import PlayerButton from './PlayerButton'
import { iconSizes } from '../constants/demensions'
import UserAvatar from '../../assets/img/user_avatar.png'
import { AudioContext } from '../context/NewAudioContextProvider'
import { Audio } from 'expo-av';

const context = {
  "isLoad": false,
}

const FloatingPlayer = () => {
  const {
    playback, setPlayback,
    status, setStatus,
    currentName, setCurrentName,
    isPlaying, setIsPlaying,
  } = useContext(AudioContext)
  function _onPlaybackStatusUpdate(status) {
    if(status.didJustFinish === true) {
      finish()
      return
    }
    if(status.isLoaded === true && status.isPlaying === true) {
      setPlaybackPosition(status.positionMillis)
      setPlaybackDuration(status.durationMillis) 
    }
  } 
  async function playSound() {
    if(isLoaded === true && isPlaying === false) // no audio playing now
      try {
        console.log('play function goes now !!!!')
        // const status = await playback.loadAsync(require('../../assets/ThuyenQuyen.mp3'))
        // const status = await playback.loadAsync({uri: songs[0].uri}) with songs[0].uri = 'https://example.com/ThuyenQuyen.mp3'
        // const status = await playback.loadAsync(songs[0].uri)
        const status = await playback.playAsync()
        console.log('status after play: ', status)
        setStatus(status)
        setIsPlaying(true)
        playback.setOnPlaybackStatusUpdate(_onPlaybackStatusUpdate);
      }
      catch(err) {
        console.log('error when trying to play an audio: ', err);
      }
  }

  async function pauseSound() {
    try {
      const status = await playback.pauseAsync()
      console.log('status after pause: ', status)
      setPlayback(playback)
      setStatus(status)
      setIsPlaying(false)
    }
    catch(err) {
      console.log('error when trying to pause audio: ', err); 
    }
  }
  
  async function resumeSound() {
    try {
      const status = await playback.playAsync()
      console.log('status after resume: ', status)
      setPlayback(playback)
      setStatus(status)
      setIsPlaying(true)
    } catch(err) {
      console.log("error when trying to resume audio: ", err)
    }
  }
  function handlePressOnIcon() {
    console.log(status)
    if(status === null && playback === null) {
    // if(status.isLoaded === true && isPlaying === false && status.didJustFinish === false && status.positionMillis === 0) {
      playSound()
    }
    else if(status.isLoaded === true && status.isPlaying === true && status.didJustFinish === false) {
      pauseSound()
    }
    else if(status.isLoaded === true && status.isPlaying === false && status.didJustFinish === false) {
      resumeSound() 
    }
  }
  return (
    <TouchableOpacity style={{borderRadius: 20, position: 'absolute', left: 30, right: 30, bottom: 90, flexDirection: 'row', backgroundColor: 'rgba(0,0,0,0.8)'}}>
      <>
        <Image
          source={UserAvatar}
          style={{borderWidth: 1, height: 48, width: 48,borderRadius: 24, justifyContent: 'center', alignItems: 'center'}}
        />
        <View style={{flex: 1, overflow: 'hidden', marginLeft: 10, justifyContent: 'center'}}>
          <Text numberOfLines={1} style={{fontSize: 13, fontWeight: '600', paddingLeft: 5, color: 'white'}}>
            {currentName === '' ? 'Không có dữ liệu' : currentName}
          </Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center', columnGap: 20, marginRight: 16, paddingLeft: 16, paddingVertical: 5}}>
          <PlayerButton iconType='PREVIOUS' size={25} color={'white'}/>
          
          <PlayerButton 
            onPress={() => handlePressOnIcon()}
            style={{marginLeft: 5, marginRight: 5}} 
            iconType={status.isPlaying ? 'PLAY' : 'PAUSE'}
            size={40}
            color={'white'}
          />
          <PlayerButton iconType='NEXT' size={25} color={'white'}/>
        </View>
      </>
    </TouchableOpacity>
  )
}

const style = StyleSheet.create({

})

export default FloatingPlayer