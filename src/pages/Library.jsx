import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image
} from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import * as MediaLibrary from 'expo-media-library'
//constants
import { ipAddress } from '../constants/ipAddress'
import { colors } from '../constants/color'
import { textSizes } from '../constants/demensions'
import { UserContext } from '../context/UserContext'
import axios from 'axios'

const Library = () => {
  const { userid, setUserid } = useContext(UserContext)
  const getPermission = async () => {
    const permission = await MediaLibrary.getPermissionsAsync()
    console.log(permission);
  }
  const [selectedOption, setSelectedOption] = useState(''); // To track the selected library button
  const handleLibraryChoice = (optionId) => {
    setSelectedOption(optionId);
  }

  const [listPlaylist, setListPlaylist] = useState([]);

  const getPlaylist = async () => {
    try {
      const response = axios.get("http://" + ipAddress + "3177" + "/get-playlist-by-userid", userid)
      if (response.data.Status === 'Success') {
        console.log('Lay playlist thanh cong!');
        setListPlaylist(response.data.Result);
      }
      else {
        console.log('Lay playlist that bai')
      }
    } catch (error) {
      console.log('Khong the lay playlist ')
    }
  }

  useEffect(() => {
    getPermission();
    getPlaylist();
  }, [])

  const libraryOptionsData = [
    {
      id: 1,
      option: 'Playlist',
    },
    {
      id: 2,
      option: 'Songs',
    },
    {
      id: 3,
      option: 'Artists',
    },
    {
      id: 4,
      option: 'Albums',
    },
    {
      id: 5,
      option: 'Podcasts',
    },
  ]

  return (
    <View style={styles.container}>
      <FlatList
        data={libraryOptionsData}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.libraryChoicesBtn,
              selectedOption === item.id && styles.libraryChoiceOnPressed,
            ]}
            onPress={() => handleLibraryChoice(item.id)}>
            <Text style={styles.libraryChoicesTxt}>{item.option}</Text>
          </TouchableOpacity>
        )}
        horizontal={true}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={
          <View style={{ marginHorizontal: 5 }} />
        }
      />

      <FlatList
        data={listPlaylist}
        renderItem={({item}) => (
          <TouchableOpacity>
            <Image 
              source={{uri: 'http://' + ipAddress + ':3177' + item.playlistimg}}
              style = {styles.playlist_img}
            />
            <View style>
              <Text>{item.playlistname}</Text>
              <Text>playlist.{item.lenght}</Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    flexDirection: 'column',
    paddingHorizontal: 10
  },
  libraryChoicesBtn: {
    borderRadius: 15,
    borderColor: colors.iconPrimary,
    borderWidth: 2,
    paddingHorizontal: 15,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  libraryChoiceOnPressed: {
    backgroundColor: colors.emphasis,
    borderColor: colors.emphasis
  },
  libraryChoicesTxt: {
    color: colors.textPrimary,
    fontWeight: '600',
    fontSize: textSizes.xm
  },
  playlist_img: {
    height: 50,
    width: 50,
    borderRadius: 10
  }
})

export default Library