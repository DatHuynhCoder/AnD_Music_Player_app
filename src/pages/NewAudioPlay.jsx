import { useContext, useEffect, useState } from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity, Dimensions, TouchableWithoutFeedback } from 'react-native';
import { Audio } from 'expo-av';
import Slider from '@react-native-community/slider';
import { colors, misc_colors } from '../constants/color';

import Entypo from '@expo/vector-icons/Entypo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import AntDesign from '@expo/vector-icons/AntDesign';
import axios from 'axios';

import { AudioContext } from '../context/NewAudioContextProvider';
import PlayerButton from '../components/PlayerButton';

const {width} = Dimensions.get('window')

const map = new Map()
map['ThuyenQuyen'] = '../../assets/ThuyenQuyen.mp3'

const songs = [
  {
    author: '',
    genre: '',
    name: 'Thuyền Quyên remix',
    uri: require('../../assets/ThuyenQuyen.mp3'),
    duration: 252, //second
  },
  {
    author: 'Datkaa',
    genre: '',
    name: 'Có sao cũng đành',
    uri: require('../../assets/CoSaoCungDanh-DatKaa.mp3'),
    duration: 236,//second
  },
  {
    author: 'Châu Khải Phong',
    genre: '',
    name: 'Nụ cười không vui remix',
    uri: require('../../assets/NuCuoiKhongVui-ChauKhaiPhong.mp3'),
    duration: 227,//second
  }
]

const SongItem = ({title, isPlaying, duration, onOptionPress, onSongPress, isActive}) => {
  return (
    <>
      <View style={{flexDirection: 'row',alignSelf: 'center',width: width - 80,}}>
        <TouchableWithoutFeedback onPress={() => onSongPress()}>
          <View style={{flexDirection: 'row',alignItems: 'center', width: 263,}}>
            <View style={{height: 50,flexBasis: 50,backgroundColor: colors.emphasis,justifyContent: 'center',alignItems: 'center',borderRadius: 25,}}>
              <Text style={{fontSize: 22,fontWeight: 'bold',color: misc_colors.FONT}}>
                {title[0]}
              </Text>
            </View>
            <View style={{width: width - 180,paddingLeft: 10,}}>
              <Text numberOfLines={1} style={{fontSize: 16,color: misc_colors.FONT}}>{title}</Text>
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

export default function App() {
  const {
    currentName, setCurrentName,
    playback, setPlayback,
    status, setStatus,
    sound, setSound,
    currentAudioIndex, setCurrentAudioIndex,
    isPlaying, setIsPlaying,
    playbackPosition, setPlaybackPosition,
    playbackDuration, setPlaybackDuration,
    sliderPosition, setSliderPosition,
    intervalId, setIntervalId
  } = useContext(AudioContext)

  const [authors, setAuthors] = useState([])

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

  function _onPlaybackStatusUpdate(status) {
    if(status.didJustFinish === true) {
      finish()
      return
    }
    if(status.isLoaded === true && status.isPlaying === true) {
      setPlaybackPosition(status.positionMillis)
      setPlaybackDuration(status.durationMillis) 
    }
  }

  async function loadSound(uri) {
    if(status.isLoaded === false) {
      try {
        // const playback = new Audio.Sound()
        // setPlayback(playback)
        // const status = await playback.loadAsync(uri)
        await playback.loadAsync(uri)
        const status = await playback.playAsync()
        setStatus(status)
        console.log('Audio loaded !!! with status: ', status)
        setPlaybackPosition(status.positionMillis)
        setPlaybackDuration(status.durationMillis)
        playback.setOnPlaybackStatusUpdate(_onPlaybackStatusUpdate);
      }
      catch (err) {
        console.log('error when trying to load an audio', err)
      }
    }
    else if(status.isLoaded === true && status.isPlaying === true) {
      console.log('click on an audio when other is playing')
      await playback.stopAsync()
      await playback.unloadAsync()
      await playback.loadAsync(uri)
      const status = await playback.playAsync()
      setStatus(status)
      console.log('Status after load a new audio: ', status)
      setPlaybackPosition(status.positionMillis)
      setPlaybackDuration(status.durationMillis)
      playback.setOnPlaybackStatusUpdate(_onPlaybackStatusUpdate);
    }
    else if(status.isLoaded === true && status.isPlaying === false) {
      console.log('click on an audio while pause other audio')
      await playback.stopAsync()
      await playback.unloadAsync()
      await playback.loadAsync(uri)
      const status = await playback.playAsync()
      setStatus(status)
      console.log('Status after load a new audio: ', status)
      setPlaybackPosition(status.positionMillis)
      setPlaybackDuration(status.durationMillis)
      playback.setOnPlaybackStatusUpdate(_onPlaybackStatusUpdate);
    }
  }
  
  async function playSound() {
    if(isLoaded === true && isPlaying === false) // no audio playing now
      try {
        console.log('play function goes now !!!!')
        // const status = await playback.loadAsync(require('../../assets/ThuyenQuyen.mp3'))
        // const status = await playback.loadAsync({uri: songs[0].uri}) with songs[0].uri = 'https://example.com/ThuyenQuyen.mp3'
        // const status = await playback.loadAsync(songs[0].uri)
        const status = await playback.playAsync()
        console.log('status after play: ', status)
        setStatus(status)
        setIsPlaying(true)
        playback.setOnPlaybackStatusUpdate(_onPlaybackStatusUpdate);
      }
      catch(err) {
        console.log('error when trying to play an audio: ', err);
      }
  }

  async function pauseSound() {
    try {
      const status = await playback.pauseAsync()
      console.log('status after pause: ', status)
      setPlayback(playback)
      setStatus(status)
      setIsPlaying(false)
    }
    catch(err) {
      console.log('error when trying to pause audio: ', err); 
    }
  }
  
  async function resumeSound() {
    try {
      const status = await playback.playAsync()
      console.log('status after resume: ', status)
      setPlayback(playback)
      setStatus(status)
      setIsPlaying(true)
    } catch(err) {
      console.log("error when trying to resume audio: ", err)
    }
  }

  async function finish() {
    try {
      await playback.unloadAsync()
      setIsPlaying(false)
      setPlaybackPosition(0)
      setPlaybackDuration(0)
      console.log('Finished');
    }
    catch(err) {
      console.log('error when trying to unload audio: ', err);
    }
  }

  function handlePressOnIcon() {
    console.log('===>> check status after click on icon: ', status)
    if(status === null && playback === null) {
    // if(status.isLoaded === true && isPlaying === false && status.didJustFinish === false && status.positionMillis === 0) {
      playSound()
    }
    else if(status.isLoaded === true && status.isPlaying === true && status.didJustFinish === false) {
      pauseSound()
    }
    else if(status.isLoaded === true && status.isPlaying === false && status.didJustFinish === false) {
      resumeSound()
    }
  }

  async function handlePressPrevious() {
    console.log('you press on previous')
    if(currentAudioIndex !== 0) {
      console.log('click on an previous when other is playing')
      await playback.stopAsync()
      await playback.unloadAsync()
      await playback.loadAsync(songs[currentAudioIndex - 1].uri)
      const status = await playback.playAsync()
      setStatus(status)
      console.log('Status after load a new audio: ', status)
      setPlaybackPosition(status.positionMillis)
      setPlaybackDuration(status.durationMillis)
      setCurrentName(songs[currentAudioIndex - 1].name)
      setCurrentAudioIndex(currentAudioIndex - 1)
      playback.setOnPlaybackStatusUpdate(_onPlaybackStatusUpdate);
    }
    else {
      console.log('there are no previous song')
    }
  }
  async function handlePressNext() {
    console.log('you press on next with currentAudioIndex: ', currentAudioIndex)
    if(currentAudioIndex === songs.length - 1) {
      console.log('you are in the last audio in current list')
    }
    else {
      console.log('click on next when other is playing')
      await playback.stopAsync()
      await playback.unloadAsync()
      await playback.loadAsync(songs[currentAudioIndex + 1].uri)
      const status = await playback.playAsync()
      setStatus(status)
      console.log('Status after load a new audio: ', status)
      setPlaybackPosition(status.positionMillis)
      setPlaybackDuration(status.durationMillis)
      setCurrentName(songs[currentAudioIndex + 1].name)
      setCurrentAudioIndex(currentAudioIndex + 1)
      playback.setOnPlaybackStatusUpdate(_onPlaybackStatusUpdate);
    }
  }
  async function handlePressReplay() {
    console.log('replay 10s')
    setPlaybackPosition(playbackPosition - 10000)
    await playback.setPositionAsync(playbackPosition - 10000)
  }
  async function handlePressForward() {
    console.log('forward 10s')
    setPlaybackPosition(playbackPosition + 10000)
    await playback.setPositionAsync(playbackPosition + 10000)
  }
  async function handlePressSlider() {
    console.log(sliderPosition)
    setPlaybackPosition(sliderPosition)
    await playback.setPositionAsync(playbackPosition)
  }
  useEffect(() => {
    console.log("let's get all author")
    async function getAllAuthor () {
      await axios.get("http://172.30.182.211:3177/get-all-author").then(res => { // đổi thành địa chỉ ip máy thay vì localhost
        setAuthors(res.data)
      }).catch(err => console.log(err))
    }
    getAllAuthor()
  }, [])
  return (
    <>
    <View style={styles.container}>
      {
        songs.map((song, index) => {
          // title = 'Thuyen Quyen', isPlaying = false, duration = 1000, onOptionPress = () => console.log('option pressed'), onSongPress = () => console.log('song pressed'), isActive = false}
          return <SongItem 
            key={index}
            title={song.name} 
            isPlaying={false} 
            duration={convertTime(song.duration)}
            onOptionPress={() => console.log('option pressed')}
            onSongPress={() => {
              setCurrentName(song.name)
              console.log('current index: ', currentAudioIndex)
              setCurrentAudioIndex(index)
              console.log('current index name: ', songs[currentAudioIndex].name)
              loadSound(song.uri)
            }}
            isActive={false}
          />
        })
      }
      <View>
        {
          authors.map((author) => {
            return <Text key={author.authorid}>
              {author.authorid} - {author.authorname}
            </Text>
          })
        }
      </View>
      <View style={{display:'flex', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 30}}>
        <Text>{currentName !== '' ? currentName : 'Không có dữ liệu'}</Text>
        <Text style={{marginLeft: 1}}>
          {convertTime(Math.floor(playbackPosition/1000))} 
          / 
          {convertTime(Math.floor(playbackDuration/1000))}
        </Text>
      </View>
      <TouchableWithoutFeedback onPress={() => handlePressSlider()}>
        <Slider
          style={{width: 393, height: 40}}
          minimumValue={0}
          maximumValue={1}
          value={playbackPosition/playbackDuration}
          onValueChange={setSliderPosition}
          minimumTrackTintColor='black'
          maximumTrackTintColor='blue'
        >
        </Slider>
      </TouchableWithoutFeedback>
      <View style={{height: 50, borderWidth: 1, width: width, justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
        <View style={{alignItems: 'center', flexDirection: 'row'}}>
          <MaterialIcons 
            name="replay-10" size={24} color="black" style={{margin: 10}}
            onPress={() => handlePressReplay()}
            />
          <PlayerButton 
            iconType='PREVIOUS' size={25} color={'black'} 
            onPress={() => handlePressPrevious()}
          />
          <TouchableOpacity onPress={() => handlePressOnIcon()} style={{border: 1, justifyContent: 'center', alignItems: 'center', marginHorizontal: 20}}>
          {
            status.isPlaying === true ?
              <AntDesign name="pausecircleo" size={37} color="black" />
              :
              <AntDesign name="playcircleo" size={37} color="black" />
          }
          </TouchableOpacity>
          <PlayerButton 
            iconType='NEXT' size={25} color={'black'}
            onPress={() => handlePressNext()}
          />
          <MaterialIcons 
            name="forward-10" size={25} color="black" style={{margin: 10}}
            onPress={() => handlePressForward()}
            />
        </View>
      </View>
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    backgroundColor: '#ecf0f1',
  },
});
