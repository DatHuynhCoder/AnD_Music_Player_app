//This card is use in ExplorePage.jsx
import { StyleSheet, Text, View, Image, ScrollView,TouchableOpacity } from 'react-native'
import React, {useContext} from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
//constants
import { colors } from '../constants/color'
import { iconSizes, textSizes } from '../constants/demensions'
import SongCard2 from './SongCard2'
import { ipAddress } from '../constants/ipAddress'
import {DefaultAvatar} from '../../assets/img/temp_playlist_pic.jpg'
import { AudioContext } from '../context/NewAudioContextProvider'
import axios from 'axios'
import { useNavigation } from '@react-navigation/native'

const AuthorCard = ({ authorId, authorName, authorURL, musicData }) => {
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
    currentAudioId, setCurrentAudioId,
    isPlaying, setIsPlaying,
    currentAudioIndex, setCurrentAudioIndex,
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
  const navigation = useNavigation();
  const filteredSongOfAuthor = musicData.filter((item) => {
    return item.authorname === authorName;
  }) // Chứa những bài hát của 1 tác giả nào đấy

  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity style={styles.container}
        onPress={() => {
          axios.get("http://" + ipAddress + ":3177" + "/get-song-by-authorid?authorid=" + authorId)
          .then(res => {
            if(res.data.Status === 'Success') {
              setCurrentList(res.data.Result)
              navigation.navigate('NewAudioPlay', {
                songColectionURL: 'http://' + ipAddress + ':3177' + authorURL,
                songColectionName: authorName,
                authorId: authorId
              })
            }
            else {
              alert('Error')
            }
          })
        }}
      >
        <View style={styles.authorContainer}>
          <Image
            source={{uri: 'http://' + ipAddress + ':3177' + authorURL}}
            style={styles.authorAvatar}
          />

          <View style={styles.authorSubContainer}>
            <Text style={styles.authorNameTxt}>{authorName}</Text>
            <Text style={styles.authortxt}>Somethinng about author</Text>
          </View>
        </View>
        <AntDesign
          name='right'
          color={colors.iconPrimary}
          size={iconSizes.md}
        />
      </TouchableOpacity>
      <View style={styles.authorSongsContainer}>
        {/* <ScrollView> */}
        {filteredSongOfAuthor.map((item, index) => (
          <View style={styles.cardWrapper} key={item.authorid + index}>
            <SongCard2 
              musicName={item.songname} 
              musicURL={item.songimg} 
              musicAuthor={item.authorname}
              onSongPressed={() => {
                setCurrentList([item]);
                setCurrentSongid(item.songid);
                setCurrentSongimg(item.songimg)
                setCurrentName(item.songname);
                setCurrentSinger(item.authorname);
                setCurrentAudioIndex(0);
                loadSound({ uri: "http://" + ipAddress + ":3177" + item.songuri })
              }}
            />
          </View>
        ))}
        {/* </ScrollView> */}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#1E1E1E',
    padding: 5,
    borderRadius: 15,
    flexDirection: 'column'
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
  },
  authorContainer: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center'
  },
  authorSubContainer: {
    flexDirection: 'column',
  },
  authorNameTxt: {
    color: colors.textPrimary,
    fontWeight: '600',
    fontSize: textSizes.sm
  },
  authortxt: {
    color: colors.textSecondary,
    fontSize: textSizes.xm
  },
  authorAvatar: {
    height: iconSizes.super,
    width: iconSizes.super,
    borderRadius: 40
  },
  authorSongsContainer: {
    backgroundColor: '#403e3e',
    borderRadius: 15
  },
  cardWrapper: {
    margin: 5
  }
})

export default AuthorCard