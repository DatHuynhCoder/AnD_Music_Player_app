import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView
} from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
//constants
import { colors } from '../constants/color'
import { iconSizes, textSizes } from '../constants/demensions'
//icons
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import UserAvatar from '../../assets/img/user_avatar.png'
import GenreCard from '../components/GenreCard'
import SongCard from '../components/SongCard'
import axios from 'axios'
import { ipAddress } from '../constants/ipAddress';
import { AudioContext } from '../context/NewAudioContextProvider'
import { UserContext } from '../context/UserContext'
import {
  useNavigation
} from '@react-navigation/native';

const HomePage = () => {
  const navigation = useNavigation();
  const [musicData, setMusicData] = useState([])
  const [genreList, setGenreList] = useState([]);
  const [listPlaylist, setListPlaylist] = useState([]);

  const {
    currentList,
    setCurrentList,
    setCurrentSongid,
    setCurrentSongimg,
    setCurrentName,
    setCurrentSinger,
    currentAudioIndex,
    setCurrentAudioIndex,
    loadSound
  } = useContext(AudioContext)

  const { userid, username, useravatar } = useContext(UserContext)

  useEffect(() => {
    console.log("let's get all songs");
    console.log('userid:'+ userid);
    console.log('username:'+ username);
    console.log('useravatar:'+ useravatar);
    async function getAllSongs() {
      await axios.get("http://" + ipAddress + ":3177" + "/get-songs-for-quickpick").then(res => {
        setMusicData(res.data)
      })
    }

    const getPlaylist = async () => {
      console.log(userid);
      try {
        const response = await axios.get("http://" + ipAddress + ":3177" + "/get-playlist-by-userid?userid=" + userid)
        if (response.data.Status === 'Success') {
          console.log('Lay playlist thanh cong!');
          setListPlaylist(response.data.Result);
        }
        else {
          console.log('Lay playlist that bai')
        }
      } catch (error) {
        console.log('Khong the lay playlist ' + error)
      }
    }

    const getAllGenre = async () => {
      try {
        const response = await axios.get('http://' + ipAddress + ':3177' + "/get-all-genres");
        if (response.data) {
          console.log('Lay genre thang cong');
          setGenreList(response.data);
        }
      } catch (error) {
        console.log('Error when get genre: ' + error)
      }
    }

    getPlaylist();
    getAllSongs();
    getAllGenre();
  }, [])
  // const musicData = [
  //   {
  //     id: 1,
  //     musicName: 'Let Love Win',
  //     musicAuthor: 'TheFatRat',
  //     musicURL: require('../../assets/img/temp_playlist_pic.jpg')
  //   },
  //   {
  //     id: 2,
  //     musicName: 'Blood, Sweet & Tear',
  //     musicAuthor: 'Riot games',
  //     musicURL: require('../../assets/img/temp_playlist_pic.jpg')
  //   },
  //   {
  //     id: 3,
  //     musicName: 'The Legend',
  //     musicAuthor: 'TobyFox',
  //     musicURL: require('../../assets/img/temp_playlist_pic.jpg')
  //   },
  //   {
  //     id: 4,
  //     musicName: 'Mang tiền về cho mẹ',
  //     musicAuthor: 'Đen Vâu',
  //     musicURL: require('../../assets/img/temp_playlist_pic.jpg')
  //   },
  //   {
  //     id: 5,
  //     musicName: 'Superheroes',
  //     musicAuthor: 'TheScripts',
  //     musicURL: require('../../assets/img/temp_playlist_pic.jpg')
  //   },
  //   {
  //     id: 6,
  //     musicName: 'Memory reboot',
  //     musicAuthor: 'Narvent',
  //     musicURL: require('../../assets/img/temp_playlist_pic.jpg')
  //   },
  //   {
  //     id: 7,
  //     musicName: '7 Years',
  //     musicAuthor: 'Lukas graham',
  //     musicURL: require('../../assets/img/temp_playlist_pic.jpg')
  //   },
  //   {
  //     id: 8,
  //     musicName: 'Beautiful now',
  //     musicAuthor: 'Zedd',
  //     musicURL: require('../../assets/img/temp_playlist_pic.jpg')
  //   },
  //   {
  //     id: 9,
  //     musicName: 'ĐAM MÊ | Double2T x Cao Thanh Thảo My ft Thảo Đan (Prod. HảiMa) - Official Music Video',
  //     musicAuthor: 'Gia đình lớn',
  //     musicURL: require('../../assets/img/temp_playlist_pic.jpg')
  //   },
  //   {
  //     id: 10,
  //     musicName: 'Dandadan openning',
  //     musicAuthor: 'The Creepy nuts',
  //     musicURL: require('../../assets/img/temp_playlist_pic.jpg')
  //   },
  //   {
  //     id: 11,
  //     musicName: 'Waiting for love',
  //     musicAuthor: 'Acvicii',
  //     musicURL: require('../../assets/img/temp_playlist_pic.jpg')
  //   },
  //   {
  //     id: 12,
  //     musicName: 'Rises',
  //     musicAuthor: 'League of Legends',
  //     musicURL: require('../../assets/img/temp_playlist_pic.jpg')
  //   },
  // ];
  const tempUserData = {
    userName: 'hi'
  }


  const renderPlayListItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => {
        axios.get('http://' + ipAddress + ':3177/get-listsongs-by-playlistid?playlistid=' + item.playlistid).then(res => {
          setCurrentList(res.data)
          navigation.navigate('NewAudioPlay', { songColectionURL: 'http://' + ipAddress + ':3177' + item.playlistimg, songColectionName: item.playlistname })
        })
      }}
    >
      <Image
        source={item.playlistimg !== '' ? { uri: 'http://' + ipAddress + ':3177' + item.playlistimg } : { uri: 'http://' + ipAddress + ':3177/image/album/defaultplaylist.png' }}
        style={styles.playlistImg}
      />
      <Text
        numberOfLines={1}
        ellipsizeMode='tail'
        style={styles.playlistName}
      >{item.playlistname}</Text>
      <Text style={styles.playlist_subinfo}>Number of songs: {item.numsongs}</Text>

    </TouchableOpacity>
  )

  // Function to group music data into pack of 4
  const packData = (data, packSize) => {
    const result = [];
    for (let i = 0; i < data.length; i += packSize) {
      result.push(data.slice(i, i + packSize));
    }
    return result;
  };
  const packMusic = packData(musicData, 4);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.headerContainer}>
          <View style={styles.welcomeUserContainer}>
            <Image
              source={UserAvatar}
              style={styles.userAvatar}
            />

            <View style={styles.userContainer}>
              <Text style={styles.welcometxt}>Welcome Back !</Text>
              <Text style={styles.usertxt}>{username}</Text>
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

        {/* Choose your playlist */}
        <View style={styles.playListContainer}>
          <Text style={styles.playListTxt}>From your Library</Text>
          <FlatList
            data={listPlaylist}
            renderItem={renderPlayListItem}
            keyExtractor={item => item.playlistid}
            horizontal={true}
            ItemSeparatorComponent={
              <View style={{ marginHorizontal: 10 }} />
            }
          />
        </View>

        {/* Choose your genre */}
        <View>
          <Text style={styles.genreTxt}>Genres you may love</Text>
          <View style={styles.genreCardContainer}>
            {genreList.map((item, index) => (
              <TouchableOpacity
                style={styles.cardWrapper}
                key={item.genreid}
                onPress={() => navigation.navigate('ExplorePage',{genrename: item.genrename})}
              >
                <GenreCard genreName={item.genrename} genreUrl={item.genreimg} />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Quick picks  */}
        <View>
          <Text style={styles.quickpickTxt}>Quick picks</Text>
          <FlatList
            data={packMusic}
            keyExtractor={(item, index) => index.toString()}
            horizontal={true}
            renderItem={({ item }) => (
              <View style={styles.rowSong}>
                {item.map((song, index) => (
                  <SongCard
                    key={song.songid}
                    musicName={song.songname}
                    musicURL={song.songimg}
                    musicAuthor={song.authorname}
                    onSongPressed={() => {
                      setCurrentList([song]);
                      setCurrentSongid(song.songid);
                      setCurrentSongimg(song.songimg)
                      setCurrentName(song.songname);
                      setCurrentSinger(song.authorname);
                      setCurrentAudioIndex(0);
                      loadSound({ uri: "http://" + ipAddress + ":3177" + song.songuri })
                    }}
                  />
                ))}
              </View>
            )}
          />
        </View>
        <View style={{ height: 100, }}></View>
      </ScrollView>
    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
    paddingHorizontal: 10,
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
  playlist_subinfo: {
    fontSize: textSizes.xxm,
    color: colors.textSecondary
  },

  //Choose your genre
  genreTxt: {
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
  },
  quickpickTxt: {
    fontSize: textSizes.sm,
    color: colors.textPrimary,
    fontWeight: '600',
    marginBottom: 15
  },
})

export default HomePage