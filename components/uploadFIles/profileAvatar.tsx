import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import * as ImagePicker from 'expo-image-picker';
import Button from './button';
import ImageViewer from './imageViewer';
import { StatusBar } from 'expo-status-bar';
import axios, { AxiosError } from 'axios';
import { API_HOST } from '../../api/apiHost';
import { useAuth } from '../../api/hooks/useAuth';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { IOperationResult } from '../../api/interfaces/operationResult';



const PlaceholderImage = require('../../assets/images/281.jpg');

const ProfileAvatar = () => {
  const [selectedImage, setSelectedImage] = useState<string>(null);
  const [imageData, setImageData] = useState<{
    uri: string;
    name: string | null | undefined;
    type: string | undefined;
  } | null>(null);

  const [image, setImage] = useState<string>();
  const navigation = useNavigation<StackNavigationProp<any>>();
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      console.log(result.assets[0].type);
      setSelectedImage(result.assets[0].uri);
      setImage(result.assets[0].uri);
      setImageData({
        uri: result.assets[0].uri,
        name: result.assets[0].fileName,
        type: result.assets[0].type,
      });
    }
  };
  // const pickImageAsync = async () => {
  //   let result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.All,
  //     allowsEditing: true,
  //     quality: 1,
  //   });

  //   if (!result.canceled) {
  //     setSelectedImage(result);
  //     setImage({
  //       uri: result.assets[0].uri,
  //       type: result.assets[0].type,
  //       name: user.login,
  //     })
  //   } else {
  //     alert("You did not select any image.");
  //   }
  // };

  const { getToken, token, user } = useAuth();
  const uploadImage = async () => {
    getToken();
    console.log(token);
    const imageUri = `file://${selectedImage}`;

    const formData = new FormData();
    if (imageData) {
      formData.append("image", {
        uri: imageData.uri,
        name: 'test',
        type: 'image/jpeg',
      });
    }
    console.log(formData)
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .put<IOperationResult<any>>(
        `${API_HOST}person/addAvatar`,
        formData,
        config
      )
      .then((response) => {
        console.log(response.data);
        navigation.goBack()
      });

    // await axios.put(`${API_HOST}person/addAvatar`,
    //   formData,
    //   {
    //     headers: {
    //       'Content-Type': 'multipart/form-data',
    //       'Authorization': `Bearer ${token}`,
    //     }
    //   }).then(res => {
    //     console.log(res);
    //     console.log(res)
    //   })

    //if (data?.result === true) navigation.goBack();
  }
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer placeholderImageSource={PlaceholderImage} selectedImage={selectedImage} />
      </View>
      {selectedImage === null ?
        <View style={styles.footerContainer}>
          <Button theme="primary" label="Выбрать изображение" onPress={pickImage} />
          <Button theme={undefined} label="Использовать это изображение" onPress={uploadImage} />
        </View>
        :
        <View style={styles.footerContainer}>
          <Button theme={undefined} label="Выбрать изображение" onPress={pickImage} />
          <Button theme="primary" label="Использовать это изображение" onPress={uploadImage} />
        </View>
      }
      <StatusBar style="auto" />
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
    paddingTop: 58
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },
});
export default ProfileAvatar;