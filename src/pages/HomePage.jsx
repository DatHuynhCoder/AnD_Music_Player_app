import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList
} from 'react-native'
import React from 'react'
//constants
import { colors } from '../constants/color'
import { iconSizes, textSizes } from '../constants/demensions'
//icons
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import UserAvatar from '../../assets/img/user_avatar.png'
import GenreCard from '../components/GenreCard'

const HomePage = () => {
  const tempUserData = {
    userName: 'Coichung2hondaicuamay'
  }

  const playListData = [
    {
      id: 1,
      playlistUrl: require('../../assets/img/temp_playlist_pic.jpg'),
      playlistName: 'Strong Music'
    },
    {
      id: 2,
      playlistUrl: require('../../assets/img/temp_playlist_pic.jpg'),
      playlistName: 'EDM Music'
    },
    {
      id: 3,
      playlistUrl: require('../../assets/img/temp_playlist_pic.jpg'),
      playlistName: 'listen while working'
    },
    {
      id: 4,
      playlistUrl: require('../../assets/img/temp_playlist_pic.jpg'),
      playlistName: 'sad music'
    },
    {
      id: 5,
      playlistUrl: require('../../assets/img/temp_playlist_pic.jpg'),
      playlistName: 'best of the bestttttttttttttttttttttttttttttttttttttttt'
    }
  ]

  const genreData = [
    {
      id: 1,
      genreName: 'EDM',
      genreUrl: require('../../assets/img/temp_playlist_pic.jpg')
    },
    {
      id: 2,
      genreName: 'Anime OSTs',
      genreUrl: require('../../assets/img/temp_playlist_pic.jpg')
    },
    {
      id: 3,
      genreName: 'Morning',
      genreUrl: require('../../assets/img/temp_playlist_pic.jpg')
    },
    {
      id: 4,
      genreName: 'Courage',
      genreUrl: require('../../assets/img/temp_playlist_pic.jpg')
    },
    {
      id: 5,
      genreName: 'Lofi beats',
      genreUrl: require('../../assets/img/temp_playlist_pic.jpg')
    },
    {
      id: 6,
      genreName: 'Classical',
      genreUrl: require('../../assets/img/temp_playlist_pic.jpg')
    },
  ]
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.itemContainer}>
      <Image
        source={item.playlistUrl}
        style={styles.playlistImg}
      />
      <Text style={styles.playlistName}>{item.playlistName}</Text>
    </TouchableOpacity>
  )

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.welcomeUserContainer}>
          <Image
            source={UserAvatar}
            style={styles.userAvatar}
          />

          <View style={styles.userContainer}>
            <Text style={styles.welcometxt}>Welcome Back !</Text>
            <Text style={styles.usertxt}>{tempUserData.userName}</Text>
          </View>
        </View>
        <View style={styles.userOptionsContainer}>
          <Ionicons
            name='stats-chart'
            color={colors.iconPrimary}
            size={iconSizes.md}
          />

          <MaterialCommunityIcons
            name='bell'
            color={colors.iconPrimary}
            size={iconSizes.md}
          />

          <Ionicons
            name='settings'
            color={colors.iconPrimary}
            size={iconSizes.md}
          />

        </View>
      </View>

      <View style={styles.playListContainer}>
        <Text style={styles.playListTxt}>From your Library</Text>
        <FlatList
          data={playListData}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          horizontal={true}
          ItemSeparatorComponent={
            <View style={{ marginHorizontal: 10 }} />
          }
        />
      </View>

      <View>
        <Text style={styles.genreTxt}>Genres you may love</Text>
        <View style={styles.genreCardContainer}>
          {genreData.map((item, index) => (
            <View style={styles.cardWrapper} key={item.id}>
              <GenreCard genreName={item.genreName} genreUrl={item.genreUrl} />
            </View>
          ))}
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
    paddingHorizontal: 10
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5
  },
  welcomeUserContainer: {
    flexDirection: 'row',
    gap: 10
  },
  userContainer: {
    flexDirection: 'column',
  },
  welcometxt: {
    color: colors.textPrimary,
    fontWeight: '600',
    fontSize: textSizes.xm
  },
  usertxt: {
    color: colors.textSecondary,
    fontSize: textSizes.xxm
  },
  userAvatar: {
    height: iconSizes.xl,
    width: iconSizes.xl,
    borderRadius: 24
  },
  userOptionsContainer: {
    flexDirection: 'row',
    gap: 10
  },
  playListContainer: {
    // paddingHorizontal: 10
  },
  playListTxt: {
    fontSize: textSizes.sm,
    color: colors.textPrimary,
    fontWeight: '600',
    marginVertical: 15
  },
  //Item style
  itemContainer: {

  },
  playlistImg: {
    height: 150,
    width: 150,
    borderRadius: 10
  },
  playlistName: {
    width: 150,
    color: colors.textPrimary
  },
  //end PlaylistItem
  genreTxt:{
    fontSize: textSizes.sm,
    color: colors.textPrimary,
    fontWeight: '600',
  },
  genreCardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 10,
  },
  cardWrapper: {
    width: '48%',
    marginBottom: 10
  }
})

export default HomePage