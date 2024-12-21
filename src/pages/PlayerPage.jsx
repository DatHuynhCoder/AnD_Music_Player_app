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
  Pressable
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

import axios from 'axios';

import { AudioContext } from '../context/NewAudioContextProvider';
import PlayerButton from '../components/PlayerButton';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { iconSizes, textSizes } from '../constants/demensions';
import { FlatList } from 'react-native-gesture-handler';

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
      tabBar={() => <View style={{ backgroundColor: colors.background }}>
        <MaterialCommunityIcons
          name="arrow-left-circle-outline"
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
  const { userid, setUserid } = useContext(UserContext)

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
        animationType="slide"
        transparent={true}
        visible={modalPlaylistVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
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
            {listPlaylist.map((item, index) => (
              <View key={index} style={{flexDirection:'row', alignSelf: 'flex-start', margin: '5'}}>
                <MaterialCommunityIcons name="checkbox-multiple-blank-outline" size={24} color="black" />
                {/* <MaterialCommunityIcons name="checkbox-multiple-marked" size={24} color="black" /> */}
                <Text style={{marginLeft: 5, alignSelf: 'center'}}>{item.playlistname}</Text>
              </View>
            ))}
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
        <View style={{ borderWidth: 1, padding: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
          <MaterialCommunityIcons
            name="arrow-left-circle-outline"
            size={40}
            // color="white" 
            color={colors.background}
            onPress={() => navigation.goBack()}
            style={{ borderWidth: 1, borderColor: '#121111' }}
          />
          <Entypo name="dots-three-vertical" size={40} color="white"
            onPress={() => setModalVisible(true)}
          />
        </View>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <View>
            {
              currentSongimg === '' ?
                <MaterialCommunityIcons name="music-circle" size={300} color="#00C2CB" />
                :
                <Image
                  source={{ uri: 'http://' + ipAddress + ':3177' + currentSongimg }}
                  style={{ width: 250, height: 250, borderRadius: 175 }}
                ></Image>
            }

          </View>
          <View style={{ flexDirection: 'row', marginVertical: 30 }}>
            <View style={{ alignItems: 'center', marginHorizontal: 20, flex: 1 }}>
              <Text style={{ fontSize: textSizes.sm, color: 'white' }}>{currentName !== '' ? currentName : 'Không có dữ liệu'}</Text>
              <Text style={{ opacity: 0.6, color: 'white' }}>{currentSinger !== '' ? currentSinger : '...'}</Text>
            </View>
          </View>
        </View>
        <View style={{ marginVertical: 10 }}>
          <TouchableWithoutFeedback onPress={() => handlePressSlider()}>
            <Slider
              style={{ width: 393, height: 40 }}
              minimumValue={0}
              maximumValue={1}
              value={playbackPosition / playbackDuration}
              onValueChange={setSliderPosition}
              minimumTrackTintColor='#00C2CB'
              maximumTrackTintColor='white'
            >
            </Slider>
          </TouchableWithoutFeedback>
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
                async function setShuffle() {
                  if (status.isLooping === false) {
                    const status = await playback.setIsLoopingAsync(true)
                    console.log('status after enable loop: ', status)
                    setStatus(status)
                  }
                  else {
                    const status = await playback.setIsLoopingAsync(false)
                    setStatus(status)
                  }
                }
                setShuffle()
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
          <AntDesign name="hearto" size={24} color="white" />
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
  //Modal
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 10,
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