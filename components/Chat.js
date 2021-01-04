import React from 'react';
import { View, Text, KeyboardAvoidingView, Platform } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';

const firebase = require('firebase');
require('firebase/firestore');

export default class Chat extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      user: {
        _id: '',
        name: '',
        avatar: ''
      },
      loggedInText: ''
    };
    const firebaseConfig = {
      apiKey: "AIzaSyBYB311y2BiDldzNHL6AGQm7mnTduHiCPg",
      authDomain: "chat-app-75128.firebaseapp.com",
      projectId: "chat-app-75128",
      storageBucket: "chat-app-75128.appspot.com",
      messagingSenderId: "648001538141",
      appId: "1:648001538141:web:f531c861188aa9029b25b4",
      measurementId: "G-BLG5GP44MV"
    };
  if (!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
    }
    this.referenceMessages = firebase.firestore().collection('messages');
}

componentDidMount() {
  this.authUnsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
    if (!user) {
      await firebase.auth().signInAnonymously();
    }
    //Update user state with currently active user data
    this.setState({
      user: {
        _id: user.uid,
        name: this.props.route.params.name,
        avatar: 'https://placeimg.com/140/140/any'
      },
      loggedInText: `${this.props.route.params.name} has entered the chat`,
      messages: []
    });
  });
  this.referenceMessages = firebase.firestore().collection('messages');
}

 componentWillUnmount() {
   this.unsubscribe();
   this.authUnsubscribe();
}

onSend( messages = [] ) {
  this.setState(previousState => ({
    messages: GiftedChat.append(previousState.messages,
      messages),
  }),
  () => {
    this.addMessage();
   }
  );
}

addMessage() {
  this.referenceMessages.add({
    _id: '',
    text: '',
    createdAt: new Date(),
    user: uid
  });
}

onCollectionUpdate = (querySnapshot) => {
  const messages = [];
  querySnapshot.forEach((doc) => {
    let data = doc.data();
    messages.push({
      _id: data._id,
      text: data.text.toString(),
      createdAt: data.createdAt.toDate(),
      user: {
        _id: data.user._id,
        name: data.user.name,
        avatar: data.user.avatar
      },
    });
  });
  this.setState({
    messages,
  });
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