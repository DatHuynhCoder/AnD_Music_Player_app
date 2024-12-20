import { useContext, useEffect, useState } from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity, Dimensions, TouchableWithoutFeedback, Modal, Animated, Easing, ScrollView } from 'react-native';
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

import axios from 'axios';

import { AudioContext } from '../context/NewAudioContextProvider';
import PlayerButton from '../components/PlayerButton';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const {width} = Dimensions.get('window')
const Tab = createMaterialTopTabNavigator();

const map = new Map()
map['ThuyenQuyen'] = '../../assets/ThuyenQuyen.mp3'

function LyricScreen() {
  const {
    currentList, setCurrentList,
    listLength, setListLength,
    currentSongid, setCurrentSongid,
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
    if(currentList.length > 0) {
      let lyric = currentList[currentAudioIndex].songlyric
      let tempArr = lyric.split('\n')
      setArrLyric(tempArr)
    }
  }, [currentAudioIndex])
  
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.background }}>
      <ScrollView>
        {arrLyric.map((item, index) => {
          return <View style={{margin: 10, textAlign: 'center'}}>
            <Text key={index} style={{color: colors.textPrimary, alignSelf: 'center'}}>
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
      tabBar={() => <View style={{backgroundColor: colors.background}}>
        <MaterialCommunityIcons 
          name="arrow-left-circle-outline" 
          size={40} 
          color="white" 
          onPress={() => navigation.goBack()}
          style={{borderWidth: 1, borderColor: '#121111'}}
        />
      </View>}
      initialRouteName='Player'
    >
      <Tab.Screen name="Lyric" component={LyricScreen}/>
      <Tab.Screen name="Player" component={PlayerPage} />
    </Tab.Navigator>
  );
}

// export default function PlayerPage({navigation}) {
function PlayerPage({navigation}) {
  const {
    currentList, setCurrentList,
    listLength, setListLength,
    currentSongid, setCurrentSongid,
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

  const [modalVisible, setModalVisible] = useState(false)
  const spinValue = new Animated.Value(0)
  const rotate = spinValue.interpolate({
    inputRange: [0,1],
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

  return (
    <>
    <Modal transparent visible={modalVisible} animationType='slide'>
      <View style={{
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        backgroundColor: "#fff",
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        zIndex: 1000
      }}>
        <Text style={{
          fontSize: 18,
          fontWeight: 'bold',
          padding: 20,
          paddingBottom: 0,
        }} numberOfLines={2}>{currentName}</Text>
        <View style={{padding: 20}}>
          <TouchableWithoutFeedback onPress={() => {}}>
            <Text style={{
              fontSize: 16,
              fontWeight: 'bold',
              paddingVertical: 10,
              letterSpacing: 1
            }}>Play</Text>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => {
            console.log('Add this to playlist')
          }}>
            <Text style={{
              fontSize: 16,
              fontWeight: 'bold',
              paddingVertical: 10,
              letterSpacing: 1
            }}>Add to Playlist</Text>
          </TouchableWithoutFeedback>
        </View>
      </View>
      <TouchableWithoutFeedback onPress={() => {
        setModalVisible(!modalVisible)
      }}>
        <View style={{
          position: 'absolute',
          top: 0,
          right: 0,
          left: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.2)"
        }}></View>
      </TouchableWithoutFeedback>
    </Modal>
    <View style={styles.container}>
      <View style={{borderWidth: 1, padding: 10, flexDirection: 'row', justifyContent: 'space-between'}}>
        <MaterialCommunityIcons 
          name="arrow-left-circle-outline" 
          size={40} 
          // color="white" 
          color={colors.background}
          onPress={() => navigation.goBack()}
          style={{borderWidth: 1, borderColor: '#121111'}}
        />
        <Entypo name="dots-three-vertical" size={40} color="white" 
          onPress={() => setModalVisible(true)}
        />
      </View>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Animated.View style={{transform: [{rotate}]}}>
          <MaterialCommunityIcons name="music-circle" size={300} color="#00C2CB"/>
        </Animated.View>
        <View style={{flexDirection: 'row', marginVertical: 30}}>
          <View>
            <FontAwesome5 name="share-square" size={24} color="white"/>
          </View>
          <View style={{alignItems: 'center', marginHorizontal: 80, width: 150}}>
            <Text style={{fontSize: 16, color: 'white'}}>{currentName !== '' ? currentName : 'Không có dữ liệu'}</Text>
            <Text style={{opacity: 0.6, color: 'white'}}>{currentSinger !== '' ? currentSinger : '...'}</Text>
          </View> 
          <View>
            <AntDesign name="hearto" size={24} color="white" />
          </View>
        </View>
      </View>
      <View style={{marginVertical: 10}}>
        <TouchableWithoutFeedback onPress={() => handlePressSlider()}>
          <Slider
            style={{width: 393, height: 40}}
            minimumValue={0}
            maximumValue={1}
            value={playbackPosition/playbackDuration}
            onValueChange={setSliderPosition}
            minimumTrackTintColor='#00C2CB'
            maximumTrackTintColor='white'
          >
          </Slider>
        </TouchableWithoutFeedback>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 30}}>
          <Text style={{color: 'white'}}>{convertTime(Math.floor(playbackPosition/1000))} </Text>
          <Text style={{marginLeft: 1, color: 'white'}}>
            {convertTime(Math.floor(playbackDuration/1000))}
          </Text>
        </View>
      </View>
      <View style={{padding: 5, width: width, justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
        <View style={{alignItems: 'center', flexDirection: 'row'}}>
          <MaterialIcons 
            name="replay-10" size={24} color="white" style={{margin: 10}}
            onPress={() => handlePressReplay()}
            />
          <PlayerButton 
            iconType='PREVIOUS' size={25} color={'white'} 
            onPress={() => {
              handlePressPrevious()
            }}
          />
          <TouchableOpacity onPress={() => handlePressOnIcon()} style={{border: 1, justifyContent: 'center', alignItems: 'center', marginHorizontal: 20}}>
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
            name="forward-10" size={25} color="white" style={{margin: 10}}
            onPress={() => handlePressForward()}
            />
        </View>
      </View>
      <View style={{justifyContent: 'center', alignItems: 'center', paddingTop: 30, bottom: 0}}>
        <View style={{borderRadius: 10, paddingHorizontal: 5, backgroundColor: 'grey', opacity: 0.7}}>
          <Text style={{fontWeight: '600', color: 'white'}}>128 Kbps</Text>
        </View>
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
});