import React from 'react';
import { View, Text, KeyboardAvoidingView, Platform } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';

export default class Chat extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: [],
    };
}

componentDidMount() {
  this.setState({
    messages: [
      {
        _id: 1,
        text: '"In some ways, programming is like painting. You start with a blank canvas and certain basic raw materials. You use a combination of science, art, and craft to determine what to do with them." - Andrew Hunt',
        createdAt: new Date(),
        user: {
          _id: 2, 
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
      {
        _id: 2,
        text: this.props.route.params.name + ' has entered the chat',
        createdAt: new Date(),
        system: true,
      },
    ],
  })
}

onSend( messages = [] ) {
  this.setState(previousState => ({
    messages: GiftedChat.append(previousState.messages,
      messages),
  }))
}

  render() {
    //Sets name variable/screen title to be name from previous screen
    //Not working properly, causes a warning.
    let name = this.props.route.params.name;
    this.props.navigation.setOptions({ title: name });
    

    return (
      <View style={{flex: 1, backgroundColor: this.props.route.params.color}}>
        <GiftedChat
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        user={{
          _id: 1
        }}
        />
        { Platform.OS === 'android' ?
         <KeyboardAvoidingView behavior="height" /> : null
        }
        </View>
    )
  }
}