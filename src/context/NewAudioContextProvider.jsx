import { View, Text } from 'react-native'
import { createContext, useState } from 'react'
import React from 'react'
import { Audio } from 'expo-av';

const AudioContext = createContext()

const NewAudioContextProvider = ({children}) => {
  const [deviceAudioFiles, setDeviceAudioFiles] = useState([])
  const [permissionError, setPermissionError] = useState(false)
  const [currentList, setCurrentList] = useState([{}, {}, {}])
  const [listLength, setListLength] = useState(0)
  const [currentSongid, setCurrentSongid] = useState(0)
  const [currentName, setCurrentName] = useState('')
  const [currentSinger, setCurrentSinger] = useState('')
  const [playback, setPlayback] = useState(new Audio.Sound())
  const [status, setStatus] = useState({isLoaded: false, isPlaying: false, positionMillis: 0, durationMillis: 0})
  const [sound, setSound] = useState()
  const [currentAudioId, setCurrentAudioId] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentAudioIndex, setCurrentAudioIndex] = useState(0)
  const [playbackPosition, setPlaybackPosition] = useState(null)
  const [playbackDuration, setPlaybackDuration] = useState(null)
  const [sliderPosition, setSliderPosition] = useState()
  const [intervalId, setIntervalId] = useState(0)

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

  async function loadSound(uri) {
    if(status.isLoaded === false) {
      try {
        // const playback = new Audio.Sound()
        // setPlayback(playback)
        // const status = await playback.loadAsync(uri)
        await playback.loadAsync(uri)
        const status = await playback.playAsync()
        setStatus(status)
        console.log('Audio loaded !!! with status: ', status)
        setPlaybackPosition(status.positionMillis)
        setPlaybackDuration(status.durationMillis)
        playback.setOnPlaybackStatusUpdate(_onPlaybackStatusUpdate);
      }
      catch (err) {
        console.log('error when trying to load an audio', err)
      }
    }
    else if(status.isLoaded === true && status.isPlaying === true) {
      console.log('click on an audio when other is playing')
      await playback.stopAsync()
      await playback.unloadAsync()
      await playback.loadAsync(uri)
      const status = await playback.playAsync()
      setStatus(status)
      console.log('Status after load a new audio: ', status)
      setPlaybackPosition(status.positionMillis)
      setPlaybackDuration(status.durationMillis)
      playback.setOnPlaybackStatusUpdate(_onPlaybackStatusUpdate);
    }
    else if(status.isLoaded === true && status.isPlaying === false) {
      console.log('click on an audio while pause other audio')
      await playback.stopAsync()
      await playback.unloadAsync()
      await playback.loadAsync(uri)
      const status = await playback.playAsync()
      setStatus(status)
      console.log('Status after load a new audio: ', status)
      setPlaybackPosition(status.positionMillis)
      setPlaybackDuration(status.durationMillis)
      playback.setOnPlaybackStatusUpdate(_onPlaybackStatusUpdate);
    }
  }
  
  async function playSound() {
    if(isLoaded === true && isPlaying === false) // no audio playing now
      try {
        console.log('play function goes now !!!!')
        // const status = await playback.loadAsync(require('../../assets/ThuyenQuyen.mp3'))
        // const status = await playback.loadAsync({uri: currentList[0].uri}) with currentList[0].uri = 'https://example.com/ThuyenQuyen.mp3'
        // const status = await playback.loadAsync(currentList[0].uri)
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

  async function finish() {
    try {
      await playback.unloadAsync()
      setIsPlaying(false)
      setPlaybackPosition(0)
      setPlaybackDuration(0)
      console.log('Finished');
    }
    catch(err) {
      console.log('error when trying to unload audio: ', err);
    }
  }

  function handlePressOnIcon() {
    console.log('===>> check status after click on icon: ', status)
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
  async function handlePressPrevious() {
    if(currentAudioIndex > 0) {
      loadSound({uri: "http://" + ipAddress + ":3177" + currentList[currentAudioIndex - 1].songuri})
      setCurrentName(currentList[currentAudioIndex - 1].songname)
      setCurrentSinger(currentList[currentAudioIndex - 1].authorname)
      setCurrentAudioIndex(currentAudioIndex - 1)
    }
    else {
      alert('Bạn đang ở bài hát đầu tiên của danh sách hiện tại')
    }
  }
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
  async function handlePressNext() {
    if(currentAudioIndex < currentList.length - 1) {
      loadSound({uri: "http://" + ipAddress + ":3177" + currentList[currentAudioIndex + 1].songuri})
      setCurrentName(currentList[currentAudioIndex + 1].songname)
      setCurrentSinger(currentList[currentAudioIndex + 1].authorname)
      setCurrentAudioIndex(currentAudioIndex + 1)
    }
    else {
      alert('Bạn đang ở bài hát cuối cùng của danh sách hiện tại')
    }
  }
  async function handlePressReplay() {
    console.log('replay 10s')
    setPlaybackPosition(playbackPosition - 10000)
    await playback.setPositionAsync(playbackPosition - 10000)
  }
  async function handlePressForward() {
    console.log('forward 10s')
    setPlaybackPosition(playbackPosition + 10000)
    await playback.setPositionAsync(playbackPosition + 10000)
  }
  async function handlePressSlider() {
    console.log(sliderPosition)
    setPlaybackPosition(sliderPosition)
    await playback.setPositionAsync(playbackPosition)
  }
  
  return (
    <AudioContext.Provider
      value={{
        deviceAudioFiles, setDeviceAudioFiles,
        permissionError, setPermissionError,
        currentList, setCurrentList,
        listLength, setListLength,
        currentSongid, setCurrentSongid,
        currentName, setCurrentName,
        currentSinger, setCurrentSinger,
        playback, setPlayback,
        status, setStatus,
        sound, setSound,
        currentAudioId, setCurrentAudioId,
        isPlaying, setIsPlaying,
        currentAudioIndex, setCurrentAudioIndex,
        playbackPosition, setPlaybackPosition,
        playbackDuration, setPlaybackDuration,
        sliderPosition, setSliderPosition,
        intervalId, setIntervalId,
        handlePressOnIcon,
        handlePressPrevious,
        handlePressNext,
        handlePressReplay,
        handlePressForward,
        loadSound
      }}
    >
      {children}
    </AudioContext.Provider>
  )
}

export {AudioContext, NewAudioContextProvider}