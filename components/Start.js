import React from 'react';
import { StyleSheet, Text, View, TextInput, ImageBackground, TouchableOpacity, Button } from 'react-native';

const image = source = require('../assets/BackgroundImage.png');

export default class Start extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      color: '#FFFFF'
    };
  }
  render() {
    return (
      <ImageBackground source={image} style={styles.image}>
        <View>
          <Text style={styles.appTitle}>Chatico</Text>
        </View>
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
        onPress={() => this.setState({color: '#090C08'})}
        style={[styles.colorButton, styles.color1]} />
      <TouchableOpacity
        onPress={() => this.setState({color: '#474056'})}
        style={[styles.colorButton, styles.color2]} />
      <TouchableOpacity
        onPress={() => this.setState({color: '#8A95A5'})}
        style={[styles.colorButton, styles.color3]} />
      <TouchableOpacity
        onPress={() => this.setState({color: '#B9C6AE'})}
        style={[styles.colorButton, styles.color4]} />
        </View>
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
    backgroundColor: '#FFFFFF',
    height: '44%',
    width: '88%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 'auto',
    marginBottom: 22
  },
  appTitle: {
    textAlign: 'center',
    fontSize: 45,
    fontWeight: '600',
    color: '#FFFFFF',
    marginTop: '20%',
  },
  image: {
    flex: 1
  },
  nameInput: {
    fontSize: 16,
    fontWeight: '300',
    color: '#757083',
    opacity: 0.5
  },
  submitButton: {
    backgroundColor: '#757083',
    alignItems: 'center',
    justifyContent: 'center',
    width: '88%',
    height: '18%',
    marginBottom: '5%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '45%'
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
    opacity: 1
  },
  colorButton: {
    height: 30,
    width: 30,
    borderRadius: 30/2,
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
    flexDirection: 'row'
  }
});