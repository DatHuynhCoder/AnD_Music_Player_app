import { View, Text, StyleSheet, Dimensions,TouchableWithoutFeedback } from 'react-native'
import React from 'react'
import Entypo from '@expo/vector-icons/Entypo';
import { colors, misc_colors } from '../constants/color';

const getThumbnailText = (filename) => {
  return filename[0]
}

const convertTime = minutes => {
  if(minutes) {
    const hrs = minutes / 60
    const minute = hrs.toString().split('.')[0]
    const percent = parseInt(hrs.toString().split('.')[1].slice(0, 2))
    const sec = Math.ceil((60 * percent) / 100)

    if(parseInt(minute) < 10 && sec < 10) {
      return `0${minute}:0${sec}`
    }
    if(parseInt(minute) < 10) {
      return `0${minute}:${sec}`
    }

    if(sec < 10) {
      return `${minute}:0${sec}`
    }
    return `${minute}:${sec}`
  }
}

const renderPlayPauseIcon = (isPlaying) => {
  if(isPlaying) {
    return <Entypo name="controller-paus" size={24} color={misc_colors.ACTIVE_FONT} />
  }
  else {
    return <Entypo name="controller-play" size={24} color={misc_colors.ACTIVE_FONT} />
  }
}

const AudioListItem = ({
  title, 
  isPlaying,
  duration, 
  onOptionPress, 
  onAudioPress,
  activeListItem
}) => {
  return (
    <>
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={() => onAudioPress()}>
          <View style={styles.leftContainer}>
            <View style={styles.thumbnail}>
              <Text style={styles.thumbnailText}>
                {activeListItem ? renderPlayPauseIcon(isPlaying) : getThumbnailText(title)}
              </Text>
            </View>
            <View style={styles.titleContainer}>
              <Text numberOfLines={1} style={styles.title}>{title}</Text>
              <Text style={styles.timeText}>
                {convertTime(duration)}
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
        <View style={styles.rightContainer}>
          <Entypo 
            name="dots-three-vertical" 
            size={20} 
            color={misc_colors.FONT_MEDIUM}
            onPress={() => onOptionPress()}
            style={{padding: 10}}
          />
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
    justifyContent: 'center',
  },
  thumbnail: {
    height: 50,
    flexBasis: 50,
    backgroundColor: colors.emphasis,
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