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
import * as ImagePicker from 'expo-image-picker';
//constants
import { ipAddress } from '../constants/ipAddress'
import { colors } from '../constants/color'
import { iconSizes, textSizes } from '../constants/demensions'
import Default_Avatar from '../../assets/img/UserAvatarDefault.png'
//icon
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { UserContext } from '../context/UserContext'
import { AudioContext } from '../context/NewAudioContextProvider'
import axios from 'axios'
import { DefaultPlaylistImg } from '../../assets/img/AnD_logo.png'
import SongCard2 from '../components/SongCard2'
import AuthorCard2 from '../components/AuthorCard2';
import AnDLogo from '../../assets/img/AnD_logo.png';
import Entypo from '@expo/vector-icons/Entypo';
import {
  useNavigation
} from '@react-navigation/native';

const Library = () => {
  const { currentList } = useContext(AudioContext)
  const {
    userid,
    setUserid,
    username,
    setUsername,
    useravatar,
    setUseravatar,
    setRerenderCxt,
    rerenderCxt
  } = useContext(UserContext)
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

  const [listPlaylist, setListPlaylist] = useState([]);
  const [playlistName, setPlaylistName] = useState('');
  const [listAuthorFollowed, setListAuthorFollowed] = useState([]);

  const [modalPlaylistVisible, setmodalPlaylistVisible] = useState(false);
  const [showModalUsername, setShowModalUsername] = useState(false);
  const [showModalUpandDel, setShowModalUpandDel] = useState(false);
  const [modalPlaylistid, setModalPlaylistid] = useState(1);
  const [modalPlaylistname, setModalPlaylistname] = useState('');

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
      if (res.data.Status === 'Success') {
        console.log('followed author: ', res.data.Result);
        setListAuthorFollowed(res.data.Result);
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
      setRerenderCxt(!rerenderCxt);
    }
  }

  //Image picker
  const pickAvatar = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
      base64: true
    });

    if (!result.canceled) {
      const formData = new FormData();
      formData.append('avatar', {
        uri: result.assets[0].uri,
        type: 'image/png',
        name: 'image.png',
        fileName: 'image'
      })

      try {
        const response = await axios.post('http://' + ipAddress + ':3177/upload-avatar', formData,
          { headers: { 'Content-Type': 'multipart/form-data' } })
        setUseravatar(response.data.useravatar);
        console.log(response.data.useravatar)
        changeUseravatar(response.data.useravatar);
      } catch (error) {
        console.log('Error uploading avatar to backend:', error)
      }
    }
  };

  const changeUseravatar = async (newUserAvatar) => {
    try {
      const info = {
        userid: userid,
        useravatar: newUserAvatar
      }
      const response = await axios.put('http://' + ipAddress + ':3177/update-useravatar', info);
      Alert.alert('Update username successfully');
    } catch (error) {
      console.log('Cannot update user: ', error);
    }
  }

  const handleUpdateUserName = () => {
    const changeUsername = async () => {
      try {
        const info = {
          userid: userid,
          username: username
        }
        const response = await axios.put('http://' + ipAddress + ':3177/update-username', info);
        Alert.alert('Update username successfully');
        setShowModalUsername(!showModalUsername);
      } catch (error) {
        console.log('Cannot update user: ', error);
      }
    }
    changeUsername();
  }

  const handleUpdatePlaylist = () => {
    const changePlaylistname = async () => {
      try {
        const info = {
          playlistid: modalPlaylistid,
          playlistname: modalPlaylistname
        }
        const response = await axios.put('http://' + ipAddress + ':3177/update-playlistname', info);
        Alert.alert('Update playlistname successfully');
        setShowModalUpandDel(!showModalUpandDel);
      } catch (error) {
        console.log('Cannot update Playlist: ', error);
      }
    }
    changePlaylistname();
  }

  const handleDeletePlaylist = () => {
    const deletePlaylist = async () => {
      try {
        const response = await axios.delete('http://' + ipAddress + ':3177/delete-playlist-by-id?playlistid=' + modalPlaylistid);
        Alert.alert('Delete playlist successfully');
        setShowModalUpandDel(!showModalUpandDel);
      } catch (error) {
        console.log('Cannot delete playlist: ', error);
      }
    }
    deletePlaylist();
    setRerender(!rerender);
    setRerenderCxt(!rerenderCxt);
  }



  useEffect(() => {
    getPermission()
    if (selectedOption === 1) {
      getPlaylist()
    }
    if (selectedOption === 2) {
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
      {/* username modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showModalUsername}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setShowModalUsername(!showModalUsername);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>

            <AntDesign
              style={{ alignSelf: 'flex-end' }}
              name="close"
              size={iconSizes.lg}
              color="black"
              onPress={() => setShowModalUsername(!showModalUsername)}
            />
            <Text style={styles.modalText}>New Username</Text>
            <TextInput
              placeholder='Enter new username'
              value={username}
              onChangeText={(txt) => setUsername(txt)}
              style={styles.enter_username}
            />
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => handleUpdateUserName()}>
              <Text style={styles.textStyle}>Update</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      {
        isLoaded === false
          ?
          <View>
            <ActivityIndicator size={'large'}></ActivityIndicator>
          </View>
          :
          <View style={styles.container}>
            <View style={{ marginTop: 16, flexDirection: 'row', alignItems: 'center', gap: 10 }}>
              <Image
                source={AnDLogo}
                style={{ height: iconSizes.xl, width: iconSizes.xl }}
              />
              <Text style={{
                color: colors.emphasis,
                fontSize: textSizes.lg,
                elevation: 3,
                textShadowColor: colors.emphasis,
                textShadowOffset: { width: 1, height: 1 },
                textShadowRadius: 4, fontWeight: '500'
              }}>Library</Text>
            </View>

            {/* Useravatar and name */}
            <View style={styles.user_container}>
              <View>
                <Image
                  source={useravatar !== '' ? { uri: 'http://' + ipAddress + ':3177' + useravatar } : Default_Avatar}
                  style={{ width: 125, height: 125, borderRadius: 125 }}
                />

                <TouchableOpacity onPress={() => pickAvatar()} style={styles.avatar_picker}>
                  <AntDesign
                    name='camerao'
                    size={30}
                  />
                </TouchableOpacity>
              </View>
              <Text style={styles.user_txt}>{username}
                <AntDesign
                  name='edit'
                  size={iconSizes.sm}
                  onPress={() => setShowModalUsername(!showModalUsername)}
                />
              </Text>

              <TouchableOpacity onPress={() => navigation.navigate('LoginAccount')} style={{flexDirection:'row', justifyContent: 'center', gap: 7, backgroundColor:'#ab0d0a', padding: 5, borderRadius: 15}}>
                <AntDesign name="logout" size={24} color="white" />
                <Text style={{color: colors.textPrimary, fontWeight: 'bold'}}>Log out</Text>
              </TouchableOpacity>
            </View>

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


                    <FlatList
                      data={listPlaylist}
                      renderItem={({ item }) => (
                        <TouchableOpacity style={styles.playlist_item}
                          onPress={() => {
                            axios.get('http://' + ipAddress + ':3177/get-listsongs-by-playlistid?playlistid=' + item.playlistid).then(res => {
                              setCurrentList(res.data);
                              if (item.playlistimg !== '') {
                                navigation.navigate('NewAudioPlay', { songColectionURL: 'http://' + ipAddress + ':3177' + item.playlistimg, songColectionName: item.playlistname })
                              }
                              else {
                                navigation.navigate('NewAudioPlay', { songColectionURL: 'http://' + ipAddress + ':3177/image/album/defaultplaylist.png', songColectionName: item.playlistname })
                              }
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

                          {item.playlistname !== 'Favourite' &&
                            <TouchableOpacity
                              onPress={() => {
                                setModalPlaylistid(item.playlistid);
                                setModalPlaylistname(item.playlistname);
                                setShowModalUpandDel(true);
                              }}
                              style={{ alignSelf: 'center',flex: 2, textAlign:'right'}}>
                              <Entypo name="dots-three-vertical" size={24} color={colors.iconPrimary} />
                            </TouchableOpacity>
                          }
                        </TouchableOpacity>
                      )}
                      keyExtractor={item => item.playlistid}
                      ListFooterComponent={() => <View style={{ height: 120 }}></View>}
                    />

                    {/* update and delete playlist */}
                    <Modal
                      animationType="slide"
                      transparent={true}
                      visible={showModalUpandDel}
                      onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                        setShowModalUpandDel(!showModalUpandDel);
                      }}>
                      <View style={styles.centeredView}>
                        <View style={styles.modalView}>

                          <AntDesign
                            style={{ alignSelf: 'flex-end' }}
                            name="close"
                            size={iconSizes.lg}
                            color="black"
                            onPress={() => setShowModalUpandDel(!showModalUpandDel)}
                          />
                          <Text style={styles.modalText}>Update playlist name</Text>
                          <TextInput
                            placeholder='Enter playlist name'
                            value={modalPlaylistname}
                            onChangeText={(txt) => setModalPlaylistname(txt)}
                            style={styles.enter_playlist}
                          />
                          <View style={{ flexDirection: 'row', gap: 20 }}>
                            <Pressable
                              style={[styles.button, styles.buttonDelete]}
                              onPress={() => handleDeletePlaylist()}>
                              <Text style={styles.textStyle}>or Delete</Text>
                              <FontAwesome6 name="trash-can" size={20} color="white" />
                            </Pressable>

                            <Pressable
                              style={[styles.button, styles.buttonClose]}
                              onPress={() => handleUpdatePlaylist()}>
                              <Text style={styles.textStyle}>Update</Text>
                            </Pressable>
                          </View>
                        </View>
                      </View>
                    </Modal>

                    {/* Create playlist modal */}
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
                    <FlatList
                      data={listAuthorFollowed}
                      renderItem={({ item, index }) =>
                        <AuthorCard2
                          key={index}
                          authorId={item.authorid}
                          authorName={item.authorname}
                          authorDescription={item.aboutauthor}
                          authorURL={item.authoravatar}
                        />
                      }
                      keyExtractor={(item, index) => index.toString()}
                      ItemSeparatorComponent={
                        <View style={{ marginVertical: 10 }} />
                      }
                      ListFooterComponent={() => <View style={{ height: 120 }}></View>}
                    />
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
  user_container: {
    marginVertical: 10,
    flexDirection: 'column',
    alignItems: 'center',
    gap: 10
  },
  avatar_picker: {
    width: 40,
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 35,
    padding: 5,
    position: 'absolute',
    bottom: 0,
    right: 0
  },
  user_txt: {
    color: colors.textPrimary,
    fontSize: textSizes.md,
    fontWeight: '600'
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
    marginVertical: 5,
  },
  playlist_img: {
    height: 60,
    width: 60,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  playlist_info: {
    paddingLeft: 5,
    flex: 5,
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
  buttonDelete: {
    backgroundColor: '#ab0d0a',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10
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
  },
  enter_username: {
    borderWidth: 2,
    borderRadius: 15,
    borderColor: colors.emphasis,
    margin: 10,
    minWidth: 130
  }
})

export default Library