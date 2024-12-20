//This card is used in HomePage.jsx
import { 
  StyleSheet, 
  Text, 
  View,
  TouchableOpacity,
  Image
 } from 'react-native'
import React from 'react'
//constants
import { colors } from '../constants/color'
import { iconSizes, textSizes } from '../constants/demensions'
//icons
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { ipAddress } from '../constants/ipAddress'

const SongCard = ({ musicName, musicURL, musicAuthor, onSongPressed}) => {
  return (
    <TouchableOpacity 
    onPress={() => onSongPressed()}
    style={styles.songContainer}>
      <View style={styles.extraContainer}>
        <Image source={{uri: 'http://' + ipAddress + ':3177' + musicURL}} style={styles.songImg} />
        <View style={styles.songTxtContainer}>
          <Text
            numberOfLines={1}
            ellipsizeMode='tail'
            style={styles.songName}
          >{musicName}</Text>
          <Text
            numberOfLines={1}
            ellipsizeMode='tail'
            style={styles.songAuthor}>{musicAuthor}</Text>
        </View>
      </View>
      <MaterialCommunityIcons
        name='dots-vertical'
        size={iconSizes.md}
        color={colors.iconPrimary}
      />
    </TouchableOpacity>
  )
}

export default SongCard

const styles = StyleSheet.create({
  songContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
    marginRight: 15,
    borderRadius: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    width: 325
  },
  extraContainer: {
    flexDirection: 'row',
  },
  songImg: {
    height: 55,
    width: 55,
    borderRadius: 10
  },
  songTxtContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: 5,
    width: 240,
  },
  songName: {
    fontSize: textSizes.xm,
    color: colors.textPrimary
  },
  songAuthor: {
    fontSize: textSizes.xxm,
    color: colors.textSecondary
  }
})