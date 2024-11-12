import { Text,View,StyleSheet,ScrollView, Dimensions } from 'react-native'
import React, { Component } from 'react'

import { AudioContext } from '../context/AudioProvider'

import { RecyclerListView, LayoutProvider } from 'recyclerlistview'
import AudioListItem from '../components/AudioListItem'

export class AudioList extends Component {
  static contextType = AudioContext

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

  rowRenderer = (type, item) => {
    return <Text>
      {item.filename}
    </Text>
  }

  render() {
    return (
      // <AudioContext.Consumer>
      //   {({dataProvider}) => {
      //     return <View style={{flex: 1}}>
      //       <RecyclerListView dataProvider={dataProvider} layoutProvider={this.layoutProvider} rowRenderer={this.rowRenderer}></RecyclerListView>
      //     </View>
      //   }}
      // </AudioContext.Consumer>
      // <ScrollView>
      //   {
      //     this.context.audioFiles.map(item => (
      //       <Text style={{padding: 10, borderBottomColor: "black", borderBottomWidth: 1}} key={item.id}>{item.filename}</Text>    
      //     ))
      //   }
      // </ScrollView>
      <View style={{marginTop: 50}}>
        <AudioListItem/>
      </View>
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