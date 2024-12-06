import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground
} from 'react-native'
import React from 'react'
//constants
import { colors } from '../constants/color'
import { textSizes } from '../constants/demensions';

const AlbumCard = ({ albumName, albumURL, albumAuthor }) => {
  return (
    <TouchableOpacity style={styles.container}>
      <ImageBackground
        source={albumURL}
        style={styles.ImgBackground}
      >
        <View style={styles.discHole} />
      </ImageBackground>
      <Text style={styles.albumNameTxt}>{albumName}</Text>
      <Text style={styles.albumAuthorTxt}>{albumAuthor}</Text>
    </TouchableOpacity>
  )
}

export default AlbumCard

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  ImgBackground: {
    height: 150,
    width: 150,
    justifyContent:'center',
    alignItems: 'center',
    borderRadius: 75,
    overflow: 'hidden', 
  },
  discHole: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.background,
  },
  albumNameTxt:{
    fontSize: textSizes.xm,
    color: colors.textPrimary
  },
  albumAuthorTxt:{
    fontSize: textSizes.xxm,
    color: colors.textSecondary
  }
})