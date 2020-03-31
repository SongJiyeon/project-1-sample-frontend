import React, { useEffect } from 'react';
import { StyleSheet, View, Button, Image } from 'react-native';

import axios from 'axios';

import Constants from 'expo-constants';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

export default function GetImage({ photo, setPhoto }) {

  useEffect(() => {
    getPermissionAsync();
  }, []);

  const onPress = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.1
    });

    console.log(result);

    if (!result.cancelled) {
      setPhoto(result);
    }
  };

  const createFormData = (photo, body) => {
    const data = new FormData();

    photo.type = 'image/jpeg';
  
    data.append("photo", photo);
  
    Object.keys(body).forEach(key => {
      data.append(key, body[key]);
    });
  
    return data;
  };

  const handleUpload = () => {
    // fetch("http://localhost:3000/api/upload", {
    //   method: "POST",
    //   body: createFormData(photo, { userId: "123" }),
    //   headers: {
    //     'Content-Type': 'multipart/form-data; charset=utf-8'
    //   }
    // })
    axios({
      method: 'post',
      url: 'http://192.168.0.136:3000/api/upload',
      data: createFormData(photo, { userId: "123" }),
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(response => {
      console.log("upload success", response);
      alert("Upload success!");
      setPhoto({});
    })
    .catch(error => {
      console.log(error.status)
      console.log(JSON.stringify(error))
      console.log("upload error", error);
      alert("Upload failed!");
    });
  };

  const getPermissionAsync = async () => {
    if (Constants.platform.android) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  }

  return (
    <View style={styles.container}>
      {photo.uri && (
        <React.Fragment>
          <Image
            source={{ uri: photo.uri }}
            style={{ width: 300, height: 300 }}
          />
          <Button title="Upload" onPress={handleUpload} />
        </React.Fragment>
      )}
      <Button
        title="Pick an image from camera roll"
        onPress={onPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
