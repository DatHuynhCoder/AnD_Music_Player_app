import { useContext, useEffect, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Button,
  TouchableOpacity,
  Dimensions,
  TouchableWithoutFeedback,
  Modal,
  Animated,
  Easing,
  ScrollView,
  Image,
  TextInput,
  Pressable,
  ImageBackground,
} from 'react-native';
import { Audio } from 'expo-av';
import Slider from '@react-native-community/slider';
import { colors, misc_colors } from '../constants/color';
import { ipAddress } from '../constants/ipAddress';
import { useNavigation } from '@react-navigation/native';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import AntDesign from '@expo/vector-icons/AntDesign';
import { UserContext } from '../context/UserContext';


import Toast from 'react-native-toast-message';
import axios from 'axios';

import { AudioContext } from '../context/NewAudioContextProvider';
import PlayerButton from '../components/PlayerButton';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { iconSizes, textSizes } from '../constants/demensions';
import CurrentPlaylist from './CurrentPlaylist'

const { width } = Dimensions.get('window')
const Tab = createMaterialTopTabNavigator();

function LyricScreen() {
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
  const navigation = useNavigation();
  const [arrLyric, setArrLyric] = useState([])
  useEffect(() => {
    if (currentList.length > 0) {
      let lyric = currentList[currentAudioIndex]?.songlyric
      if (lyric !== undefined) {
        let tempArr = lyric.split('\n')
        setArrLyric(tempArr)
      }
    }
  }, [currentAudioIndex])

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.background }}>
      <ScrollView>
        {arrLyric.map((item, index) => {
          return <View key={index} style={{ margin: 10, textAlign: 'center' }}>
            <Text style={{ color: colors.textPrimary, alignSelf: 'center' }}>
              {item}
            </Text>
          </View>
        })}
      </ScrollView>
    </View>
  );
}

export default function MyTabs() {
  const navigation = useNavigation()

  return (
    <Tab.Navigator
      tabBar={() => <View style={{ backgroundColor: colors.background, padding: 10}}>
        <AntDesign
          name="arrowleft"
          size={40}
          color="white"
          onPress={() => navigation.goBack()}
          style={{ borderWidth: 1, borderColor: '#121111' }}
        />
      </View>}
      initialRouteName='Player'
    >
      <Tab.Screen name="Lyric" component={LyricScreen} />
      <Tab.Screen name="Player" component={PlayerPage} />
      <Tab.Screen name="CurrentPlaylist" component={CurrentPlaylist} />
    </Tab.Navigator>
  );
}

// export default function PlayerPage({navigation}) {
function PlayerPage({ navigation }) {
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
    isRandoming, setIsRandoming,
    playbackPosition, setPlaybackPosition,
    playbackDuration, setPlaybackDuration,
    sliderPosition, setSliderPosition,
    intervalId, setIntervalId,
    handlePressOnIcon,
    handlePressPrevious,
    handlePressNext,
    handlePressReplay,
    handlePressForward,
    handlePressSlider,
    loadSound
  } = useContext(AudioContext)

  const [modalPlaylistVisible, setmodalPlaylistVisible] = useState(false);
  const [playlistName, setPlaylistName] = useState('');
  const [listPlaylist, setListPlaylist] = useState([]); //Chứa playlist hiện có trong thư viện
  const { userid, setUserid, rerenderCxt,setRerenderCxt } = useContext(UserContext)

  const getPlaylist = async () => {
    console.log(userid);
    try {
      const response = await axios.get("http://" + ipAddress + ":3177" + "/get-playlist-by-userid?userid=" + userid)
      if (response.data.Status === 'Success') {
        console.log('Lay playlist thanh cong!', response.data.Result);
        setListPlaylist(response.data.Result);
      }
      else {
        console.log('Lay playlist that bai')
      }
    } catch (error) {
      console.log('Khong the lay playlist ' + error)
    }
  }

  const handleAddSong = async (playlistid) => {
    const addSongInfo = {
      songid: currentSongid,
      playlistid: playlistid
    }
    const addSongResponse = await axios.post(
      'http://' + ipAddress + ':3177/add-song-to-playlist',
      addSongInfo
    );
    if (addSongResponse.data.Status !== 'Success') {
      Toast.show({
        type: 'error',
        text1: 'Song already in your playlist ❌'
      })
      return;
    }

    // Tải lại danh sách playlist
    await getPlaylist();
    setRerenderCxt(!rerenderCxt);

    Toast.show({
      type: 'success',
      text1: 'Song added successfully! ✅'
    })
    setmodalPlaylistVisible(false);
  }

  const handleCreatePlaylist = async (playlistName) => {
    if (playlistName === '') {
      Toast.show({
        type: 'error',
        text1: 'Please enter playlist name! ✍️'
      })
      return;
    }
  
    const info = {
      playlistname: playlistName,
      userid: userid,
    };
  
    try {
      // Thêm playlist mới
      const response = await axios.post('http://' + ipAddress + ':3177/add-new-playlist', info);
      if (response.data.Status !== 'Success') {
        Toast.show({
          type: 'error',
          text1: 'Failed to create playlist ❌'
        })
        return;
      }
      const newplaylistid = response.data.playlistid;
  
      // Thêm bài hát vào playlist mới
      const addSongInfo = {
        songid: currentSongid,
        playlistid: newplaylistid,
      };
      console.log(addSongInfo.playlistid);
      const addSongResponse = await axios.post(
        'http://' + ipAddress + ':3177/add-song-to-playlist',
        addSongInfo
      );
      if (addSongResponse.data.Status !== 'Success') {
        Toast.show({
          type: 'error',
          text1: 'Failed to add song to playlist ❌'
        })
        return;
      }
  
      // Tải lại danh sách playlist
      await getPlaylist();
      setRerenderCxt(!rerenderCxt);

      Toast.show({
        type: 'success',
        text1: 'Playlist created and song added successfully ✅'
      })
      setmodalPlaylistVisible(false);
    } catch (error) {
      console.error('Error in handleCreatePlaylist:', error);
      Toast.show({
        type: 'error',
        text1: 'An error occurred while creating the playlist ❌'
      })
    }
  };  

  const spinValue = new Animated.Value(0)
  const rotate = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  })
  const spin = () => {
    spinValue.setValue(0)
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 1500,
      easing: Easing.linear,
      useNativeDriver: true
    })
      .start(() => spin())
  }

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

  return (
    <>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalPlaylistVisible}
        onRequestClose={() => {
          setmodalPlaylistVisible(!modalPlaylistVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <AntDesign
              style={{ alignSelf: 'flex-end' }}
              name="close"
              size={iconSizes.lg}
              color="black"
              onPress={() => setmodalPlaylistVisible(!modalPlaylistVisible)}
            />
            <Text style={styles.modalText}>Add your song to playlist</Text>
            <ScrollView>
            {listPlaylist.map((item, index) => (
              <TouchableOpacity 
                key={index} 
                onPress={() => handleAddSong(item.playlistid)}
                style={{ flexDirection: 'row', alignSelf: 'flex-start', margin: '5', borderWidth: 1, width: 220, borderRadius: 10, borderColor: 'rgba(1,1,1,0.2)'}}
              >
                {/* <MaterialCommunityIcons name="checkbox-multiple-blank-outline" size={24} color="black" /> */}
                <Image source={item.playlistimg !== '' ? { uri: 'http://' + ipAddress + ':3177' + item.playlistimg } : { uri: 'http://' + ipAddress + ':3177/image/album/defaultplaylist.png' }} style={{height: 55,width: 55,borderRadius: 10}} />
                <Text numberOfLines={1} style={{ marginLeft: 5, alignSelf: 'center', fontWeight: 'bold', fontSize: 15 }}>{item.playlistname}</Text>
              </TouchableOpacity>
            ))}
            </ScrollView>
            <Text style={styles.modalText}>Or create new playlist</Text>
            <TextInput
              placeholder='Enter playlist name'
              value={playlistName}
              onChangeText={(txt) => setPlaylistName(txt)}
              style={styles.enter_playlist}
            />
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => handleCreatePlaylist(playlistName)}>
              <Text style={styles.textStyle}>Create</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <View style={styles.container}>
        <View style={{ padding: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
          <MaterialCommunityIcons
            name="arrow-left-circle-outline"
            size={40}
            // color="white" 
            color={colors.background}
            onPress={() => navigation.goBack()}
            style={{ borderWidth: 1, borderColor: '#121111' }}
          />
        </View>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <View>
            {
              currentSongimg === '' ?
                <MaterialCommunityIcons name="music-circle" size={300} color="#00C2CB" />
                :
                <ImageBackground
                  source={{ uri: 'http://' + ipAddress + ':3177' + currentSongimg }}
                  style={{ width: 250, height: 250, borderRadius: 175, justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}
                >
                  <View style={styles.discHole} />
                </ImageBackground>
            }

          </View>
          <View style={{ flexDirection: 'row', marginVertical: 30 }}>
            <View style={{ alignItems: 'center', marginHorizontal: 20, flex: 1 }}>
              <Text style={{ fontSize: textSizes.sm, color: 'white' }}>{currentName !== '' ? currentName : 'Không có dữ liệu'}</Text>
              <Text style={{ opacity: 0.6, color: 'white' }}>{currentSinger !== '' ? currentSinger : '...'}</Text>
            </View>
          </View>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 30, marginBottom: 10 }}>
          {/* <Entypo name="shuffle" size={24} color={isRandoming === false ? colors.iconPrimary : colors.emphasis} onPress={() => {
            console.log('press me set shuffle')
            console.log('isRandoming before set: ', isRandoming)
            setIsRandoming(prev => !prev)
            console.log('isRandoming after set: ', isRandoming)
          }}/> */}
          <Text style={{ marginLeft: 1, color: 'white' }}>
            {/* {convertTime(Math.floor(playbackDuration / 1000))} */}
          </Text>
        </View>
        <View style={{ marginVertical: 10 }}>
          <Slider
            style={{ width: 393, height: 40 }}
            minimumValue={0}
            maximumValue={1}
            value={playbackPosition / playbackDuration}
            // onValueChange={setSliderPosition}
            minimumTrackTintColor='#00C2CB'
            maximumTrackTintColor='white'
          >
          </Slider>
          {/* <TouchableWithoutFeedback onPress={() => handlePressSlider()}> */}
          <Slider
            style={{ width: 393, height: 40, position: 'absolute', zIndex: 1000 }}
            minimumValue={0}
            maximumValue={1}
            onValueChange={(e) => {
              async function changePos() {
                let letgo = playbackDuration * e
                setPlaybackPosition(letgo)
                await playback.setPositionAsync(letgo)
              }
              changePos()
              // setSliderPosition(e)
            }}
            minimumTrackTintColor='rgba(1,1,1,0)'
            maximumTrackTintColor='rgba(1,1,1,0)'
            thumbTintColor='rgba(1,1,1,0)'
          ></Slider>
          {/* </TouchableWithoutFeedback> */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 30 }}>
            <Text style={{ color: 'white' }}>{convertTime(Math.floor(playbackPosition / 1000))} </Text>
            <Text style={{ marginLeft: 1, color: 'white' }}>
              {convertTime(Math.floor(playbackDuration / 1000))}
            </Text>
          </View>
        </View>
        <View style={{ padding: 5, width: width, justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }}>
          <View>
            <Entypo name="loop" size={24} color={status.isLooping === false ? "white" : colors.emphasis} style={{ marginLeft: 10 }}
              onPress={() => {
                async function setLoop() {
                  if (status.isLooping === false) {
                    setIsRandoming(false)
                    const status = await playback.setIsLoopingAsync(true)
                    console.log('status after enable loop: ', status)
                    setStatus(status)
                  }
                  else {
                    const status = await playback.setIsLoopingAsync(false)
                    setStatus(status)
                  }
                }
                setLoop()
              }}
            />
          </View>
          <View style={{ alignItems: 'center', flexDirection: 'row' }}>
            <MaterialIcons
              name="replay-10" size={24} color="white" style={{ margin: 10 }}
              onPress={() => handlePressReplay()}
            />
            <PlayerButton
              iconType='PREVIOUS' size={25} color={'white'}
              onPress={() => {
                handlePressPrevious()
              }}
            />
            <TouchableOpacity onPress={() => handlePressOnIcon()} style={{ border: 1, justifyContent: 'center', alignItems: 'center', marginHorizontal: 20 }}>
              {
                status.isPlaying === true ?
                  <AntDesign name="pausecircleo" size={57} color="white" />
                  :
                  <AntDesign name="playcircleo" size={57} color="white" />
              }
            </TouchableOpacity>
            <PlayerButton
              iconType='NEXT' size={25} color={'white'}
              onPress={() => {
                handlePressNext()
              }}
            />
            <MaterialIcons
              name="forward-10" size={25} color="white" style={{ margin: 10 }}
              onPress={() => handlePressForward()}
            />
          </View>
          <View>
            <MaterialCommunityIcons name="play-speed" size={24} color={status.rate === 1 ? "white" : colors.emphasis} style={{ marginRight: 10 }}
              onPress={() => {
                async function setSpeed() {
                  if (status.rate === 1) {
                    const status = await playback.setRateAsync(2)
                    setStatus(status)
                  }
                  else {
                    const status = await playback.setRateAsync(1)
                    setStatus(status)
                  }
                }
                setSpeed()
              }}
            />
          </View>
        </View>
        <View style={{ justifyContent: 'center', alignItems: 'center', paddingTop: 30, bottom: 0, flexDirection: 'row', justifyContent: 'space-around' }}>
          <MaterialIcons
            name="playlist-add"
            size={iconSizes.xl}
            color={colors.iconPrimary}
            onPress={() => { getPlaylist(); setmodalPlaylistVisible(true) }}
          />
          <View style={{ borderRadius: 10, paddingHorizontal: 5, backgroundColor: 'grey', opacity: 0.7 }}>
            <Text style={{ fontWeight: '600', color: 'white' }}>128 Kbps</Text>
          </View>
          <AntDesign name="hearto" size={24} color="white" onPress={() => {
            console.log('Add to favourite')
            axios.post("http://" + ipAddress + ":3177" + "/add-song-to-favourite-playlist", {
              songid: currentSongid,
              userid: userid
            }).then(res => {
              if (res.data.Status === 'Success') {
                Toast.show({
                  type: 'success',
                  text1: 'Add to favourite successfully ✅'
                })
                setRerenderCxt(!rerenderCxt);
              }
              else {
                Toast.show({
                  type: 'error',
                  text1: res.data.Error + ' ❌'
                })
              }
            })
          }}/>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#121111',
    flex: 1,
  },
  discHole: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.background,
  },
  //Modal
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalView: {
    margin: 20,
    backgroundColor: 'rgba(229,228,228,0.8)',
    borderRadius: 20,
    paddingHorizontal: 50,
    paddingBottom: 25,
    paddingTop: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: colors.emphasis,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    fontSize: textSizes.sm,
    fontWeight: '500',
    textAlign: 'center',
  },
  enter_playlist: {
    borderWidth: 2,
    borderRadius: 15,
    borderColor: colors.emphasis,
    margin: 10,
    minWidth: 130
  }
});