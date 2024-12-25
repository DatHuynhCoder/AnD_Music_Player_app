import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  Modal,
  Pressable,
  Alert,
  TextInput,
  ScrollView,
  ActivityIndicator
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
import { DefaultPlaylistImg } from '../../assets/img/AnD_logo.png'
import SongCard2 from '../components/SongCard2'
import {
  useNavigation
} from '@react-navigation/native';

const Library = () => {
  const { currentList } = useContext(AudioContext)
  const { userid, setUserid } = useContext(UserContext)
  const { setCurrentList } = useContext(AudioContext)
  const [rerender, setRerender] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const navigation = useNavigation();

  const getPermission = async () => {
    const permission = await MediaLibrary.getPermissionsAsync()
    console.log(permission);
  }
  const [selectedOption, setSelectedOption] = useState(1); // To track the selected library button
  const handleLibraryChoice = (optionId) => {
    setSelectedOption(optionId);
  }

  const [modalPlaylistVisible, setmodalPlaylistVisible] = useState(false);
  const [listPlaylist, setListPlaylist] = useState([]);
  const [playlistName, setPlaylistName] = useState('');

  const getPlaylist = async () => {
    console.log(userid);
    try {
      const response = await axios.get("http://" + ipAddress + ":3177" + "/get-playlist-by-userid?userid=" + userid)
      if (response.data.Status === 'Success') {
        console.log('Lay playlist thanh cong!', response.data.Result);
        setListPlaylist(response.data.Result);
        setIsLoaded(true)
      }
      else {
        console.log('Lay playlist that bai')
      }
    } catch (error) {
      console.log('Khong the lay playlist ' + error)
    }
  }
  
  async function getAuthorFollowed() {
    await axios.get('http://' + ipAddress + ':3177/get-all-followed-author-by-userid?userid=' + userid).then(res => {
      if(res.data.Status === 'Success') {
        console.log('followed author: ', res.data.Result)
      }
      else {
        console.log(res.data.Error)
      }
    })
  }

  const handleCreatePlaylist = (playlistName) => {
    if (playlistName === '') {
      Alert.alert('Please enter playlist name!')
    }
    else {
      const info = {
        playlistname: playlistName,
        userid: userid
      }
      const createNewPlaylist = async () => {
        setIsLoaded(false)
        try {
          const response = await axios.post('http://' + ipAddress + ':3177/add-new-playlist', info);
          if (response.data.Status === 'Success') {
            Alert.alert('Create playlist successfully!');
            setmodalPlaylistVisible(!modalPlaylistVisible);
            setIsLoaded(true)
          }
          else {
            Alert.alert(response.data.Error);
          }
        }
        catch (error) {
          console.log('Loi trong qua trinh tao playlist')
        }
      }
      createNewPlaylist();
      setRerender(!rerender);
    }
  }

  useEffect(() => {
    getPermission()
    if(selectedOption === 1) {
      getPlaylist()
    }
    if(selectedOption === 2) {
      getAuthorFollowed()
    }
  }, [rerender, selectedOption])

  const libraryOptionsData = [
    {
      id: 1,
      option: 'Playlist',
    },
    {
      id: 2,
      option: 'Authors',
    },
  ]

  return (
    <>
      {
        isLoaded === false
        ?
        <View>
          <ActivityIndicator size={'large'}></ActivityIndicator>
        </View>
        :
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
          <>
            {
              selectedOption === 1
              ?
              <>
                <TouchableOpacity
                  style={styles.create_playlist_box}
                  onPress={() => setmodalPlaylistVisible(true)}
                >
                  <AntDesign name="plussquare" size={iconSizes.xxl} color={colors.emphasis} />
                  <Text style={styles.create_playlist_txt}>Create new playlist</Text>
                </TouchableOpacity>

                <View>
                  <FlatList
                    data={listPlaylist}
                    renderItem={({ item }) => (
                      <TouchableOpacity style={styles.playlist_item}
                        onPress={() => {
                          axios.get('http://' + ipAddress + ':3177/get-listsongs-by-playlistid?playlistid=' + item.playlistid).then(res => {
                            setCurrentList(res.data)
                            navigation.navigate('NewAudioPlay', {
                              songColectionURL: 'http://' + ipAddress + ':3177' + item.playlistimg,
                              songColectionName: item.playlistname
                            })
                          })
                        }}
                      >
                        <Image
                          source={item.playlistimg !== '' ? { uri: 'http://' + ipAddress + ':3177' + item.playlistimg } : { uri: 'http://' + ipAddress + ':3177/image/album/defaultplaylist.png' }}
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

                      <AntDesign
                        style={{ alignSelf: 'flex-end' }}
                        name="close"
                        size={iconSizes.lg}
                        color="black"
                        onPress={() => setmodalPlaylistVisible(!modalPlaylistVisible)}
                      />
                      <Text style={styles.modalText}>New playlist name</Text>
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
              </>
              :
              <>
                <View>
                  <Text>Hello</Text>
                </View>
              </>
            }
            
          </>
        </View>
      }
    </>
    
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
    marginBottom: 15,
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
})

export default Library