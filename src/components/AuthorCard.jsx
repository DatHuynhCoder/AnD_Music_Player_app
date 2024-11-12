//This card is use in ExplorePage.jsx
import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
//constants
import { colors } from '../constants/color'
import { iconSizes, textSizes } from '../constants/demensions'
import SongCard2 from './SongCard2'

const AuthorCard = ({ authorName, authorURL }) => {
  const musicData = [
    {
      id: 1,
      musicName: 'Let Love Win',
      musicAuthor: 'TheFatRat',
      musicURL: require('../../assets/img/temp_playlist_pic.jpg')
    },
    {
      id: 2,
      musicName: 'Blood, Sweet & Tear',
      musicAuthor: 'Riot games',
      musicURL: require('../../assets/img/temp_playlist_pic.jpg')
    },
    {
      id: 3,
      musicName: 'The Legend',
      musicAuthor: 'TobyFox',
      musicURL: require('../../assets/img/temp_playlist_pic.jpg')
    },
    {
      id: 4,
      musicName: 'Mang tiền về cho mẹ',
      musicAuthor: 'Đen Vâu',
      musicURL: require('../../assets/img/temp_playlist_pic.jpg')
    },
    {
      id: 5,
      musicName: 'Superheroes',
      musicAuthor: 'The Scripts',
      musicURL: require('../../assets/img/temp_playlist_pic.jpg')
    },
    {
      id: 6,
      musicName: 'Memory reboot',
      musicAuthor: 'Narvent',
      musicURL: require('../../assets/img/temp_playlist_pic.jpg')
    },
    {
      id: 7,
      musicName: '7 Years',
      musicAuthor: 'Lukas graham',
      musicURL: require('../../assets/img/temp_playlist_pic.jpg')
    },
    {
      id: 8,
      musicName: 'Beautiful now',
      musicAuthor: 'Zedd',
      musicURL: require('../../assets/img/temp_playlist_pic.jpg')
    },
    {
      id: 9,
      musicName: 'ĐAM MÊ | Double2T x Cao Thanh Thảo My ft Thảo Đan (Prod. HảiMa) - Official Music Video',
      musicAuthor: 'Gia đình lớn',
      musicURL: require('../../assets/img/temp_playlist_pic.jpg')
    },
    {
      id: 10,
      musicName: 'Dandadan openning',
      musicAuthor: 'The Creepy nuts',
      musicURL: require('../../assets/img/temp_playlist_pic.jpg')
    },
    {
      id: 11,
      musicName: 'Waiting for love',
      musicAuthor: 'Acvicii',
      musicURL: require('../../assets/img/temp_playlist_pic.jpg')
    },
    {
      id: 12,
      musicName: 'Rises',
      musicAuthor: 'Riot games',
      musicURL: require('../../assets/img/temp_playlist_pic.jpg')
    },
  ];

  const filteredSongOfAuthor = musicData.filter((item) => {
    return item.musicAuthor === authorName;
  }) // Chứa những bài hát của 1 tác giả nào đấy

  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <View style={styles.authorContainer}>
          <Image
            source={authorURL}
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
            <SongCard2 musicName={item.musicName} musicURL={item.musicURL} musicAuthor={item.musicAuthor}/>
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