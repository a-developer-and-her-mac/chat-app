import React from 'react';
import { View, Text, KeyboardAvoidingView, Platform, Image } from 'react-native';
import { GiftedChat, InputToolbar } from 'react-native-gifted-chat';
import AsyncStorage from '@react-native-community/async-storage';
import NetInfo from '@react-native-community/netinfo';
import MapView from 'react-native-maps';
import CustomActions from './CustomActions';

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
      loggedInText: '',
      isConnected: false,
      image: null,
      location: null
    };
  if (!firebase.apps.length){
    const firebaseConfig = {
      apiKey: "AIzaSyBYB311y2BiDldzNHL6AGQm7mnTduHiCPg",
      authDomain: "chat-app-75128.firebaseapp.com",
      projectId: "chat-app-75128",
      storageBucket: "chat-app-75128.appspot.com",
      messagingSenderId: "648001538141",
      appId: "1:648001538141:web:f531c861188aa9029b25b4",
      measurementId: "G-BLG5GP44MV"
    };
    firebase.initializeApp(firebaseConfig);
    }
    this.referenceMessages = firebase.firestore().collection('messages');
}

componentDidMount() {
  NetInfo.fetch().then(state => {
    if (state.isConnected) {
      this.authUnsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
        if (!user) {
          await firebase.auth().signInAnonymously();
        }
        //Update user state with currently active user data
        this.setState({
          isConnected: true,
          user: {
            _id: user.uid,
            name: this.props.route.params.name,
            avatar: 'https://placeimg.com/140/140/any'
          },
          loggedInText: `${this.props.route.params.name} has entered the chat`,
          messages: []
        });
        this.unsubscribe = this.referenceMessages.onSnapshot(this.onCollectionUpdate)
      });
    } else {
      this.setState({
        isConnected: false
      });
      this.getMessages();
    }
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
    this.saveMessages();
   }
  );
}

addMessage() {
  const message = this.state.messages[0];
  this.referenceMessages.add({
    _id: message._id,
    text: message.text || '',
    createdAt: message.createdAt,
    user: message.user,
    image: message.image || null,
    location: message.location || null
  });
  console.log(message);
}

async getMessages() {
  let messages = '';
  try {
    messages = await AsyncStorage.getItem('messages') || [];
    this.setState({
      messages: JSON.parse(messages)
    });
  } catch (error) {
    console.log(error.message);
  }
}

async saveMessages() {
  try {
    await AsyncStorage.setItem('messages', JSON.stringify(this.state.messages));
  } catch (error) {
    console.log(error.message);
  }
}

async deleteMessages() {
  try {
    await AsyncStorage.removeItem('messsages');
    this.setState({
      messages: []
    });
} catch (error) {
  console.log(error.message);
  }
}

onCollectionUpdate = (querySnapshot) => {
  const messages = [];
  querySnapshot.forEach((doc) => {
    let data = doc.data();
    messages.push({
      _id: data._id,
      text: data.text,
      createdAt: data.createdAt.toDate(),
      user: {
        _id: data.user._id,
        name: data.user.name,
        avatar: data.user.avatar
      },
      image: data.image || '',
      location: data.location || ''
    });
  });
  this.setState({
    messages,
  });
}

renderInputToolbar(props) {
  if (this.state.isConnected == false) {
  } else {
    return(
      <InputToolbar
      {...props}
      />
    );
  }
}

renderCustomView(props) {
  const { currentMessage } = props;

  if(currentMessage.location){
    return (
      <View>
      <MapView
        style={{width: 150,
          height: 100,
          borderRadius: 13,
          margin: 3}}
        region={{
          latitude: currentMessage.location.latitude,
          longitude: currentMessage.location.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}
      />
      </View>
    );
  }
  return null;
}

renderCustomActions = (props) => {
  return <CustomActions {...props} />;
}

  render() {
    //Sets name variable/screen title to be name from previous screen
    //Not working properly, causes a warning.
    let name = this.props.route.params.name;
    this.props.navigation.setOptions({ title: name });
    

    return (
      <View style={{flex: 1, backgroundColor: this.props.route.params.color}}>
        <Text style={{textAlign: 'center', marginTop: 10}}>{this.state.loggedInText}</Text>
        {this.state.image &&
          <Image source={{ uri: this.state.image.uri }}
           style={{ width: 200, height: 200 }} />}
        <GiftedChat
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        user={this.state.user}
        renderInputToolbar={this.renderInputToolbar.bind(this)}
        renderActions={this.renderCustomActions}
        renderCustomView={this.renderCustomView}
        image={this.state.image}
        />
        { Platform.OS === 'android' ?
         <KeyboardAvoidingView behavior="height" /> : null
        }
        </View>
    )
  }
}