import React, { useState, useContext, useEffect, useRef } from 'react';
import { View, Dimensions } from 'react-native';
import { AudioContext } from '../context/AudioProvider';
import { RecyclerListView, LayoutProvider } from 'recyclerlistview';
import AudioListItem from '../components/AudioListItem';
import OptionModal from '../components/OptionModal';
import { Audio } from 'expo-av';
import { play, pause, resume, playNext } from '../misc/AudioController';

const AudioList = () => {
  const context = useContext(AudioContext);
  const [optionModalVisible, setOptionModalVisible] = useState(false);
  const [currentItem, setCurrentItem] = useState({});
  const [intervalCode, setIntervalCode] = useState(null)

  const layoutProvider = new LayoutProvider((i) => 'audio', (type, dim) => {
    switch (type) {
      case 'audio':
        dim.width = Dimensions.get('window').width;
        dim.height = 70;
        break;
      default:
        dim.width = 0;
        dim.height = 0;
    }
  });

  const startInterval = (playbackObj) => {
    setIntervalCode(
      setInterval(async () => {
        const playbackStatus = await playbackObj.getStatusAsync();
        if (playbackStatus.durationMillis - playbackStatus.positionMillis < 500) {
          console.log('stop now');
          clearInterval(intervalRef.current);
        }
        if (playbackStatus.isLoaded && playbackStatus.isPlaying && playbackStatus.positionMillis) {
          console.log(playbackStatus);
          context.updateState(context, {
            playbackPosition: playbackStatus.positionMillis,
            playbackDuration: playbackStatus.durationMillis,
          });
        }
        console.log("i'm running");
      }, 500)
    )
  };

  const handleAudioPress = async (audio) => {
    const { audioFiles, soundObj, playbackObj, currentAudio, updateState } = context;

    if (soundObj === null) { // no audio is playing now
      if(intervalCode) {
        clearInterval(intervalCode)
        setIntervalCode(null)
      }
      const newPlaybackObj = new Audio.Sound();
      const status = await play(newPlaybackObj, audio.uri);
      // const playbackObj = new Audio.Sound();
      // try {
      //   await playbackObj.loadAsync({ uri: 'http://192.168.137.1:3177/music/ThuyenQuyen.mp3' });
      //   await playbackObj.playAsync(); // Phát nhạc
      // } catch (error) {
      //   console.log(error);
      // }
      const index = audioFiles.indexOf(audio);

      updateState(context, {
        currentAudio: audio,
        playbackObj: newPlaybackObj,
        soundObj: status,
        isPlaying: true,
        currentAudioIndex: index,
      });
      return startInterval(newPlaybackObj);
    }

    // pause audio
    if (soundObj.isLoaded && soundObj.isPlaying && currentAudio.id === audio.id) {
      const status = await pause(playbackObj);
      updateState(context, { soundObj: status, isPlaying: false });
      if(intervalCode) {
        clearInterval(intervalCode)
        setIntervalCode(null)
      }
    }

    // resume audio
    if (soundObj.isLoaded && !soundObj.isPlaying && currentAudio.id === audio.id) {
      if(intervalCode) {
        clearInterval(intervalCode)
        setIntervalCode(null)
      }
      const status = await resume(playbackObj);
      updateState(context, { soundObj: status, isPlaying: true });
      return startInterval(playbackObj);
    }

    // select another audio
    if (soundObj.isLoaded && currentAudio.id !== audio.id) {
      if(intervalCode) {
        clearInterval(intervalCode)
        setIntervalCode(null)
      }
      const status = await playNext(playbackObj, audio.uri);
      const index = audioFiles.indexOf(audio);
      updateState(context, {
        currentAudio: audio,
        soundObj: status,
        isPlaying: true,
        currentAudioIndex: index,
      });
      return startInterval(playbackObj);
    }
  };

  const rowRenderer = (type, item, index, extendedState) => {
    return <AudioListItem
      title={item.filename}
      isPlaying={extendedState.isPlaying}
      activeListItem={context.currentAudioIndex === index}
      duration={item.duration}
      onOptionPress={() => {
        setCurrentItem(item);
        setOptionModalVisible(true);
      }}
      onAudioPress={() => handleAudioPress(item)}
    />
  };

  useEffect(() => {
    return () => {
      if(intervalCode) {
        clearInterval(intervalCode)
        setIntervalCode(null)
      }
    }; // Clean up interval on component unmount
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <RecyclerListView
        dataProvider={context.dataProvider}
        layoutProvider={layoutProvider}
        rowRenderer={rowRenderer}
        extendedState={{ isPlaying: context.isPlaying }}
      />
      <OptionModal
        currentItem={currentItem}
        visible={optionModalVisible}
        onClose={() => setOptionModalVisible(false)}
        onPlayPress={() => console.log('Playing')}
        onPlayListPress={() => console.log('Playlist')}
      />
    </View>
  );
};

export default AudioList;
