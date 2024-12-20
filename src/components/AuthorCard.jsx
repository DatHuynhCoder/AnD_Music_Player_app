//This card is use in ExplorePage.jsx
import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
//constants
import { colors } from '../constants/color'
import { iconSizes, textSizes } from '../constants/demensions'
import SongCard2 from './SongCard2'
import { ipAddress } from '../constants/ipAddress'
import {DefaultAvatar} from '../../assets/img/temp_playlist_pic.jpg'


const AuthorCard = ({ authorName, authorURL, musicData }) => {

  const filteredSongOfAuthor = musicData.filter((item) => {
    return item.authorname === authorName;
  }) // Chứa những bài hát của 1 tác giả nào đấy

  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <View style={styles.authorContainer}>
          <Image
            source={{uri: 'http://' + ipAddress + ':3177' + authorURL}}
            style={styles.authorAvatar}
          />

          <View style={styles.authorSubContainer}>
            <Text style={styles.authorNameTxt}>{authorName}</Text>
            <Text style={styles.authortxt}>Somethinng about author</Text>
          </View>
        </View>
        <AntDesign
          name='right'
          color={colors.iconPrimary}
          size={iconSizes.md}
        />
      </View>
      <View style={styles.authorSongsContainer}>
        {filteredSongOfAuthor.map((item, index) => (
          <View style={styles.cardWrapper} key={item.id}>
            <SongCard2 musicName={item.songname} musicURL={item.songimg} musicAuthor={item.authorname}/>
          </View>
        ))}
      </View>
    </View>
  )
}

export default AuthorCard

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#1E1E1E',
    padding: 5,
    borderRadius: 15,
    flexDirection: 'column'
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
  },
  authorContainer: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center'
  },
  authorSubContainer: {
    flexDirection: 'column',
  },
  authorNameTxt: {
    color: colors.textPrimary,
    fontWeight: '600',
    fontSize: textSizes.sm
  },
  authortxt: {
    color: colors.textSecondary,
    fontSize: textSizes.xm
  },
  authorAvatar: {
    height: iconSizes.super,
    width: iconSizes.super,
    borderRadius: 40
  },
  authorSongsContainer: {
    backgroundColor: '#403e3e',
    borderRadius: 15
  },
  cardWrapper: {
    margin: 5
  }
})