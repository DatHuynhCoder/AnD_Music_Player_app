import { Text, View, Alert } from 'react-native'
import React, { Component, createContext } from 'react'
import * as MediaLibrary from 'expo-media-library'

export const AudioContext = createContext()
export class AudioProvider extends Component {
  
  constructor(props) {
    super(props)
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
    const media = await MediaLibrary.getAssetsAsync({
      mediaType: 'audio'
    })
    console.log(media);
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
      this.getAudioFiles
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
        
      }
    }
  }

  componentDidMount() {
    this.getPermission()
  }
  render() {
    return <AudioContext.Provider value={{}}>
      {this.props.children}
    </AudioContext.Provider>
  }
}