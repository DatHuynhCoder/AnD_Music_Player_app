//This is used in Homepage.jsx
import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import { colors } from '../constants/color'
import { textSizes } from '../constants/demensions'
import { ipAddress } from '../constants/ipAddress'
import {Defaultimg} from '../../assets/img/AnD_logo.png'

const GenreCard = ({ genreName, genreUrl }) => {
  return (
    <View style={styles.container}>
      <Image
        source={{uri: 'http://' + ipAddress+ ':3177' + genreUrl}}
        style={styles.genreImg}
      />
      <Text
        numberOfLines={1}
        ellipsizeMode='tail'
        style={styles.genreTxt}
      >{genreName}</Text>
    </View>
  )
}

styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
  },
  genreImg: {
    height: 55,
    width: 55,
    borderRadius: 10
  },
  genreTxt: {
    fontSize: textSizes.xm,
    color: colors.textPrimary,
    alignSelf: 'center',
    fontWeight: '600',
    paddingLeft: 10
  }
})

export default GenreCard