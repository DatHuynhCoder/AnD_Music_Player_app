import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList
} from 'react-native'
import React, { useEffect, useState } from 'react'
import * as MediaLibrary from 'expo-media-library'
//constants
import { colors } from '../constants/color'
import { textSizes } from '../constants/demensions'

const Library = () => {
  const getPermission = async () => {
    const permission = await MediaLibrary.getPermissionsAsync()
    console.log(permission);
  }

  useEffect(() => {
    getPermission()
  }, [])

  const [selectedOption, setSelectedOption] = useState(''); // To track the selected library button
  const handleLibraryChoice = (optionId) => {
    setSelectedOption(optionId);
  }

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
  }
})

export default Library