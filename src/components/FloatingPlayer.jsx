import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, {useContext} from 'react'
import PlayerButton from './PlayerButton'
import { iconSizes } from '../constants/demensions'
import UserAvatar from '../../assets/img/user_avatar.png'
import { AudioContext } from '../context/NewAudioContextProvider'
import { Audio } from 'expo-av';
import { useNavigation } from '@react-navigation/native';
import { ipAddress } from '../constants/ipAddress';

const context = {
  "isLoad": false,
}

const FloatingPlayer = () => {
  const {
    currentList, setCurrentList,
    listLength, setListLength,
    currentSongid, setCurrentSongid,
    currentName, setCurrentName,
    currentSinger, setCurrentSinger,
    playback, setPlayback,
    status, setStatus,
    sound, setSound,
    currentAudioIndex, setCurrentAudioIndex,
    isPlaying, setIsPlaying,
    playbackPosition, setPlaybackPosition,
    playbackDuration, setPlaybackDuration,
    sliderPosition, setSliderPosition,
    intervalId, setIntervalId,
    handlePressOnIcon,
    handlePressPrevious,
    handlePressNext,
    loadSound
  } = useContext(AudioContext)
  const navigation = useNavigation();

  // function _onPlaybackStatusUpdate(status) {
  //   if(status.didJustFinish === true) {
  //     finish()
  //     return
  //   }
  //   if(status.isLoaded === true && status.isPlaying === true) {
  //     setPlaybackPosition(status.positionMillis)
  //     setPlaybackDuration(status.durationMillis) 
  //   }
  // } 
  // async function loadSound(uri) {
  //   if(status.isLoaded === false) {
  //     try {
  //       // const playback = new Audio.Sound()
  //       // setPlayback(playback)
  //       // const status = await playback.loadAsync(uri)
  //       await playback.loadAsync(uri)
  //       const status = await playback.playAsync()
  //       setStatus(status)
  //       console.log('Audio loaded !!! with status: ', status)
  //       setPlaybackPosition(status.positionMillis)
  //       setPlaybackDuration(status.durationMillis)
  //       playback.setOnPlaybackStatusUpdate(_onPlaybackStatusUpdate);
  //     }
  //     catch (err) {
  //       console.log('error when trying to load an audio', err)
  //     }
  //   }
  //   else if(status.isLoaded === true && status.isPlaying === true) {
  //     console.log('click on an audio when other is playing')
  //     await playback.stopAsync()
  //     await playback.unloadAsync()
  //     await playback.loadAsync(uri)
  //     const status = await playback.playAsync()
  //     setStatus(status)
  //     console.log('Status after load a new audio: ', status)
  //     setPlaybackPosition(status.positionMillis)
  //     setPlaybackDuration(status.durationMillis)
  //     playback.setOnPlaybackStatusUpdate(_onPlaybackStatusUpdate);
  //   }
  //   else if(status.isLoaded === true && status.isPlaying === false) {
  //     console.log('click on an audio while pause other audio')
  //     await playback.stopAsync()
  //     await playback.unloadAsync()
  //     await playback.loadAsync(uri)
  //     const status = await playback.playAsync()
  //     setStatus(status)
  //     console.log('Status after load a new audio: ', status)
  //     setPlaybackPosition(status.positionMillis)
  //     setPlaybackDuration(status.durationMillis)
  //     playback.setOnPlaybackStatusUpdate(_onPlaybackStatusUpdate);
  //   }
  // }
  // async function playSound() {
  //   if(isLoaded === true && isPlaying === false) // no audio playing now
  //     try {
  //       console.log('play function goes now !!!!')
  //       // const status = await playback.loadAsync(require('../../assets/ThuyenQuyen.mp3'))
  //       // const status = await playback.loadAsync({uri: songs[0].uri}) with songs[0].uri = 'https://example.com/ThuyenQuyen.mp3'
  //       // const status = await playback.loadAsync(songs[0].uri)
  //       const status = await playback.playAsync()
  //       console.log('status after play: ', status)
  //       setStatus(status)
  //       setIsPlaying(true)
  //       playback.setOnPlaybackStatusUpdate(_onPlaybackStatusUpdate);
  //     }
  //     catch(err) {
  //       console.log('error when trying to play an audio: ', err);
  //     }
  // }
  // async function pauseSound() {
  //   try {
  //     const status = await playback.pauseAsync()
  //     console.log('status after pause: ', status)
  //     setPlayback(playback)
  //     setStatus(status)
  //     setIsPlaying(false)
  //   }
  //   catch(err) {
  //     console.log('error when trying to pause audio: ', err); 
  //   }
  // } 
  // async function resumeSound() {
  //   try {
  //     const status = await playback.playAsync()
  //     console.log('status after resume: ', status)
  //     setPlayback(playback)
  //     setStatus(status)
  //     setIsPlaying(true)
  //   } catch(err) {
  //     console.log("error when trying to resume audio: ", err)
  //   }
  // }
  // function handlePressOnIcon() {
  //   console.log(status)
  //   if(status === null && playback === null) {
  //   // if(status.isLoaded === true && isPlaying === false && status.didJustFinish === false && status.positionMillis === 0) {
  //     playSound()
  //   }
  //   else if(status.isLoaded === true && status.isPlaying === true && status.didJustFinish === false) {
  //     pauseSound()
  //   }
  //   else if(status.isLoaded === true && status.isPlaying === false && status.didJustFinish === false) {
  //     resumeSound() 
  //   }
  // }
  // async function handlePressPrevious() {
  //   console.log('you press on previous')
  //   if(currentAudioIndex !== 0) {
  //     console.log('click on an previous when other is playing')
  //     await playback.stopAsync()
  //     await playback.unloadAsync()
  //     // await playback.loadAsync(currentList[currentAudioIndex - 1].uri)
  //     await playback.loadAsync({uri: "http://" + ipAddress + ":3177" + currentList[currentAudioIndex - 1].songuri})
  //     const status = await playback.playAsync()
  //     setStatus(status)
  //     console.log('Status after load a new audio: ', status)
  //     setPlaybackPosition(status.positionMillis)
  //     setPlaybackDuration(status.durationMillis)
  //     setCurrentName(currentList[currentAudioIndex - 1].songname)
  //     setCurrentAudioIndex(currentAudioIndex - 1)
  //     playback.setOnPlaybackStatusUpdate(_onPlaybackStatusUpdate);
  //   }
  //   else {
  //     console.log('there are no previous song')
  //   }
  // }
  // async function handlePressNext() {
  //   console.log('you press on next with currentAudioIndex: ', currentAudioIndex)
  //   if(currentAudioIndex === listLength - 1) {
  //     console.log('you are in the last audio in current list')
  //   }
  //   else {
  //     console.log('click on next when other is playing')
  //     await playback.stopAsync()
  //     await playback.unloadAsync()
  //     // await playback.loadAsync(currentList[currentAudioIndex + 1].uri)
  //     await playback.loadAsync({uri: "http://" + ipAddress + ":3177" + currentList[currentAudioIndex + 1].songuri})
  //     const status = await playback.playAsync()
  //     setStatus(status)
  //     console.log('Status after load a new audio: ', status)
  //     setPlaybackPosition(status.positionMillis)
  //     setPlaybackDuration(status.durationMillis)
  //     setCurrentName(currentList[currentAudioIndex + 1].songname)
  //     setCurrentAudioIndex(currentAudioIndex + 1)
  //     playback.setOnPlaybackStatusUpdate(_onPlaybackStatusUpdate);
  //   }
  // }
  return (
    <TouchableOpacity style={{
      borderRadius: 20, left: 30, right: 30, 
      bottom: 90,
      flexDirection: 'row', 
      backgroundColor: 'rgba(0,0,0,0.8)', 
      position: 'absolute'
    }}
      onPress={() => navigation.navigate('PlayerPage')}
    >
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
          <PlayerButton iconType='PREVIOUS' size={25} color={'white'} onPress={()=> {
            handlePressPrevious()
            // if(currentAudioIndex > 0) {
            //   loadSound({uri: "http://" + ipAddress + ":3177" + currentList[currentAudioIndex - 1].songuri})
            //   setCurrentName(currentList[currentAudioIndex - 1].songname)
            //   setCurrentSinger(currentList[currentAudioIndex - 1].authorname)
            //   setCurrentSongid(currentList[currentAudioIndex - 1].songid)
            //   setCurrentAudioIndex(currentAudioIndex - 1)
            // }
            // else {
            //   alert('Bạn đang ở bài hát đầu tiên của danh sách hiện tại')
            // }
          }}/>
          
          <PlayerButton 
            onPress={() => handlePressOnIcon()}
            style={{marginLeft: 5, marginRight: 5}} 
            iconType={status.isPlaying ? 'PLAY' : 'PAUSE'}
            size={40}
            color={'white'}
          />
          <PlayerButton iconType='NEXT' size={25} color={'white'} onPress={() => {
            handlePressNext()
            // if(currentAudioIndex < currentList.length - 1) {
            //   loadSound({uri: "http://" + ipAddress + ":3177" + currentList[currentAudioIndex + 1].songuri})
            //   setCurrentName(currentList[currentAudioIndex + 1].songname)
            //   setCurrentSinger(currentList[currentAudioIndex + 1].authorname)
            //   setCurrentSongid(currentList[currentAudioIndex + 1].songid)
            //   setCurrentAudioIndex(currentAudioIndex + 1)
            // }
            // else {
            //   alert('Bạn đang ở bài hát cuối cùng của danh sách hiện tại')
            // }
          }}/>
        </View>
      </>
    </TouchableOpacity>
  )
}

const style = StyleSheet.create({

})

export default FloatingPlayer