import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import colors from '../constants/color'
import textSizes from  '../constants/demensions'

const GenreCard = ({genreName,genreUrl}) => {
  return (
    <View style={styles.container}>
      <Image
        source={genreUrl}
        style={styles.genreImg}
      />
      <Text style={styles.genreTxt}>{genreName}</Text>
    </View>
  )
}

styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10
  },
  genreImg: {
    height: 40,
    width: 40,
    borderRadius: 10
  },
  genreName: {

  }
})

export default GenreCard