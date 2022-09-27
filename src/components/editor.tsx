import React, { useEffect, useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  Button,
} from 'react-native';
import {
  actions,
  RichEditor,
  RichToolbar,
} from 'react-native-pell-rich-editor';
import * as FileSystem from 'expo-file-system';

export function Editor({ route, navigation }) {
  const [state, setState] = useState('');
  const richText = useRef();
  const id = useRef('');
  const { params } = route;
  useEffect(() => {
    if (params?.id) {
      id.current = params.id;
      readFile();
    }
  }, []);
  const readFile = async () => {
    const fileUri = `${FileSystem.documentDirectory}notes/${id.current}`;
    const fileContent = await FileSystem.readAsStringAsync(fileUri);
    setState(fileContent);
  };
  const save = async () => {
    const name = id.current ? id.current : `note-${Date.now()}.txt`;
    const fileUri = `${FileSystem.documentDirectory}notes/${name}`;
    await FileSystem.writeAsStringAsync(fileUri, state);
    navigation.goBack();
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
        >
          <RichToolbar
            editor={richText}
            actions={[
              actions.setBold,
              actions.setItalic,
              actions.setUnderline,
              actions.setStrikethrough,
              actions.insertOrderedList,
              actions.insertBulletsList,
              actions.outdent,
              actions.indent,
            ]}
          />
          <RichEditor
            editorStyle={{ backgroundColor: '#fff' }}
            initialContentHTML={state}
            ref={richText}
            onChange={setState}
          />
        </KeyboardAvoidingView>
        <Button onPress={save} title="Save"></Button>
      </ScrollView>
    </SafeAreaView>
  );
}
