import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  FlatList
} from 'react-native'
import React, { useState } from 'react'
//constants
import { colors } from '../constants/color'
import { textSizes } from '../constants/demensions';
import SongCard2 from '../components/SongCard2';
import AuthorCard from '../components/AuthorCard';

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

  return (
    <View style={styles.container}>
      <TextInput
        placeholder='Enter songs or artists...'
        value={searchQuery}
        style={styles.searchBar}
        onChangeText={(queryData) => handleSearch(queryData)}
      />

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

      {/* Man hinh goi y cua trang */}
      

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
    paddingHorizontal: 10
  },
  searchBar: {
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    marginVertical: 15
  },
  HeaderTxt: {
    fontSize: textSizes.sm,
    color: colors.textPrimary,
    fontWeight: '600',
    marginVertical: 15
  }
})

export default ExplorePage