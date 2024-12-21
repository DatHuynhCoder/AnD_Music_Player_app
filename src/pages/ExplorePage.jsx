import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  FlatList
} from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
import { useRoute } from '@react-navigation/native';
//constants
import { colors } from '../constants/color'
import { textSizes } from '../constants/demensions';
import { ipAddress } from '../constants/ipAddress.js';
//components
import SongCard2 from '../components/SongCard2';
import AuthorCard from '../components/AuthorCard';
import AreaCard from '../components/AreaCard';
import AlbumCard from '../components/AlbumCard';
import albumURL from '../../assets/img/TheFatRat.jpg'
//icons
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import axios from 'axios';
import { AudioContext } from '../context/NewAudioContextProvider.jsx';

const ExplorePage = () => {
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
  const musicArea = [
    {
      id: 1,
      musicType: 'Electronic&Dance',
      areaName: 'US-UK',
      areaURL: require('../../assets/img/edm.png')
    },
    {
      id: 2,
      musicType: 'Nhạc đỏ',
      areaName: 'Việt Nam',
      areaURL: require('../../assets/img/edm.png')
    },
    {
      id: 3,
      musicType: 'Traditional music',
      areaName: 'China',
      areaURL: require('../../assets/img/edm.png')
    },
    {
      id: 4,
      musicType: 'K-POP',
      areaName: 'Korea',
      areaURL: require('../../assets/img/edm.png')
    },
    {
      id: 5,
      musicType: 'Country',
      areaName: 'US-UK',
      areaURL: require('../../assets/img/edm.png')
    },
    {
      id: 6,
      musicType: 'RAP&Underground',
      areaName: 'US-UK',
      areaURL: require('../../assets/img/edm.png')
    },
  ]

  const [albumData, setAlbumData] = useState([
    {
      albumid: 1,
      albumname: 'PARALLAX',
      albumimg: '',
      authorname: 'TheFatRat'
    },
    {
      albumid: 1,
      albumname: 'PARALLAX',
      albumimg: '',
      authorname: 'TheFatRat'
    },
    {
      albumid: 1,
      albumname: 'PARALLAX',
      albumimg: '',
      authorname: 'TheFatRat'
    },
    {
      albumid: 1,
      albumname: 'PARALLAX',
      albumimg: '',
      authorname: 'TheFatRat'
    },
    {
      albumid: 1,
      albumname: 'PARALLAX',
      albumimg: '',
      authorname: 'TheFatRat'
    },
  ])
  const route = useRoute();

  const [authorData, setAuthorData] = useState([]);
  const [musicData, setMusicData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredSongs, setFilteredSongs] = useState([]); //Chứa các bài hát theo tên bài hát và tác giả và thể loại
  const [filteredAuthor, setFilteredAuthor] = useState([]); // Chứa tên tác giả

  const handleSearch = (queryData) => {
    setSearchQuery(queryData);
    const tempfilteredSongs = musicData.filter(item =>
      item.songname.toLowerCase().includes(queryData.toLowerCase()) ||
      item.authorname.toLowerCase().includes(queryData.toLowerCase()) ||
      item.genrename.toLowerCase().includes(queryData.toLowerCase())
    )
    const tempfilterAuthors = authorData.filter(item =>
      item.authorname.toLowerCase().includes(queryData.toLowerCase())
    )
    setFilteredSongs(tempfilteredSongs);
    setFilteredAuthor(tempfilterAuthors);
  }

  useEffect(() => {
    axios.get('http://' + ipAddress + ':3177/get-top-albums').then(res => {
      setAlbumData(res.data)
    })

    const getAllSongsWithAuthorAndGenre = async () => {
      try {
        const response = await axios.get('http://' + ipAddress + ':3177/get-all-songs-with-author-and-genre');
        if (response.data) {
          setMusicData(response.data)
        }
        else {
          console.log('Lay bai hat that bai');
        }
      } catch (error) {
        console.log('Khong the lay bai hat: ' + error)
      }
    }

    const getAllAuthor = async () => {
      try {
        const response = await axios.get('http://' + ipAddress + ':3177/get-all-author');
        if (response.data) {
          setAuthorData(response.data)
        }
        else {
          console.log('Lay nhac si that bai');
        }
      } catch (error) {
        console.log('Khong the lay nhac si: ' + error)
      }
    }

    getAllAuthor();
    getAllSongsWithAuthorAndGenre();
    if (route.params?.genrename) {
      setSearchQuery(route.params.genrename);
      handleSearch(route.params.genrename);
    }
  }, [route.params])

  return (
    <View style={styles.container}>
      <ScrollView nestedScrollEnabled={true}>
        <View style={styles.searchContainer}>
          <MaterialIcons name="search" size={20} color="#888" style={styles.searchIcon} />
          <TextInput
            placeholder='Enter songs or artists...'
            value={searchQuery}
            style={styles.searchBar}
            onChangeText={(queryData) => handleSearch(queryData)}
          />
        </View>

        {/* Author list */}
        {filteredAuthor.length > 0 && searchQuery !== '' &&
          <View>
            <FlatList
              nestedScrollEnabled
              ListHeaderComponent={(
                <View>
                  <Text style={styles.HeaderTxt}>Authors</Text>
                </View>
              )}
              data={filteredAuthor}
              renderItem={({ item, index }) =>
                <AuthorCard
                  key={index}
                  authorId={item.authorid}
                  authorName={item.authorname}
                  authorURL={item.authoravatar}
                  musicData={musicData}
                />
              }
              keyExtractor={(item, index) => index.toString()}
              ItemSeparatorComponent={
                <View style={{ marginVertical: 10 }} />
              }
            />
          </View>
        }

        {/* Song list */}
        {filteredSongs.length > 0 && searchQuery !== '' &&
          <View>
            <FlatList
              nestedScrollEnabled
              ListHeaderComponent={(
                <View>
                  <Text style={styles.HeaderTxt}>Songs</Text>
                </View>
              )}
              data={filteredSongs}
              renderItem={({ item, index }) =>
                <SongCard2
                  key={index}
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
              }
              keyExtractor={(item, index) => index.toString()}
              ItemSeparatorComponent={
                <View style={{ marginVertical: 10 }} />
              }
            />
          </View>
        }

        {/* Khong tim thay ket qua */}
        {filteredAuthor.length === 0 && filteredSongs.length === 0 && searchQuery !== '' &&
          <View style={styles.noResultContainer}>
            <MaterialIcons
              name='search-off'
              color={colors.iconPrimary}
              size={60}
            />
            <Text style={styles.noResultTxt}>No result for <Text style={styles.noResultTxtEnter}>{searchQuery}</Text></Text>
            <Text style={styles.noResultSubTxt}>Try different keywords</Text>
          </View>
        }

        {/* Man hinh goi y cua trang */}
        {
          searchQuery === '' &&
          <View>
            <FlatList
              nestedScrollEnabled
              data={musicArea}
              ListHeaderComponent={(
                <View>
                  <Text style={styles.HeaderTxt}>Recommend for you</Text>
                </View>
              )}
              numColumns={2}
              renderItem={({ item, index }) => (
                <AreaCard
                  areaName={item.areaName}
                  areaURL={item.areaURL}
                  musicType={item.musicType}
                />
              )}
              columnWrapperStyle={{ justifyContent: 'space-between' }}
              ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
              keyExtractor={(item, index) => index.toString()}
            />
            {/* Top Albums */}
            <Text style={styles.HeaderTxt}>Top Albums</Text>
            <FlatList
              nestedScrollEnabled
              data={albumData}
              horizontal={true}
              ItemSeparatorComponent={
                <View style={{ marginHorizontal: 10 }}></View>
              }
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <AlbumCard
                  key={item.albumid}
                  albumURL={'http://' + ipAddress + ':3177' + item.albumimg}
                  albumId={item.albumid}
                  albumAuthor={item.authorname}
                  albumName={item.albumname}
                />
              )}
            />
          </View>
        }
        <View style={{ height: 125 }}></View>
      </ScrollView>
    </View>
  )
}
// const ExplorePage = () => {
//   const musicArea = [
//     {
//       id: 1,
//       musicType: 'Electronic&Dance',
//       areaName: 'US-UK',
//       areaURL: require('../../assets/img/edm.png')
//     },
//     {
//       id: 2,
//       musicType: 'Nhạc đỏ',
//       areaName: 'Việt Nam',
//       areaURL: require('../../assets/img/edm.png')
//     },
//     {
//       id: 3,
//       musicType: 'Traditional music',
//       areaName: 'China',
//       areaURL: require('../../assets/img/edm.png')
//     },
//     {
//       id: 4,
//       musicType: 'K-POP',
//       areaName: 'Korea',
//       areaURL: require('../../assets/img/edm.png')
//     },
//     {
//       id: 5,
//       musicType: 'Country',
//       areaName: 'US-UK',
//       areaURL: require('../../assets/img/edm.png')
//     },
//     {
//       id: 6,
//       musicType: 'RAP&Underground',
//       areaName: 'US-UK',
//       areaURL: require('../../assets/img/edm.png')
//     },
//   ]
//   const [albumData, setAlbumData] = useState([
//     {
//       albumid: 1,
//       albumname: 'PARALLAX',
//       albumimg: '',
//       authorname: 'TheFatRat'
//     },
//     {
//       albumid: 1,
//       albumname: 'PARALLAX',
//       albumimg: '',
//       authorname: 'TheFatRat'
//     },
//     {
//       albumid: 1,
//       albumname: 'PARALLAX',
//       albumimg: '',
//       authorname: 'TheFatRat'
//     },
//     {
//       albumid: 1,
//       albumname: 'PARALLAX',
//       albumimg: '',
//       authorname: 'TheFatRat'
//     },
//     {
//       albumid: 1,
//       albumname: 'PARALLAX',
//       albumimg: '',
//       authorname: 'TheFatRat'
//     },
//   ])
//   const [authorData,setAuthorData] = useState([]);
//   const [musicData,setMusicData] = useState([]);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [filteredSongs, setFilteredSongs] = useState([]); //Chứa các bài hát theo tên bài hát và tác giả
//   const [filteredAuthor, setFilteredAuthor] = useState([]); // Chứa tên tác giả

//   const handleSearch = (queryData) => {
//     setSearchQuery(queryData);
//     const tempfilteredSongs = musicData.filter(item =>
//       item.songname.toLowerCase().includes(queryData.toLowerCase()) ||
//       item.authorname.toLowerCase().includes(queryData.toLowerCase())
//     )
//     const tempfilterAuthors = authorData.filter(item =>
//       item.authorname.toLowerCase().includes(queryData.toLowerCase())
//     )
//     setFilteredSongs(tempfilteredSongs);
//     setFilteredAuthor(tempfilterAuthors);
//   }
//   useEffect(() => {
//     axios.get('http://' + ipAddress + ':3177/get-top-albums').then(res => {
//       setAlbumData(res.data)
//     })

//     const getAllSongsWithAuthorAndGenre = async () => {
//       try {
//         const response = await axios.get('http://' + ipAddress + ':3177/get-all-songs-with-author-and-genre');
//         if(response.data){
//           setMusicData(response.data)
//         }
//         else {
//           console.log('Lay bai hat that bai');
//         }
//       } catch (error) {
//         console.log('Khong the lay bai hat: ' + error)
//       }
//     }

//     const getAllAuthor = async () => {
//       try {
//         const response = await axios.get('http://' + ipAddress + ':3177/get-all-author');
//         if(response.data){
//           setAuthorData(response.data)
//         }
//         else {
//           console.log('Lay nhac si that bai');
//         }
//       } catch (error) {
//         console.log('Khong the lay nhac si: ' + error)
//       }
//     }

//     getAllAuthor();
//     getAllSongsWithAuthorAndGenre();
//   }, [])

//   return (
//     <View style={styles.container}>
//       {/* <ScrollView nestedScrollEnabled={true}> */}
//       <View>
//         <View style={styles.searchContainer}>
//           <MaterialIcons name="search" size={20} color="#888" style={styles.searchIcon} />
//           <TextInput
//             placeholder='Enter songs or artists...'
//             value={searchQuery}
//             style={styles.searchBar}
//             onChangeText={(queryData) => handleSearch(queryData)}
//           />
//         </View>
//         <ScrollView>
//         {
//           filteredAuthor.length > 0 && searchQuery !== '' ?
//           filteredAuthor.map((item, index) => {
//             return <AuthorCard
//               key={item.authorid}
//               authorName={item.authorname}
//               authorURL={item.authoravatar}
//               musicData={musicData}
//             />}
//           )
//           :
//           <View></View>
//         }
//         </ScrollView>

//       </View>
//     </View>
//   )
// }
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
    paddingHorizontal: 10
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 10,
    marginVertical: 15,
  },
  searchIcon: {
    marginRight: 5,
  },
  searchBar: {
    flex: 1,
    paddingVertical: 5,
  },
  HeaderTxt: {
    fontSize: textSizes.sm,
    color: colors.textPrimary,
    fontWeight: '600',
    marginVertical: 15
  },
  // No result style
  noResultContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noResultTxt: {
    color: colors.textPrimary,
    fontSize: textSizes.sm
  },
  noResultTxtEnter: {
    fontWeight: 'bold'
  },
  noResultSubTxt: {
    color: colors.textSecondary,
    fontSize: textSizes.xm
  }
})

export default ExplorePage