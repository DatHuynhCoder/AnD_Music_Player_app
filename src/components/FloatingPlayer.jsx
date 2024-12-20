import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native'
import React, {useContext} from 'react'
import PlayerButton from './PlayerButton'
import { iconSizes } from '../constants/demensions'
import UserAvatar from '../../assets/img/user_avatar.png'
import { AudioContext } from '../context/NewAudioContextProvider'
import { Audio } from 'expo-av';
import { useNavigation } from '@react-navigation/native';
import { ipAddress } from '../constants/ipAddress';
import { colors, misc_colors } from '../constants/color'
const windowHeight = Dimensions.get('window').height;
const context = {
  "isLoad": false,
}

const FloatingPlayer = () => {
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
    loadSound
  } = useContext(AudioContext)
  const navigation = useNavigation();

  return (
    <TouchableOpacity style={{
      borderRadius: 20, 
      left: 30, 
      right: 30, 
      // bottom: 70,
      top: 725 * windowHeight / 850,
      flexDirection: 'row', 
      backgroundColor: 'rgba(0,0,0,0.8)', 
      position: 'absolute',
      zIndex: 1000
    }}
      onPress={() => navigation.navigate('PlayerPage')}
    >
      <>
        {/* <Image
          source={UserAvatar}
          style={{borderWidth: 1, height: 48, width: 48,borderRadius: 24, justifyContent: 'center', alignItems: 'center'}}
        /> */}
        <View style={{height: 48, width: 48, flexBasis: 50,backgroundColor: colors.emphasis,justifyContent: 'center',alignItems: 'center',borderRadius: 25,}}>
          <Text style={{fontSize: 16,fontWeight: 'bold',color: misc_colors.FONT}}>
            {currentName === '' ? '?' : currentName[0]}
          </Text>
        </View>
        <View style={{flex: 1, overflow: 'hidden', marginLeft: 10, justifyContent: 'center'}}>
          <Text numberOfLines={1} style={{fontSize: 13, fontWeight: '600', paddingLeft: 5, color: 'white'}}>
            {currentName === '' ? 'Không có dữ liệu' : currentName}
          </Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center', columnGap: 20, marginRight: 16, paddingLeft: 16, paddingVertical: 5}}>
          <PlayerButton iconType='PREVIOUS' size={25} color={'white'} onPress={()=> {
            handlePressPrevious()
          }}/>
          
          <PlayerButton 
            onPress={() => handlePressOnIcon()}
            style={{marginLeft: 5, marginRight: 5}} 
            iconType={status.isPlaying ? 'PLAY' : 'PAUSE'}
            size={40}
            color={'white'}
          />
          <PlayerButton iconType='NEXT' size={25} color={'white'} onPress={() => {
            handlePressNext()
          }}/>
        </View>
      </>
    </TouchableOpacity>
  )
}

const style = StyleSheet.create({

})

export default FloatingPlayer