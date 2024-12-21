import { useContext, useEffect, useState } from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity, Dimensions, TouchableWithoutFeedback, ScrollView,ImageBackground, Image } from 'react-native';
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

const {width} = Dimensions.get('window')

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

const SongItem = ({img = '../../assets/albumIMG.jpeg', title = '', isPlaying = false, duration = 0, onOptionPress, onSongPress, isActive = false}) => {
  return (
    <>
      <View style={{flexDirection: 'row',alignSelf: 'center',width: width - 80,}}>
        <TouchableWithoutFeedback onPress={() => onSongPress()}>
          <View style={{flexDirection: 'row',alignItems: 'center', width: 263,}}>
            <Image source={{uri: 'http://' + ipAddress + ':3177' + img}} style={{height: 50, width: 50, borderRadius: 25}}>

            </Image>
            {/* <View style={{height: 50,flexBasis: 50,backgroundColor: colors.emphasis,justifyContent: 'center',alignItems: 'center',borderRadius: 25,}}>
              <Text style={{fontSize: 22,fontWeight: 'bold',color: misc_colors.FONT}}>
                {title[0]}
              </Text>
            </View> */}
            <View style={{width: width - 180,paddingLeft: 10,}}>
              <Text numberOfLines={1} style={{fontSize: 16,color: colors.textPrimary}}>{title}</Text>
              <Text style={{fontSize: 14,color: misc_colors.FONT_LIGHT}}>
                {duration}
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
        <View style={{flexBasis: 50,height: 50,alignItems: 'center',justifyContent: 'center',}}>
          <Entypo 
            name="dots-three-vertical" 
            size={20} 
            color={misc_colors.FONT_MEDIUM}
            onPress={onOptionPress}
            style={{padding: 10}}
          />
        </View>
      </View>
      <View style={{width: width - 80,backgroundColor: '#333',opacity: 0.3,height: 0.5,alignSelf: 'center',marginTop: 10,marginBottom: 10}}></View>
    </>
  )
}

export default function NewAudioPlay({route}) {
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

  const songColectionURL = route?.params?.songColectionURL
  const songColectionName = route?.params?.songColectionName
  const convertTime = milis => {
    let second = milis % 60
    let minute = Math.floor(milis / 60)
    if(minute == 0) {
      if(second < 10) {
        return `00:0${second}`
      }
      else {
        return `00:${second}`
      }
    }
    else if(minute > 0 && minute < 10) {
      if(second < 10) {
        return `0${minute}:0${second}`
      }
      else {
        return `0${minute}:${second}`
      }
    }
    else {
      if(second < 10) {
        return `${minute}:0${second}`
      }
      else {
        return `${minute}:${second}`
      }
    }
  }

  // function _onPlaybackStatusUpdate(status) {
  //   if(status.didJustFinish === true) {
  //     finish()
  //     return
  //   }
  //   if(status.isLoaded === true && status.isPlaying === true) {
  //     setPlaybackPosition(status.positionMillis)
  //     setPlaybackDuration(status.durationMillis) 
  //   }
  // }

  // useEffect(() => {
  //   console.log("let's get all author")
  //   console.log("let's get all song")
  //   async function getAllSongs () {
  //     await axios.get("http://" + ipAddress + ":3177" + "/get-all-songs").then(res => { // đổi thành địa chỉ ip máy thay vì localhost
  //       setCurrentList(res.data)
  //       setListLength(res.data.length)
  //     }).catch(err => console.log(err))
  //   }    
  //   getAllSongs()
  // }, [])
  return (
    <View style={{backgroundColor: colors.background, flex: 1, paddingBottom: 130}}>
    <View style={{backgroundColor: colors.background, justifyContent: 'center', alignItems: 'center', paddingTop: 30}}>
      <View 
        style={{borderWidth: 1,
          borderColor: '#ccc',
          borderRadius: 100,
          overflow: 'hidden',
          height: 200,
          width: 200,
          margin: 20
        }}
      >
        <View style={{
          flex: 1,
          borderRadius: 15,
          overflow: 'hidden',
        }}>
          <ImageBackground
            // source={albumIMG}
            source={songColectionURL !== undefined ? {uri: songColectionURL} : albumIMG}
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          ></ImageBackground>
        </View>
      </View>
      <View style={{marginBottom: 30}}>
        <Text style={{color: colors.textPrimary, fontSize: textSizes.md, fontWeight: 'bold'}}>{songColectionName === undefined ? 'No album is loaded' : songColectionName}</Text>
      </View>
    </View>
    {/* <View style={{style: styles.container}}> */}
      <ScrollView style={styles.scroller}>
        {
          currentList.map((song, index) => {
            return <SongItem
              key={index}
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
                loadSound({uri: "http://" + ipAddress + ":3177" + song.songuri})
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
  }
});
