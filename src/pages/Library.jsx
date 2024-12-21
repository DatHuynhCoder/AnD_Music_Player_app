import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  Modal,
  Pressable
} from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import * as MediaLibrary from 'expo-media-library'
//constants
import { ipAddress } from '../constants/ipAddress'
import { colors } from '../constants/color'
import { iconSizes, textSizes } from '../constants/demensions'
//icon
import AntDesign from '@expo/vector-icons/AntDesign';
import { UserContext } from '../context/UserContext'
import { AudioContext } from '../context/NewAudioContextProvider'
import axios from 'axios'
import {
  useNavigation
} from '@react-navigation/native';

const Library = () => {
  const { userid, setUserid } = useContext(UserContext)
  const {setCurrentList} = useContext(AudioContext)
  const navigation = useNavigation();

  const getPermission = async () => {
    const permission = await MediaLibrary.getPermissionsAsync()
    console.log(permission);
  }
  const [selectedOption, setSelectedOption] = useState(''); // To track the selected library button
  const handleLibraryChoice = (optionId) => {
    setSelectedOption(optionId);
  }

  const [modalPlaylistVisible, setmodalPlaylistVisible] = useState(false);
  const [listPlaylist, setListPlaylist] = useState([]);

  const getPlaylist = async () => {
    console.log(userid);
    try {
      const response = await axios.get("http://" + ipAddress + ":3177" + "/get-playlist-by-userid?userid=" + userid)
      if (response.data.Status === 'Success') {
        console.log('Lay playlist thanh cong!');
        setListPlaylist(response.data.Result);
      }
      else {
        console.log('Lay playlist that bai')
      }
    } catch (error) {
      console.log('Khong the lay playlist ' + error)
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
      <View style={styles.selected_type_container}>
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
      </View>

      <TouchableOpacity style={styles.create_playlist_box}>
        <AntDesign name="plussquare" size={iconSizes.xxl} color={colors.emphasis} />
        <Text style={styles.create_playlist_txt}>Tạo playlist mới</Text>
      </TouchableOpacity>

      <View>
        <FlatList
          data={listPlaylist}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.playlist_item}
              onPress={() => {
                axios.get('http://' + ipAddress + ':3177/get-listsongs-by-playlistid?playlistid=' + item.playlistid).then(res => {
                  setCurrentList(res.data)
                  navigation.navigate('NewAudioPlay', { songColectionURL: 'http://' + ipAddress + ':3177' + item.playlistimg, songColectionName: item.playlistname })
                })
              }}
            >
              <Image
                source={{ uri: 'http://' + ipAddress + ':3177' + item.playlistimg }}
                style={styles.playlist_img}
              />
              <View style={styles.playlist_info}>
                <Text style={styles.playlist_name}>{item.playlistname}</Text>
                <Text style={styles.playlist_subinfo}>PLAYLIST.Number of songs: {item.numsongs}</Text>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={item => item.playlistid}
        />
      </View>

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
              <Text style={styles.modalText}>Hello World!</Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setmodalPlaylistVisible(!modalPlaylistVisible)}>
                <Text style={styles.textStyle}>Hide Modal</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
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
  selected_type_container: {
    marginVertical: 15
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
  create_playlist_box: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10
  },
  create_playlist_txt: {
    fontSize: textSizes.sm,
    color: colors.textPrimary,
    fontWeight: '700',
    marginLeft: 5
  },
  playlist_item: {
    flexDirection: 'row',
    marginVertical: 5
  },
  playlist_img: {
    height: 60,
    width: 60,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  playlist_info: {
    paddingLeft: 5,
    flex: 1,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  playlist_name: {
    fontSize: textSizes.xm,
    color: colors.textPrimary
  },
  playlist_subinfo: {
    fontSize: textSizes.xxm,
    color: colors.textSecondary
  }
})

export default Library