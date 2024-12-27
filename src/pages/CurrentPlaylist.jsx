import { use, useContext, useEffect, useState } from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity, Dimensions, TouchableWithoutFeedback, ScrollView, ImageBackground, Image } from 'react-native';
import { Audio } from 'expo-av';
import Slider from '@react-native-community/slider';
import { colors, misc_colors } from '../constants/color';
import { ipAddress } from '../constants/ipAddress';

import Entypo from '@expo/vector-icons/Entypo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import AntDesign from '@expo/vector-icons/AntDesign';
import axios from 'axios';

import { AudioContext } from '../context/NewAudioContextProvider';
import PlayerButton from '../components/PlayerButton';
import albumIMG from '../../assets/albumIMG.jpeg'
import { textSizes } from '../constants/demensions';
import { UserContext } from '../context/UserContext';
import Toast from 'react-native-toast-message';

const { width } = Dimensions.get('window')

const map = new Map()
map['ThuyenQuyen'] = '../../assets/ThuyenQuyen.mp3'

const songs = [
  {
    author: 'Diệu Kiên',
    genre: '',
    name: 'Thuyền Quyên remix',
    uri: require('../../assets/ThuyenQuyen.mp3'),
    duration: 252, //second
  },
  {
    author: 'Châu Khải Phong',
    genre: '',
    name: 'Nụ cười không vui remix',
    uri: require('../../assets/NuCuoiKhongVui-ChauKhaiPhong.mp3'),
    duration: 227,//second
  }
]

const SongItem = ({ id, img = '../../assets/albumIMG.jpeg', title = '', isPlaying = false, duration = 0, onOptionPress, onSongPress, isActive = false }) => {
  const { currentSongid } = useContext(AudioContext)
  return (
    <>
      <View style={id === currentSongid ? { flexDirection: 'row', alignSelf: 'center', width: width - 80, borderRadius: 25, backgroundColor: 'rgba(92, 145, 151, 0.27)' } : { flexDirection: 'row', alignSelf: 'center', width: width - 80, borderRadius: 25 }}>
        <TouchableWithoutFeedback onPress={() => onSongPress()}>
          <View style={{ flexDirection: 'row', alignItems: 'center', width: 263, }}>
            <Image source={{ uri: 'http://' + ipAddress + ':3177' + img }} style={{ height: 50, width: 50, borderRadius: 25 }}></Image>
            <View style={{ width: width - 180, paddingLeft: 10, }}>
              <Text numberOfLines={1} style={{ fontSize: 16, color: colors.textPrimary }}>{title}</Text>
              <Text style={{ fontSize: 14, color: misc_colors.FONT_LIGHT }}>
                {duration}
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
        <View style={{ flexBasis: 50, height: 50, alignItems: 'center', justifyContent: 'center', }}>
          <Entypo
            name="dots-three-vertical"
            size={20}
            color={misc_colors.FONT_MEDIUM}
            onPress={onOptionPress}
            style={{ padding: 10 }}
          />
        </View>
      </View>
      <View style={{ width: width - 80, backgroundColor: '#333', opacity: 0.3, height: 0.5, alignSelf: 'center', marginTop: 10, marginBottom: 10 }}></View>
    </>
  )
}

export default function CurrentPlaylist({ route }) {
  const {
    currentList, setCurrentList,
    listLength, setListLength,
    currentSongid, setCurrentSongid,
    currentSongimg, setCurrentSongimg,
    currentName, setCurrentName,
    currentSinger, setCurrentSinger,
    playback, setPlayback,
    status, setStatus,
    sound, setSound,
    currentAudioIndex, setCurrentAudioIndex,
    isPlaying, setIsPlaying,
    playbackPosition, setPlaybackPosition,
    playbackDuration, setPlaybackDuration,
    sliderPosition, setSliderPosition,
    intervalId, setIntervalId,
    handlePressOnIcon,
    handlePressPrevious,
    handlePressNext,
    handlePressReplay,
    handlePressForward,
    loadSound
  } = useContext(AudioContext)
  const { userid, rerenderCxt } = useContext(UserContext)
  const [isFollowed, setIsFollowed] = useState(false) // for author list song
  const [songinfo, setSonginfo] = useState({})
  const [favouriteNum, setFavouriteNum] = useState(0)
  const convertTime = milis => {
    let second = milis % 60
    let minute = Math.floor(milis / 60)
    if (minute == 0) {
      if (second < 10) {
        return `00:0${second}`
      }
      else {
        return `00:${second}`
      }
    }
    else if (minute > 0 && minute < 10) {
      if (second < 10) {
        return `0${minute}:0${second}`
      }
      else {
        return `0${minute}:${second}`
      }
    }
    else {
      if (second < 10) {
        return `${minute}:0${second}`
      }
      else {
        return `${minute}:${second}`
      }
    }
  }
  const handle_Follow_UnFolllow = () => {
    if (isFollowed === false) {
      axios.post('http://' + ipAddress + ':3177/follow-author', {
        authorid: authorId,
        userid: userid
      }).then(res => {
        if (res.data.Status === 'Existed') {
          Toast.show({
            type: 'info',
            text1: 'You have followed this author'
          })
          setIsFollowed(true)
        }
        else if (res.data.Status === 'Success') {
          Toast.show({
            type: 'success',
            text1: 'Followed'
          })
          setIsFollowed(true)
        }
        else {
          Toast.show({
            type: 'error',
            text1: 'Error'
          })
        }
      })
    }
    else if (isFollowed === true) {
      axios.post('http://' + ipAddress + ':3177/unfollow-author', {
        authorid: authorId,
        userid: userid
      }).then(res => {
        if (res.data.Status === 'NotExisted') {
          Toast.show({
            type: 'info',
            text1: 'You have unfollowed this author'
          })
          setIsFollowed(false)
        }
        else if (res.data.Status === 'Success') {
          Toast.show({
            type: 'success',
            text1: 'Unfollowed'
          })
          setIsFollowed(false)
        }
        else {
          Toast.show({
            type: 'error',
            text1: 'Error'
          })
        }
      })
    }
  }
  useEffect(() => {
    async function getSongInfo() {
      await axios.get('http://' + ipAddress + ':3177/get-detail-song-info?songid=' + currentSongid).then(res => {
        if (res.data.Status === 'Success') {
          console.log('check song info: ', res.data.Result[0])
          setSonginfo(res.data.Result[0])
        }
        else {
          Toast.show({
            type: 'error',
            text1: 'Error'
          })
        }
      })
    }
    async function getFavouriteNum() {
      await axios.get('http://' + ipAddress + ':3177/count-favourite-by-songid?songid=' + currentSongid).then(res => {
        if (res.data.Status === 'Success') {
          console.log('check favourite info: ', res.data.Result)
          setFavouriteNum(res.data.Result[0].soluotthich)
        }
        else {
          Toast.show({
            type: 'error',
            text1: 'Error'
          })
        }
      })
    }
    getSongInfo()
    getFavouriteNum()
  }, [currentSongid, rerenderCxt])
  return (
    <View style={{ backgroundColor: colors.background, flex: 1, paddingBottom: 130 }}>
      <View style={{ backgroundColor: colors.background, justifyContent: 'center', alignItems: 'center' }}>
        <View
          style={{
            borderWidth: 1,
            borderRadius: 20,
            // overflow: 'hidden',
            height: 150,
            width: 330,
            marginTop: 20,
            marginBottom: 20,
            padding: 10,
            backgroundColor: 'rgba(1,1,1,0.5)'
          }}
        >
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <Image source={{ uri: 'http://' + ipAddress + ':3177' + currentSongimg }} style={{ width: 60, height: 60, borderRadius: 5 }}></Image>
            <View style={{ flex: 1, marginLeft: 10, flexDirection: 'column' }}>
              <Text style={{ color: colors.textPrimary }}>{currentName}</Text>
              <Text style={{ color: colors.textPrimary, opacity: 0.5 }}>{currentSinger}</Text>
              <Text>
                <AntDesign name="hearto" size={20} color='red' style={{ marginRight: 10 }} />
                <Text style={{ color: colors.textPrimary, fontSize: 16 }}> {favouriteNum}</Text>
              </Text>
            </View>
          </View>
          <View style={{ backgroundColor: 'white', height: 1, opacity: 0.3 }}>

          </View>
          <View style={{ display: 'flex', flexDirection: 'row' }}>
            <View style={{ flex: 2 }}>
              <Text style={{ color: colors.textPrimary, opacity: 0.5 }}>Album</Text>
              <Text style={{ color: colors.textPrimary, opacity: 0.5 }}>Author</Text>
              <Text style={{ color: colors.textPrimary, opacity: 0.5 }}>Genre</Text>
            </View>
            <View style={{ flex: 5 }}>
              <Text style={{ color: colors.textPrimary }}>{songinfo?.albumname}</Text>
              <Text style={{ color: colors.textPrimary }}>{currentSinger}</Text>
              <Text style={{ color: colors.textPrimary }}>{songinfo?.genrename}</Text>
            </View>
          </View>
        </View>
      </View>
      <ScrollView style={styles.scroller}>
        {
          currentList.map((song, index) => {
            return <SongItem
              key={index}
              id={song.songid}
              img={song.songimg}
              title={song.songname}
              isPlaying={false}
              duration={convertTime(song.songduration)}
              onOptionPress={() => console.log('option pressed')}
              onSongPress={() => {
                console.log('hello')
                setCurrentSongid(song.songid)
                setCurrentSongimg(song.songimg)
                setCurrentName(song.songname)
                setCurrentSinger(song.authorname)
                console.log('current index: ', currentAudioIndex)
                setCurrentAudioIndex(index)
                loadSound({ uri: "http://" + ipAddress + ":3177" + song.songuri })

              }}>

            </SongItem>
          })
        }
      </ScrollView>
      {/* </View> */}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    backgroundColor: colors.background,
    margin: 10
  },
  scroller: {
    backgroundColor: colors.background,
    // paddingBottom: 130,
  },

  // followbutton: (isFollowed) => ({
  //   backgroundColor: isFollowed === false ? colors.emphasis : 'rgba(1,1,1,1)',
  //   width: 120,
  //   height: 43,
  //   borderWidth: 1,
  //   borderColor: isFollowed === false ? colors.background : 'white',
  //   borderRadius: 25,
  //   padding: 10
  // })
});
