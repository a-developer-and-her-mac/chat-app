/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import firebase from 'firebase';
import 'firebase/firestore';

export default class CustomActions extends React.Component {
  /**
   * requests permission to pick image from media library
   * @async
   * @function pickImage
   */
  pickImage = async () => {
    try {
      const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);

      if (status === 'granted') {
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
        }).catch((error) => console.error(error));

        if (!result.cancelled) {
          const imageUrl = await this.uploadImage(result.uri);
          this.props.onSend({ image: imageUrl });
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  }
  /**
   * requests permission to access devices camera to take photo
   * @async
   * @function takePhoto
   */

  takePhoto = async () => {
    try {
      const { status } = await Permissions.askAsync(Permissions.CAMERA, Permissions.MEDIA_LIBRARY);

      if (status === 'granted') {
        const result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
        }).catch((error) => console.error(error));

        if (!result.cancelled) {
          const imageUrl = await this.uploadImage(result.uri);
          this.props.onSend({ image: imageUrl });
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  }
  /**
   * requests permission to access device location
   * @async
   * @function getLocation
   */

  getLocation = async () => {
    try {
      const { status } = await Permissions.askAsync(Permissions.LOCATION);

      if (status === 'granted') {
        const result = await Location.getCurrentPositionAsync({});

        if (result) {
          this.props.onSend({
            location: {
              longitude: result.coords.longitude,
              latitude: result.coords.latitude,
            },
          });
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  }
  /**
   * converts image to blob to store in cloud
   * @async
   * @function
   * @param {string} uri
   * @return {string} uri
   */

  uploadImage = async (uri) => {
    try {
      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = () => {
          resolve(xhr.response);
        };
        xhr.onerror = (e) => {
          console.log(e);
          reject(new TypeError('Network request failed'));
        };
        xhr.responseType = 'blob';
        xhr.open('GET', uri, true);
        xhr.send(null);
      });

      const getImageName = uri.split('/');
      const imageArray = getImageName[getImageName.length - 1];
      const ref = firebase
        .storage()
        .ref()
        .child(`${imageArray}`);

      const snapshot = await ref.put(blob);
      blob.close();
      const imageURL = await snapshot.ref.getDownloadURL();
      console.log(imageURL);
      return imageURL;
    } catch (error) {
      console.log(error.message);
    }
  }
/**
 * returns actionsheet
 * @function onActionPress
 * @return {actionSheet}
 */

onActionPress = () => {
  const options = ['Choose From Library', 'Take Picture',
    'Send Location', 'Cancel'];

  const cancelButtonIndex = options.length - 1;
  this.context.actionSheet().showActionSheetWithOptions(
    {
      options,
      cancelButtonIndex,
    },
    async (buttonIndex) => {
      switch (buttonIndex) {
        case 0:
          return this.pickImage();
        case 1:
          return this.takePhoto();
        case 2:
          return this.getLocation();
        default:
      }
    },
  );
}

render() {
  return (
    <TouchableOpacity style={[styles.container]}
      accessible={true}
      accessibilityLabel="More options"
      accessibilityHint="Choose whether to send an image or your location."
      accessibilityRole="button"
      onPress={
        this.onActionPress
      }>
      <View style={[styles.wrapper, this.props.wrapperStyle]}>
        <Text style={[styles.iconText, this.props.iconTextStyle]}>
          +
        </Text>
      </View>
    </TouchableOpacity>
  );
}
}

const styles = StyleSheet.create({
  container: {
    width: 26,
    height: 26,
    marginLeft: 10,
    marginBottom: 10,
  },
  wrapper: {
    borderRadius: 13,
    borderColor: '#b2b2b2',
    borderWidth: 2,
    flex: 1,
  },
  iconText: {
    color: '#b2b2b2',
    fontWeight: 'bold',
    fontSize: 16,
    backgroundColor: 'transparent',
    textAlign: 'center',
  },
});

CustomActions.contextTypes = {
  actionSheet: PropTypes.func,
};
/* eslint-disable eol-last */