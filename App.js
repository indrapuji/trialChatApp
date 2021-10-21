import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {StreamChat} from 'stream-chat';
import {
  Channel,
  Chat,
  MessageInput,
  MessageList,
  OverlayProvider,
} from 'stream-chat-react-native';

const App = () => {
  const [channel, setChannel] = useState();

  const apiKey = 'yh5qu38spe65';
  const apiSecret =
    '67s733r8kbp99w7vavxph3pa73f838m5ww5bsjsr9p3jru794bjjsyucu2vmhvqr';
  const userId = '1';
  const serverClient = StreamChat.getInstance(apiKey);

  const connect = async () => {
    try {
      await serverClient.connectUser(
        {
          id: userId,
        },
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiMSJ9.HosHnVojMuZ5U4z5sbON5K1LcvF6sHQehp8Ne8oqp0c',
      );

      const chatChannel = serverClient.channel('messaging', 'testChannel', {
        name: 'testChannel',
      });
      console.log('====>', chatChannel);
      setChannel(chatChannel);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    connect();
  }, []);

  return (
    <OverlayProvider>
      <Chat client={serverClient}>
        <Channel channel={channel} keyboardVerticalOffset={0}>
          <View style={StyleSheet.absoluteFill}>
            <MessageList />
            <MessageInput />
          </View>
        </Channel>
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
