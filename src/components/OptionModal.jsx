import { View, Text,Modal,StyleSheet, TouchableWithoutFeedback } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { misc_colors } from '../constants/color'

const OptionModal = ({currentItem, visible, onClose, onPlayPress,onPlayListPress}) => {
  const {filename} = currentItem
  return (
    <>
      {/* <StatusBar hidden/> */}
      <Modal transparent visible={visible} animationType='slide'>
        <View style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          left: 0,
          backgroundColor: "#fff",
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
          zIndex: 1000
        }}>
          <Text style={{
            fontSize: 18,
            fontWeight: 'bold',
            padding: 20,
            paddingBottom: 0,
          }} numberOfLines={2}>{filename}</Text>
          <View style={{padding: 20}}>
            <TouchableWithoutFeedback onPress={() => onPlayPress()}>
              <Text style={{
                fontSize: 16,
                fontWeight: 'bold',
                paddingVertical: 10,
                letterSpacing: 1
              }}>Play</Text>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => onPlayListPress()}>
              <Text style={{
                fontSize: 16,
                fontWeight: 'bold',
                paddingVertical: 10,
                letterSpacing: 1
              }}>Add to Playlist</Text>
            </TouchableWithoutFeedback>
          </View>
        </View>
        <TouchableWithoutFeedback onPress={() => onClose()}>
          <View style={{
            position: 'absolute',
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.2)"
          }}></View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  )
}

export default OptionModal