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
  return (
    <AudioContext.Provider
      value={{
        deviceAudioFiles, setDeviceAudioFiles,
        permissionError, setPermissionError,
        currentList, setCurrentList,
        listLength, setListLength,
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
        intervalId, setIntervalId
      }}
    >
      {children}
    </AudioContext.Provider>
  )
}

export {AudioContext, NewAudioContextProvider}