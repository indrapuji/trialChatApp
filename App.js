import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {StreamChat} from 'stream-chat';
import {
  Channel,
  Chat,
  MessageInput,
  MessageList,
  OverlayProvider,
  Gallery,
} from 'stream-chat-react-native';

const App = () => {
  const [channel, setChannel] = useState();
  // const [imageTest, setImageTest] = useState([
  //   {
  //     file: {name: 'fallback-name.jpeg'},
  //     id: '2j3n4k23nj4k23n4k3',
  //     state: 'finished', // or 'uploading'
  //     url: 'https://cdn.getstream.io/kajsnkj2n3j4', // If the state is `uploading`, then this will be a local uri of image.
  //   },
  // ]);

  const apiKey = 'yh5qu38spe65';
  const apiSecret =
    '67s733r8kbp99w7vavxph3pa73f838m5ww5bsjsr9p3jru794bjjsyucu2vmhvqr';
  const userId = 'bob-1';
  const serverClient = StreamChat.getInstance(apiKey);

  const connect = async () => {
    try {
      await serverClient.connectUser(
        {
          id: userId,
        },
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiYm9iLTEifQ.tzQ2GhCQgMalFvzVUGuh0Xgss98mp4usSQiB55MunHY',
      );

      createAndWatchChannel();
      // const chatChannel = serverClient.channel('messaging', 'bob-and-jane', {
      //   name: 'bob-and-jane',
      // });
      // setChannel(chatChannel);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    connect();
  }, []);

  const createAndWatchChannel = async () => {
    const newChannel = serverClient.channel('messaging', 'bob-and-jane', {
      name: 'bob-and-jane',
    });

    await newChannel.watch();
    setChannel(newChannel);
  };

  return (
    <OverlayProvider>
      <Chat client={serverClient}>
        {channel ? (
          <Channel channel={channel} keyboardVerticalOffset={0}>
            <View style={StyleSheet.absoluteFill}>
              <MessageList />
              <MessageInput />
            </View>
          </Channel>
        ) : null}
      </Chat>
    </OverlayProvider>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
