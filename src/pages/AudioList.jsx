import { Text,View,StyleSheet,ScrollView, Dimensions } from 'react-native'
import React, { Component } from 'react'

import { AudioContext } from '../context/AudioProvider'

import { RecyclerListView, LayoutProvider } from 'recyclerlistview'
import AudioListItem from '../components/AudioListItem'
import OptionModal from '../components/OptionModal'
import { Audio, Video } from 'expo-av';

export class AudioList extends Component {
  static contextType = AudioContext

  constructor(props) {
    super(props);
    this.state = {
      optionModalVisible: false,
      playbackObj: null,
      soundObj: null,
      currentAudio: {}
    }
    this.currentItem = {}
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

  handleAudioPress = async (audio) => {
    // console.log(audio)
    if(this.state.soundObj === null) { // no audio is playing now
      const playbackObj = new Audio.Sound()
      const status = await playbackObj.loadAsync(
        {uri: audio.uri}, 
        {shouldPlay: true}
      )
      // const soundObject = new Audio.Sound();
      // try {
      //   await soundObject.loadAsync({ uri: 'http://192.168.137.1:3177/music/ThuyenQuyen.mp3' });
      //   await soundObject.playAsync(); // Phát nhạc
      // } catch (error) {
      //   console.log(error);
      // }
      console.log(status)
      return this.setState({
        ...this.state,
        currentAudio: audio,
        playbackObj: playbackObj,
        soundObj: status,
      })
    }
    // pause
    if(this.state.soundObj.isLoaded && this.state.soundObj.isPlaying) { 
      const status = await this.state.playbackObj.setStatusAsync({shouldPlay: false})
      console.log(status)
      return this.setState({
        ...this.state,
        soundObj: status
      })
    }

    //resume audio
    if(this.state.soundObj.isLoaded && !this.state.soundObj.isPlaying && this.state.currentAudio.id === audio.id) {
      const status = await this.state.playbackObj.playAsync()
      return this.setState({
        ...this.state,
        soundObj: status
      })
    }
  }

  rowRenderer = (type, item) => {
    return (
      <AudioListItem 
        title={item.filename} 
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
        {({dataProvider}) => {
          return <View style={{flex: 1}}>
            <RecyclerListView 
              dataProvider={dataProvider} 
              layoutProvider={this.layoutProvider} 
              rowRenderer={this.rowRenderer}
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