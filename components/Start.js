import React from 'react';
import { 
  StyleSheet, Text, View,
  TextInput, ImageBackground,
  TouchableOpacity, Button,
  KeyboardAvoidingView,
  Platform
        } from 'react-native';

//import the background image for the start screen
const image = source = require('../assets/BackgroundImage.png');

export default class Start extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      color: '#FFFFF',
      pressed: false
    };
  }
  render() {
    return (
      <ImageBackground source={image} style={styles.image}>
          <Text style={styles.appTitle}>Chatter</Text>
      <View style={styles.container}>
         <TextInput
          style={styles.nameInput}
          onChangeText={(name) => this.setState({name})}
          value={this.state.name}
          placeholder='Your Name'
        />
      <Text style={styles.backgroundColorText}>Choose Background Color:</Text>
      <View style={styles.colorInput}>
      <TouchableOpacity
        onPress={() => {this.setState({color: '#090C08', pressed: true})}}
        style={[styles.colorButton, styles.color1]} />
      <TouchableOpacity
        onPress={() => {this.setState({color: '#474056', pressed: true})}}
        style={[styles.colorButton, styles.color2]} />
      <TouchableOpacity
        onPress={() => {this.setState({color: '#8A95A5', pressed: true})}}
        style={[styles.colorButton, styles.color3]} />
      <TouchableOpacity
        onPress={() => {this.setState({color: '#B9C6AE', pressed: true})}}
        style={[styles.colorButton, styles.color4]} />
        </View>
        {/* The Button component cannot be styled properly,
         so instead we can use the TouchableOpacity component
         and make it function like a button.
         */}
      <TouchableOpacity
          style={styles.submitButton}
          onPress={() => this.props.navigation.navigate
            ('Chat', { name: this.state.name, color: this.state.color})}
        >
          <Text style={styles.submitButtonText}>Start Chatting</Text>
        </TouchableOpacity>
      </View>
      </ImageBackground>
    );
  }
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    height: '44%',
    width: '88%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 'auto',
    marginBottom: 22
  },
  appTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 45,
    fontWeight: '600',
    color: '#FFFFFF',
    marginTop: '20%'
  },
  image: {
    flex: 1
  },
  nameInput: {
    fontSize: 16,
    fontWeight: '300',
    color: '#757083',
    opacity: 0.5,
    borderColor: '#757083',
    borderWidth: 2,
    marginBottom: 25,
    marginTop: 25,
    marginLeft: 20,
    width: '88%',
    height: '20%'
  },
  submitButton: {
    backgroundColor: '#757083',
    alignItems: 'center',
    justifyContent: 'center',
    width: '88%',
    height: '20%',
    marginBottom: '5%',
    marginLeft: '6%'
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600'
  },
  backgroundColorText: {
    fontSize:16,
    fontWeight: '300',
    color: '#757083',
    opacity: 1,
    marginLeft: 15
  },
  colorButton: {
    height: 34,
    width: 34,
    borderRadius: 34/2,
    margin: 5
  },
  colorButtonStyleOnPressed: {
    borderColor: '#757083',
    borderWidth: 2
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
  },
  colorInput: {
    flexDirection: 'row',
    flex: 4,
    alignItems: 'flex-start',
    margin: 15
  }
});