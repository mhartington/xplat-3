import { Button, View, FlatList } from 'react-native';
import { useCallback, useLayoutEffect, useState } from 'react';

import { ListItem, Button as RNEButton } from '@rneui/themed';
import * as FileSystem from 'expo-file-system';
import { useFocusEffect } from '@react-navigation/native';

export function Home({ navigation }) {
  const [files, setFiles] = useState([]);

  useFocusEffect(
    useCallback(() => {
      initFS();
    }, [])
  );

  const initFS = async () => {
    await makeDir();
    await readDir();
  };
  const makeDir = async () => {
    const { exists } = await FileSystem.getInfoAsync(
      FileSystem.documentDirectory + 'notes/'
    );
    if (!exists) {
      await FileSystem.makeDirectoryAsync(
        FileSystem.documentDirectory + 'notes/'
      );
    }
    return;
  };
  const readDir = async () => {
    const res: string[] = await FileSystem.readDirectoryAsync(
      FileSystem.documentDirectory + 'notes/'
    );
    const sortedFiles = res.sort(
      (a: string, b: string) =>
        parseInt(b.replace(/note-/, '').replace(/.txt/, '')) -
        parseInt(a.replace(/note-/, '').replace(/.txt/, ''))
    );
    setFiles(sortedFiles);
  };
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button onPress={() => navigation.navigate('Details')} title="Add" />
      ),
    });
  }, [navigation]);
  const deleteNote = async (note: string) => {
    const fileUri = `${FileSystem.documentDirectory}notes/${note}`;
    await FileSystem.deleteAsync(fileUri);
    await readDir();
  };

  const keyExtractor = (_item: string, index: number) => index.toString();
  const renderItem = ({ item }) => (
    <ListItem.Swipeable
      bottomDivider
      onPress={() => navigation.navigate('Details', { id: item })}
      rightContent={(reset) => (
        <RNEButton
          title="Delete"
          onPress={async () => {
            await deleteNote(item);
            reset();
          }}
          icon={{ name: 'delete', color: 'white' }}
          buttonStyle={{ minHeight: '100%', backgroundColor: 'red' }}
        />
      )}
    >
      <ListItem.Content>
        <ListItem.Title>{item}</ListItem.Title>
      </ListItem.Content>
      <ListItem.Chevron />
    </ListItem.Swipeable>
  );
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={files}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
      ></FlatList>
    </View>
  );
}
