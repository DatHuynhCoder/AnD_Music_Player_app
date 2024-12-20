import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  FlatList
} from 'react-native'
import React, { use, useState, useEffect } from 'react'
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

const ExplorePage = () => {
  const musicData = [
    {
      id: 1,
      musicName: 'Let Love Win',
      musicAuthor: 'TheFatRat',
      musicURL: require('../../assets/img/temp_playlist_pic.jpg')
    },
    {
      id: 2,
      musicName: 'Blood, Sweet & Tear',
      musicAuthor: 'Riot games',
      musicURL: require('../../assets/img/temp_playlist_pic.jpg')
    },
    {
      id: 3,
      musicName: 'The Legend',
      musicAuthor: 'TobyFox',
      musicURL: require('../../assets/img/temp_playlist_pic.jpg')
    },
    {
      id: 4,
      musicName: 'Mang tiền về cho mẹ',
      musicAuthor: 'Đen Vâu',
      musicURL: require('../../assets/img/temp_playlist_pic.jpg')
    },
    {
      id: 5,
      musicName: 'Superheroes',
      musicAuthor: 'The Scripts',
      musicURL: require('../../assets/img/temp_playlist_pic.jpg')
    },
    {
      id: 6,
      musicName: 'Memory reboot',
      musicAuthor: 'Narvent',
      musicURL: require('../../assets/img/temp_playlist_pic.jpg')
    },
    {
      id: 7,
      musicName: '7 Years',
      musicAuthor: 'Lukas graham',
      musicURL: require('../../assets/img/temp_playlist_pic.jpg')
    },
    {
      id: 8,
      musicName: 'Beautiful now',
      musicAuthor: 'Zedd',
      musicURL: require('../../assets/img/temp_playlist_pic.jpg')
    },
    {
      id: 9,
      musicName: 'ĐAM MÊ | Double2T x Cao Thanh Thảo My ft Thảo Đan (Prod. HảiMa) - Official Music Video',
      musicAuthor: 'Gia đình lớn',
      musicURL: require('../../assets/img/temp_playlist_pic.jpg')
    },
    {
      id: 10,
      musicName: 'Dandadan openning',
      musicAuthor: 'The Creepy nuts',
      musicURL: require('../../assets/img/temp_playlist_pic.jpg')
    },
    {
      id: 11,
      musicName: 'Waiting for love',
      musicAuthor: 'Acvicii',
      musicURL: require('../../assets/img/temp_playlist_pic.jpg')
    },
    {
      id: 12,
      musicName: 'Rises',
      musicAuthor: 'Riot games',
      musicURL: require('../../assets/img/temp_playlist_pic.jpg')
    },
  ];

  const authorData = [
    {
      id: 1,
      authorName: 'Riot games',
      authorURL: require('../../assets/img/temp_playlist_pic.jpg')
    },
    {
      id: 2,
      authorName: 'TheFatRat',
      authorURL: require('../../assets/img/temp_playlist_pic.jpg')
    },
    {
      id: 3,
      authorName: 'TobyFox',
      authorURL: require('../../assets/img/temp_playlist_pic.jpg')
    },
    {
      id: 4,
      authorName: 'Đen Vâu',
      authorURL: require('../../assets/img/temp_playlist_pic.jpg')
    },
    {
      id: 5,
      authorName: 'The Scripts',
      authorURL: require('../../assets/img/temp_playlist_pic.jpg')
    },
    {
      id: 6,
      authorName: 'Narvent',
      authorURL: require('../../assets/img/temp_playlist_pic.jpg')
    },
    {
      id: 7,
      authorName: 'Lukas graham',
      authorURL: require('../../assets/img/temp_playlist_pic.jpg')
    },
    {
      id: 8,
      authorName: 'Zedd',
      authorURL: require('../../assets/img/temp_playlist_pic.jpg')
    },
    {
      id: 9,
      authorName: 'Gia đình lớn',
      authorURL: require('../../assets/img/temp_playlist_pic.jpg')
    },
    {
      id: 10,
      authorName: 'The Creepy nuts',
      authorURL: require('../../assets/img/temp_playlist_pic.jpg')
    },
    {
      id: 11,
      authorName: 'Acvicii',
      authorURL: require('../../assets/img/temp_playlist_pic.jpg')
    },
  ]

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

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredSongs, setFilteredSongs] = useState([]); //Chứa các bài hát theo tên bài hát và tác giả
  const [filteredAuthor, setFilteredAuthor] = useState([]); // Chứa tên tác giả

  const handleSearch = (queryData) => {
    setSearchQuery(queryData);
    const tempfilteredSongs = musicData.filter(item =>
      item.musicName.toLowerCase().includes(queryData.toLowerCase()) ||
      item.musicAuthor.toLowerCase().includes(queryData.toLowerCase())
    )
    const tempfilterAuthors = authorData.filter(item =>
      item.authorName.toLowerCase().includes(queryData.toLowerCase())
    )
    setFilteredSongs(tempfilteredSongs);
    setFilteredAuthor(tempfilterAuthors);
  }

  useEffect(() => {
    axios.get('http://' + ipAddress + ':3177/get-top-albums').then(res => {
      setAlbumData(res.data)
    })
  }, [])

  return (
    <View style={styles.container}>
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
        <FlatList
          ListHeaderComponent={(
            <View>
              <Text style={styles.HeaderTxt}>Authors</Text>
            </View>
          )}
          data={filteredAuthor}
          renderItem={({ item }) =>
            <AuthorCard
              key={item.id}
              authorName={item.authorName}
              authorURL={item.authorURL}
            />
          }
          ItemSeparatorComponent={
            <View style={{ marginVertical: 10 }} />
          }
        />
      }

      {/* Song list */}
      {filteredSongs.length > 0 && searchQuery !== '' &&
        <FlatList
          ListHeaderComponent={(
            <View>
              <Text style={styles.HeaderTxt}>Songs</Text>
            </View>
          )}
          data={filteredSongs}
          renderItem={({ item }) =>
            <SongCard2
              key={item.id}
              musicName={item.musicName}
              musicURL={item.musicURL}
              musicAuthor={item.musicAuthor}
            />
          }
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={
            <View style={{ marginVertical: 10 }} />
          }
        />
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
            data={musicArea}
            ListHeaderComponent={(
              <View>
                <Text style={styles.HeaderTxt}>Recommend for you</Text>
              </View>
            )}
            numColumns={2}
            renderItem={({ item }) => (
              <AreaCard
                key={item.id}
                areaName={item.areaName}
                areaURL={item.areaURL}
                musicType={item.musicType}
              />
            )}
            columnWrapperStyle={{ justifyContent: 'space-between' }}
            ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
            keyExtractor={(item) => item.id.toString()}
          />
          {/* Top Albums */}
          <Text style={styles.HeaderTxt}>Top Albums</Text>
          <FlatList
            data={albumData}
            horizontal={true}
            ItemSeparatorComponent={
              <View style={{ marginHorizontal: 10 }}></View>
            }
            keyExtractor={(item) => item.id}
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
    </View>
  )
}

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