import { Text,View,StyleSheet,ScrollView, Dimensions, FlatList, Alert } from 'react-native'
import React, { Component, useCallback, useContext, useEffect, useState } from 'react'
import * as MediaLibrary from 'expo-media-library'
import { AudioContext } from '../context/AudioProvider'
import AudioListItem from '../components/AudioListItem'
import OptionModal from '../components/OptionModal'
import { Audio, Video } from 'expo-av';
import { play, pause, resume, playNext } from '../misc/AudioController'

const listAudios = [
  {
    "albumId": "540528482",
    "creationTime": 1705472188000,
    "duration": 36.885,
    "filename": "daubuoi.mp3",
    "height": 0,
    "id": "47987",
    "mediaType": "audio",
    "modificationTime": 1705472188000,
    "uri": "file:///storage/emulated/0/Download/daubuoi.mp3",
    "width": 0
  }
]



const DeviceAudios = () => {
  const {
    deviceAudioFiles, setDeviceAudioFiles,
    permissionError, setPermissionError,
    playbackObj, setPlaybackObj,
    soundObj, setSoundObj,
    currentAudioId, setCurrentAudioId,
    isPlaying, setIsPlaying,
    playbackPosition, setPlaybackPosition,
    playbackDuration, setPlaybackDuration,
    intervalId, setIntervalId
  } = useContext(AudioContext)
  const [optionModalVisible, setOptionModalVisible] = useState(false)
  const [totalAudioCount, setTotalAudioCount] = useState(0)
  let currentItem = {}
  let interval = null

  const permissionAlert = () => {
    Alert.alert('Permission required', 'This app need to read audio files!', [{
      text: 'I am ready',
      onPress: () => getPermission() // ask for permisson again
    }, {
      text: 'Cancle',
      onPress: () => permissionAlert()
    }])
  }

  const getAudioFiles = async () => {
    let media = await MediaLibrary.getAssetsAsync({
      mediaType: 'audio'
    })
    media = await MediaLibrary.getAssetsAsync({
      mediaType: 'audio',
      first: media.totalCount
    })
    setTotalAudioCount(media.totalCount)
    setDeviceAudioFiles([...deviceAudioFiles, ...media.assets])
  }
  
  const getPermission = async () => {
    const permission = await MediaLibrary.getPermissionsAsync()
    if(permission.granted) {
      // get all audio files on current device
      getAudioFiles()
    }
    if(!permission.canAskAgain && !permission.granted) {
      setPermissionError(true)
    }
    if(!permission.granted && permission.canAskAgain) {
      const {status, canAskAgain} = await MediaLibrary.requestPermissionsAsync()
      if(status === 'denied' && canAskAgain) {
        permissionAlert()
      }
      if(status === 'granted') {
        getAudioFiles()
      }
      if(status === 'denied' && !canAskAgain) {
        setPermissionError(true)
      }
    }
  }

  useEffect(() => {
    getPermission()
  }, [])

  const startInterval = (playbackObj) => {
    const interval = setInterval(async () => {
      const playbackStatus = await playbackObj.getStatusAsync();
      //  do your logic here with the status object
      if(playbackStatus.durationMillis - playbackStatus.positionMillis <= 1000) {
        console.log('stop now')
        clearInterval(interval)
      }
      if(playbackStatus.isLoaded && playbackStatus.isPlaying) {
        console.log(playbackStatus)
        setPlaybackPosition(playbackStatus.positionMillis)
        setPlaybackDuration(playbackStatus.durationMillis)
      }
      console.log("i'm running")
    }, 500);
  };

  const handleAudioPress = async (id, uri) => {
    if(soundObj === null) { // no audio is playing now
      if(interval) {
        clearInterval(interval)
        interval = null
      }
      const playbackObj = new Audio.Sound()
      const status = await play(playbackObj, uri)
      // const playbackObj = new Audio.Sound();
      // try {
      //   await playbackObj.loadAsync({ uri: 'http://192.168.137.1:3177/music/ThuyenQuyen.mp3' });
      //   await playbackObj.playAsync(); // Phát nhạc
      // } catch (error) {
      //   console.log(error);
      // }

      // const index = audioFiles.indexOf(audio)

      updateState(
        {
          audioFiles,
          playbackPosition,
          playbackDuration
        },
        {

          currentAudioId: id,
          playbackObj: playbackObj,
          soundObj: status,
          isPlaying: true,
          // currentAudioIndex: index
        }
      )
      // playbackObj.setOnPlaybackStatusUpdate(this._onPlaybackStatusUpdate);  
      startInterval(playbackObj)
      return
    }
    
    // pause audio
    if(soundObj.isLoaded && soundObj.isPlaying && currentAudioId === id) { 
      const status = await pause(playbackObj)
      updateState(
        {
          audioFiles,
          playbackObj,
          currentAudioId,          
          currentAudioIndex,
          playbackPosition,
          playbackDuration
        },
        {
          soundObj: status,  
          isPlaying: false
        }
      )
      if(interval) {
        clearInterval(interval)
        interval = null
      }
    }

    //resume audio
    if(soundObj.isLoaded && !soundObj.isPlaying && currentAudioId === id) {
      if(interval) {
        clearInterval(interval)
        interval = null
      }
      const status = await resume(playbackObj)
      updateState(
        {
          audioFiles,
          playbackObj,          
          currentAudioId,
          currentAudioIndex,
          playbackPosition,
          playbackDuration
        },
        {
          soundObj: status,
          isPlaying: true
        }
      )
      startInterval(playbackObj)
      return
    }
    // select another audio
    if(soundObj.isLoaded && currentAudioId !== id) {
      if(interval) {
        clearInterval(interval)
        interval = null
      }
      const status = await playNext(playbackObj, uri)
      // const index = audioFiles.indexOf(audio)
      updateState(
        {
          audioFiles,
          playbackObj,
          currentAudioIndex,
          playbackPosition,
          playbackDuration
        },
        {
          currentAudioId: id,
          soundObj: status,
          isPlaying: true,
          // currentAudioIndex: index
        }
      )
      startInterval(playbackObj)
      return
    }
  }

  const Item = ({id, title, duration, index, uri}) => (
    <AudioListItem 
      title={title}
      isPlaying={isPlaying}
      activeListItem={currentAudioIndex === index}
      duration={duration}
      onOptionPress={() => { // open modal (play, add to playlist ...)
        // currentItem = item
        setOptionModalVisible(true)
      }}
      onAudioPress={() => handleAudioPress(id, uri)}
    >
    </AudioListItem>
  );

  return (
    <View style={{flex: 1}}>
      <FlatList
        data={audioFiles}
        renderItem={({item, index}) => 
          (
            <Item 
              id={item.id}
              title={item.filename} 
              duration={item.duration} 
              index={index}
              uri={item.uri}
            />
          )
        }
        keyExtractor={item => item.id}
      />
      <OptionModal 
        currentItem={currentItem}
        visible={optionModalVisible}
        onClose={() => {
          setOptionModalVisible(false)
          // this.setState({...this.state, optionModalVisible: false})
        }}
        onPlayPress={() => console.log('Playing')}
        onPlayListPress={() => console.log('Playlist')}
      ></OptionModal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default DeviceAudios