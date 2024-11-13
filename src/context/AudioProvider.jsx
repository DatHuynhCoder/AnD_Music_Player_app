import { Text, View, Alert } from 'react-native'
import React, { Component, createContext } from 'react'
import * as MediaLibrary from 'expo-media-library'
import { DataProvider } from 'recyclerlistview'

export const AudioContext = createContext()

export class AudioProvider extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      audioFiles: [],
      permissionError: false,
      dataProvider: new DataProvider((r1, r2) => r1 !== r2),
      playbackObj: null,
      soundObj: null,
      currentAudio: {},
      isPlaying: false,
      currentAudioIndex: null,
      playbackPosition: null,
      playbackDuration: null
    }
    this.totalAudioCount = 0
  }
 
  permissionAlert = () => {
    Alert.alert('Permission required', 'This app need to read audio files!', [{
      text: 'I am ready',
      onPress: () => this.getPermission() // ask for permisson again
    }, {
      text: 'Cancle',
      onPress: () => this.permissionAlert()
    }])
  }

  getAudioFiles = async () => {
    const {audioFiles, dataProvider} = this.state
    let media = await MediaLibrary.getAssetsAsync({
      mediaType: 'audio'
    })
    media = await MediaLibrary.getAssetsAsync({
      mediaType: 'audio',
      first: media.totalCount,
    })
    this.totalAudioCount = media.totalCount

    this.setState({
      ...this.state,
      dataProvider: dataProvider.cloneWithRows([...audioFiles, ...media.assets]),
      audioFiles: [...audioFiles, ...media.assets]
    })
  }

  getPermission = async () => { 
    // {
    //   "accessPrivileges": "none", 
    //   "canAskAgain": true, 
    //   "expires": "never", 
    //   "granted": false, 
    //   "status": "undetermined"
    // }
    const permission = await MediaLibrary.getPermissionsAsync()
    if(permission.granted) {
      // we want to get all the audio files
      this.getAudioFiles()
    }
    if(!permission.canAskAgain && !permission.granted) {
      this.setState({
        ...this.state,
        permissionError: true
      })
    }
    if(!permission.granted && permission.canAskAgain) {
      const {status, canAskAgain} = await MediaLibrary.requestPermissionsAsync()
      if(status === 'denied' && canAskAgain) {
        // we are going to display alert that user must allow this permission to work this app
        this.permissionAlert()
      }

      if(status === 'granted') {
        // we want to get all the audio files
        this.getAudioFiles()
      }

      if(status === 'denied' && !canAskAgain) {
        // we want to display some error to user
        this.setState({
          ...this.state,
          permissionError: true
        })
      }
    }
  }

  componentDidMount() {
    this.getPermission()
  }

  updateState = (prevState, newState = {}) => {
    this.setState({...prevState, ...newState})
  }

  render() {
    const {
      audioFiles, 
      dataProvider, 
      permissionError,
      playbackObj,
      soundObj,
      currentAudio, 
      isPlaying, 
      currentAudioIndex,
      playbackPosition,
      playbackDuration
    } = this.state
    if(permissionError) return <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{fontSize: 25, textAlign: 'center', color: 'red'}}>
        It looks like you haven't accept the permission.
      </Text>
    </View>
    return(
      <AudioContext.Provider 
        value={{
          audioFiles, 
          dataProvider, 
          playbackObj,
          soundObj,
          currentAudio, 
          isPlaying, 
          currentAudioIndex,
          playbackPosition,
          playbackDuration,
          updateState: this.updateState, 
          totalAudioCount: this.totalAudioCount
        }}
      >
        {this.props.children}
      </AudioContext.Provider>
    ) 
  }
}