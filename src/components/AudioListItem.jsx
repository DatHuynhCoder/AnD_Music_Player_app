import { View, Text, StyleSheet, Dimensions } from 'react-native'
import React from 'react'
import Entypo from '@expo/vector-icons/Entypo';
import { colors, misc_colors } from '../constants/color';

const AudioListItem = () => {
  return (
    <>
      <View style={styles.container}>
        <View style={styles.leftContainer}>
          <View style={styles.thumbnail}>
            <Text style={styles.thumbnailText}>A</Text>
          </View>
          <View style={styles.titleContainer}>
            <Text numberOfLines={1} style={styles.title}>This will be some long song title, some more text</Text>
            <Text style={styles.timeText}>
              03:59
            </Text>
          </View>
        </View>
        <View style={styles.rightContainer}>
          <Entypo name="dots-three-vertical" size={20} color={misc_colors.FONT_MEDIUM}/>
        </View>
      </View>
      <View style={styles.separator}></View>
    </>
  )
}
const {width} = Dimensions.get('window')
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignSelf: 'center',
    width: width - 80,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center', 
    width: 263,
    // flex: 1
  },
  rightContainer: {
    flexBasis: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },
  thumbnail: {
    height: 50,
    flexBasis: 50,
    backgroundColor: misc_colors.FONT_LIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
  },
  thumbnailText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: misc_colors.FONT
  },
  titleContainer: {
    width: width - 180,
    paddingLeft: 10,

  },
  title: {
    fontSize: 16,
    color: misc_colors.FONT
  },
  separator: {
    width: width - 80,
    backgroundColor: '#333',
    opacity: 0.3,
    height: 0.5,
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 10
  },
  timeText: {
    fontSize: 14,
    color: misc_colors.FONT_LIGHT
  }
})

export default AudioListItem