'use strict';
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions
} from 'react-native';
import {GiftedChat, Actions, Bubble} from 'react-native-gifted-chat';
import CustomChatView from './CustomChatView';


class ChatContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      loadEarlier: true,
      typingText: "...",
      isLoadingEarlier: false,
    };
    this._isMounted = false;
    this.onSend = this.onSend.bind(this);
    this.onReceive = this.onReceive.bind(this);
    //this.renderCustomActions = this.renderCustomActions.bind(this);
    //this.renderBubble = this.renderBubble.bind(this);
    this.renderFooter = this.renderFooter.bind(this);
    //this.onLoadEarlier = this.onLoadEarlier.bind(this);

    this._isAlright = null;
  }

  onSend(messages = []) {
    this.setState((previousState) => {
      return {
        messages: GiftedChat.append(previousState.messages, messages),
      };
    });

    // for demo purpose
    this.answerDemo(messages);
  }

  answerDemo(messages) {
    if (messages.length > 0) {
      if ((messages[0].image || messages[0].location) || !this._isAlright) {
        this.setState((previousState) => {
          return {
            typingText: 'Chris is typing'
          };
        });
      }
    }
  }

 onReceive(text) {
    this.setState((previousState) => {
      return {
        messages: GiftedChat.append(previousState.messages, {
          _id: Math.round(Math.random() * 1000000),
          text: text,
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'Testing',
            // avatar: 'https://facebook.github.io/react/img/logo_og.png',
          },
        }),
      };
    });
  }
  
  componentWillMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Hello ODAV HWK x',
          createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
          user: {
            _id: 2,
            name: 'Testing',
            avatar: 'https://facebook.github.io/react/img/logo_og.png',
          },
        },
        {
          _id: 2,
          text: 'Hello from Chris ODAV http://www.odav.de',
          createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
          user: {
            _id: 3,
            name: 'Chris',
            avatar: 'https://facebook.github.io/react/img/logo_og.png',
          },
        },
        {
          _id: 3,
          text: 'I am here now :-)',
          createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
          user: {
            _id: 3,
            name: 'Chris',
            avatar: 'https://facebook.github.io/react/img/logo_og.png',
          },
          location: {
            latitude: 48.864601,
            longitude: 2.398704
          },
        },
      ],
    });
  }
  onSend(messages = []) {
    this.setState((previousState) => {
      return {
        messages: GiftedChat.append(previousState.messages, messages),
      };
    });
  }

renderCustomView(props) {
  return (
    <CustomChatView
      {...props}
    />
  );
}

  renderFooter(props) {
    if (this.state.typingText) {
      return (
        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>
            {this.state.typingText}
          </Text>
        </View>
      );
    }
    return null;
  }

  render() {
    return (
          <Image style={{
            height: Dimensions.get('window').height-110,
          }}>
          <GiftedChat
            messages={this.state.messages}
            onSend={this.onSend}
            user={{
              _id: 1,
            }}
            renderCustomView={this.renderCustomView}
            renderFooter={this.renderFooter}
          />
        </Image>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop:20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  footerContainer: {
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  footerText: {
    fontSize: 14,
    color: '#aaa',
  },
});

module.exports = ChatContainer;
