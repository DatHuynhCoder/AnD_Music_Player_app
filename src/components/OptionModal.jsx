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
        <View style={styles.modal}>
          <Text style={styles.title} numberOfLines={2}>{filename}</Text>
          <View style={styles.optionContainer}>
            <TouchableWithoutFeedback onPress={() => onPlayPress()}>
              <Text style={styles.option}>Play</Text>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => onPlayListPress()}>
              <Text style={styles.option}>Add to Playlist</Text>
            </TouchableWithoutFeedback>
          </View>
        </View>
        <TouchableWithoutFeedback onPress={() => onClose()}>
          <View style={styles.modalBg}></View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  )
}

const styles = StyleSheet.create({
  modal: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: misc_colors.APP_BG,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    zIndex: 1000
  },
  optionContainer: {
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: 20,
    paddingBottom: 0,
    color: misc_colors.FONT_MEDIUM
  },
  option: {
    fontSize: 16,
    fontWeight: 'bold',
    color: misc_colors.FONT,
    paddingVertical: 10,
    letterSpacing: 1
  },
  modalBg: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    backgroundColor: misc_colors.MODAL_BG
  }
})

export default OptionModal