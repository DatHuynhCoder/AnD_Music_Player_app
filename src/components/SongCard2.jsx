//This card is used in ExplorePage.jsx
import { 
  StyleSheet, 
  Text, 
  View,
  TouchableOpacity,
  Image
 } from 'react-native'
import React, {useContext} from 'react'
//constants
import { colors } from '../constants/color'
import { iconSizes, textSizes } from '../constants/demensions'
import { ipAddress } from '../constants/ipAddress'
//icons
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const SongCard2 = ({ musicName, musicURL, musicAuthor, onSongPressed }) => {
  
  return (
    <TouchableOpacity 
      style={styles.songContainer}
      onPress={() => onSongPressed()}
    >
      <View style={styles.extraContainer}>
        <Image source={{uri: 'http://'+ ipAddress + ':3177' + musicURL}} style={styles.songImg} />
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
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <MaterialCommunityIcons
          name='dots-vertical'
          size={iconSizes.lg}
          color={colors.iconPrimary}
          onPress={() => console.log('press on option')}
        />
      </View>
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
    flex: 4,
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

export default SongCard2