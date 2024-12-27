import { use, useContext, useEffect, useState } from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity, Dimensions, TouchableWithoutFeedback, ScrollView,ImageBackground, Image } from 'react-native';
import { Audio } from 'expo-av';
import Slider from '@react-native-community/slider';
import { colors, misc_colors } from '../constants/color';
import { ipAddress } from '../constants/ipAddress';

import Entypo from '@expo/vector-icons/Entypo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';

import axios from 'axios';

import { AudioContext } from '../context/NewAudioContextProvider';
import PlayerButton from '../components/PlayerButton';
import albumIMG from '../../assets/albumIMG.jpeg'
import { textSizes } from '../constants/demensions';
import { UserContext } from '../context/UserContext';

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

const SongItem = ({id, img = '../../assets/albumIMG.jpeg', title = '', isPlaying = false, duration = 0, onOptionPress, onSongPress, isActive = false}) => {
  const {currentSongid} = useContext(AudioContext)
  return (
    <>
      <View style={id === currentSongid ? {flexDirection: 'row',alignSelf: 'center',width: width - 80,borderRadius: 25, backgroundColor: 'rgba(92, 145, 151, 0.27)'} : {flexDirection: 'row',alignSelf: 'center',width: width - 80,borderRadius: 25}}>
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

export default function NewAudioPlay({navigation, route}) {
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
  const {userid} = useContext(UserContext)
  const [isFollowed, setIsFollowed] = useState(false) // for author list song
  const authorId = route?.params?.authorId // for author list song
  const songColectionURL = route?.params?.songColectionURL // http://ip:port/image/album/... or http://ip:port/image/author/...
  const type = songColectionURL !== undefined ? songColectionURL.split('/')[4] : 'Unknown'
  //check link with album:  ["http:", "", "192.168.137.1:3177", "image", "album", "thongdongmahat.jpg"]
  //check link with author:  ["http:", "", "192.168.137.1:3177", "image", "author", "sontungmtp.png"]
  const songColectionName = route?.params?.songColectionName
  const authorDescription = route?.params?.authorDescription
  
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
  const handle_Follow_UnFolllow = () => {
    if(isFollowed === false) {
      axios.post('http://' + ipAddress + ':3177/follow-author', {
        authorid: authorId,
        userid: userid
      }).then(res => {
        if(res.data.Status === 'Existed') {
          alert('You have followed this author')
          setIsFollowed(true)
        }
        else if(res.data.Status === 'Success') {
          alert('Followed')
          setIsFollowed(true)
        }
        else {
          alert('Error')
        }
      })
    }
    else if(isFollowed === true) {
      axios.post('http://' + ipAddress + ':3177/unfollow-author', {
        authorid: authorId,
        userid: userid
      }).then(res => {
        if(res.data.Status === 'NotExisted') {
          alert('You have unfollowed this author')
          setIsFollowed(false)
        }
        else if(res.data.Status === 'Success') {
          alert('Unfollowed')
          setIsFollowed(false)
        }
        else {
          alert('Error')
        }
      })
    }
  }
  useEffect(() => {
    if(type === 'author') {
      console.log('its author')
      axios.get("http://" + ipAddress + ":3177" + "/check-is-followed?authorid=" + authorId + "&userid=" + userid).then(res => {
        if(res.data.Status === 'Existed') {
          setIsFollowed(true)
        }
        else if(res.data.Status === 'NotExisted') {
          setIsFollowed(false)
        }
        else {
          alert('Error while check followed')
        }
      })
    }
  }, [currentList])
  return (
    <View style={{backgroundColor: colors.background, flex: 1, paddingBottom: 130}}>
      <TouchableOpacity style={{padding: 10}}>
        <Ionicons name="caret-back" size={40} color={colors.iconPrimary} onPress={() => {
          navigation.goBack()
        }}/>
      </TouchableOpacity>
      <View style={{backgroundColor: colors.background, justifyContent: 'center', alignItems: 'center', paddingTop: 30}}>
        <View 
          style={{borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 20,
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
        <View style={{display: 'flex', marginBottom: 30, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{color: colors.textPrimary, fontSize: textSizes.md, fontWeight: 'bold'}}>{songColectionName === undefined ? 'No album is loaded' : songColectionName}</Text>
          {
            type === 'author' 
          ? 
            <TouchableOpacity style={styles.followbutton(isFollowed)} onPress={() => {
              handle_Follow_UnFolllow()
            }}>
              <Text style={{textAlign: 'center', color: 'white', textTransform: 'uppercase', fontWeight: 'bold'}}>{isFollowed === false ? 'Follow' : 'Followed'}</Text>
            </TouchableOpacity>
          :
            <></>
          }
          {
            type === 'author'
            ?
            <Text style={{color: colors.textPrimary, padding: 15, backgroundColor:' rgba(92, 145, 151, 0.27)', borderRadius: 5}}>
              {authorDescription}
            </Text>
            :
            <Text>
            </Text>
          }
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
  },
  followbutton: (isFollowed) => ({
    backgroundColor: isFollowed === false ? colors.emphasis : 'rgba(1,1,1,1)',
    width: 120,
    height: 43,
    borderWidth: 1,
    borderColor: isFollowed === false ? colors.background : 'white',
    borderRadius: 25,
    padding: 10
  })
});
