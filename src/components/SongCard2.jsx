//This card is used in ExplorePage.jsx
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

const SongCard = ({ musicName, musicURL, musicAuthor }) => {
  return (
    <TouchableOpacity style={styles.songContainer}>
      <View style={styles.extraContainer}>
        <Image source={musicURL} style={styles.songImg} />
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


const styles = StyleSheet.create({
  songContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%'
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

export default SongCard