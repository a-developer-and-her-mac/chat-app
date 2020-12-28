import React from 'react';
import { StyleSheet, Text, View, TextInput, ImageBackground, Pressable } from 'react-native';

const image = source = require('../assets/BackgroundImage.png');

export default class Start extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: ''
    };
  }
  render() {
    return (
      <ImageBackground source={image} style={styles.image}>
        <View style={styles.title}>
          <h1>Chatico</h1>
        </View>
      <View style={styles.container}>
         <View style={styles.nameInput}>
         <TextInput
          onChangeUserName={(userName) => this.setState({userName})}
          value={this.state.userName}
          placeholder='Your Name'
        />
      </View>
      <Text style={styles.text}>Choose Background Color:</Text>
      <Pressable style={styles.colorButton, styles.color1} />
      <Pressable style={styles.colorButton, styles.color2} />
      <Pressable style={styles.colorButton, styles.color3} />
      <Pressable style={styles.colorButton, styles.color4} />
      <View style={styles.button}>
      <Button
          onPress={() => this.props.navigation.navigate('Chat', { userName: this.state.userName })}
          title='Start Chatting'
        />
      </View>
      </View>
      </ImageBackground>
    );
  }
  }

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    height: '44%',
    width: '88%'
  },
  nameInput: {
    fontSize: 16,
    fontWeight: 300,
    color: '#75708350',

  },
  image: {
    flex: 100
  },
  button: {
    backgroundColor: '#757083',
    fontSize: 16,
    fontWeight: 600,
    color: '#FFFFFF',

  },
  title: {
    justifyContent: center,
    fontSize: 45,
    fontWeight: 600,
    color: '#FFFFFF'
  },
  text: {
    fontSize:16,
    fontWeight: 300,
    color: '#757083100'
  },
  colorButton: {
    height: 30,
    width: 30,
    borderRadius: 30/2
  },
  color1: {
    backgroundColor: '#090C08'
  },
  color2: {
    backgroundColor: '#474056'
  },
  color3: {
    backgroundColor: '#8A95A5'
  },
  color4: {
    backgroundColor: '#B9C6AE'
  }
});