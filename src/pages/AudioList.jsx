import { Text,View,StyleSheet,ScrollView, Dimensions } from 'react-native'
import React, { Component } from 'react'

import { AudioContext } from '../context/AudioProvider'

import { RecyclerListView, LayoutProvider } from 'recyclerlistview'
import AudioListItem from '../components/AudioListItem'
import OptionModal from '../components/OptionModal'
import { Audio, Video } from 'expo-av';
import { play, pause, resume, playNext } from '../misc/AudioController'

export class AudioList extends Component {
  static contextType = AudioContext

  constructor(props) {
    super(props);
    this.state = {
      optionModalVisible: false,
    }
    this.currentItem = {}
    this.interval = null
  }

  layoutProvider = new LayoutProvider((i) => 'audio', (type, dim) => {
    switch(type) {
      case 'audio':
        dim.width = Dimensions.get('window').width
        dim.height = 70
        break
      default:
        dim.width = 0
        dim.height = 0
    }
  })

  _onPlaybackStatusUpdate = (playbackStatus) => {
    // console.log(playbackStatus)
    /*
    {
      "androidImplementation": "SimpleExoPlayer", 
      "audioPan": 0, 
      "didJustFinish": false, 
      "durationMillis": 252839, 
      "isBuffering": false, 
      "isLoaded": true, 
      "isLooping": false, 
      "isMuted": false, 
      "isPlaying": false, 
      "playableDurationMillis": 64783, 
      "positionMillis": 4834, 
      "progressUpdateIntervalMillis": 500, 
      "rate": 1, 
      "shouldCorrectPitch": false, 
      "shouldPlay": true, 
      "uri": "/storage/emulated/0/Download/Zalo/ThuyenQuyen.mp3", 
      "volume": 1
    }
      */
    if(playbackStatus.isLoaded && playbackStatus.isPlaying) {
      this.context.updateState(
        this.context, 
        {
          playbackPosition: playbackStatus.positionMillis,
          playbackDuration: playbackStatus.durationMillis
        }
      )
    }
  }

  handleAudioPress = async (audio) => {
    const {audioFiles, soundObj, playbackObj, currentAudio, updateState, currentAudioIndex} = this.context
    console.log('audio filename: ', audio.filename)
    if(soundObj === null) { // no audio is playing now
      const playbackObj = new Audio.Sound()
      const status = await play(playbackObj, audio.uri)
      // const playbackObj = new Audio.Sound();
      // try {
      //   await playbackObj.loadAsync({ uri: 'http://192.168.137.1:3177/music/ThuyenQuyen.mp3' });
      //   await playbackObj.playAsync(); // Phát nhạc
      // } catch (error) {
      //   console.log(error);
      // }
      const index = audioFiles.indexOf(audio)
      console.log("check status:", status)
      console.log('check audio name: ', audio.filename)
      updateState(
        this.context,
        {
          currentAudio: audio,
          playbackObj: playbackObj,
          soundObj: status,
          isPlaying: true,
          currentAudioIndex: index
        }
      )
      return playbackObj.setOnPlaybackStatusUpdate(this._onPlaybackStatusUpdate);
    }
    
    // pause audio
    if(soundObj.isLoaded && soundObj.isPlaying && currentAudio.id === audio.id) { 
      const status = await pause(playbackObj)
      // console.log(status)
      return updateState(
        this.context,
        {
          soundObj: status,
          isPlaying: false
        }
      )
    }

    //resume audio
    if(soundObj.isLoaded && !soundObj.isPlaying && currentAudio.id === audio.id) {
      const status = await resume(playbackObj)
      // console.log(status)
      return updateState(
        this.context,
        {
          soundObj: status,
          isPlaying: true
        }
      )
    }
    // select another audio
    if(soundObj.isLoaded && currentAudio.id !== audio.id) {
      const status = await playNext(playbackObj, audio.uri)
      const index = audioFiles.indexOf(audio)
      return updateState(
        this.context,
        {
          currentAudio: audio,
          soundObj: status,
          isPlaying: true,
          currentAudioIndex: index
        }
      )
    }
  }

  rowRenderer = (type, item, index, extendedState) => {
    return (
      <AudioListItem 
        title={item.filename}
        isPlaying={extendedState.isPlaying}
        activeListItem={this.context.currentAudioIndex === index}
        duration={item.duration}
        onOptionPress={() => {
          this.currentItem = item
          this.setState({...this.state, optionModalVisible: true})
        }}
        onAudioPress={() => this.handleAudioPress(item)}
      >
      </AudioListItem>
    )
  }

  render() {
    return (
      <AudioContext.Consumer>
        {({dataProvider, isPlaying}) => {
          return <View style={{flex: 1}}>
            <RecyclerListView 
              dataProvider={dataProvider}
              layoutProvider={this.layoutProvider}
              rowRenderer={this.rowRenderer}
              extendedState={{isPlaying}}
            >
            </RecyclerListView>
            <OptionModal 
              currentItem={this.currentItem}
              visible={this.state.optionModalVisible}
              onClose={() => {
                this.setState({...this.state, optionModalVisible: false})
              }}
              onPlayPress={() => console.log('Playing')}
              onPlayListPress={() => console.log('Playlist')}
            ></OptionModal>
          </View>
        }}
      </AudioContext.Consumer>
      // <ScrollView>
      //   {
      //     this.context.audioFiles.map(item => (
      //       <Text style={{padding: 10, borderBottomColor: "black", borderBottomWidth: 1}} key={item.id}>{item.filename}</Text>    
      //     ))
      //   }
      // </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default AudioList