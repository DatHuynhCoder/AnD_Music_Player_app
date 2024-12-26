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
import Default_Avatar from '../../assets/img/UserAvatarDefault.png'
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
    console.log('userid:' + userid);
    console.log('username:' + username);
    console.log('useravatar:' + useravatar);
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
              source={useravatar !== '' ? { uri: 'http://' + ipAddress + ':3177' + useravatar } : Default_Avatar}
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
                onPress={() => navigation.navigate('ExplorePage', { genrename: item.genrename })}
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