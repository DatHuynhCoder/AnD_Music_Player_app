import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground
} from 'react-native'
import React, {useContext} from 'react'
//constants
import { colors } from '../constants/color'
import { textSizes } from '../constants/demensions';
import { ipAddress } from '../constants/ipAddress';
import axios from 'axios';
import { AudioContext } from '../context/NewAudioContextProvider';
import {
  useNavigation
} from '@react-navigation/native';

const AlbumCard = ({ albumId, albumName, albumURL, albumAuthor }) => {
  const navigation = useNavigation();
  const { setCurrentList } = useContext(AudioContext)
  return (
    <TouchableOpacity style={styles.container} onPress={() => {
      axios.get('http://' + ipAddress + ':3177/get-listsongs-by-albumid?albumid=' + albumId).then(res => {
        setCurrentList(res.data)
        navigation.navigate('NewAudioPlay', {albumURL: albumURL, albumName: albumName})
      })
    }}>
      <ImageBackground
        source={{uri: albumURL}}
        style={styles.ImgBackground}
      >
        <View style={styles.discHole} />
      </ImageBackground>
      <Text style={styles.albumNameTxt}>{albumName}</Text>
      <Text style={styles.albumAuthorTxt}>{albumAuthor}</Text>
    </TouchableOpacity>
  )
}

export default AlbumCard

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  ImgBackground: {
    height: 150,
    width: 150,
    justifyContent:'center',
    alignItems: 'center',
    borderRadius: 75,
    overflow: 'hidden', 
  },
  discHole: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.background,
  },
  albumNameTxt:{
    fontSize: textSizes.xm,
    color: colors.textPrimary
  },
  albumAuthorTxt:{
    fontSize: textSizes.xxm,
    color: colors.textSecondary
  }
})