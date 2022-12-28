import { View, Text, Image, StyleSheet, TextInput, Pressable } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useAuth } from '../api/hooks/useAuth';
import { IAuthRequest } from '../api/interfaces/auth';
import * as SecureStore from 'expo-secure-store';

const SignIn = () => {
    const navigation = useNavigation<StackNavigationProp<any>>();
    const { user } = useAuth();
    const { isLoading, login, error, clearError } = useAuth();

    const [data, setData] = useState<IAuthRequest>({
        login: '',
        password: '',
    });

    const signInHandler = () => {
        clearError();
        login(data);
        console.log(user);
        //navigation.navigate('Regist')
    };

    useEffect(() => {
        clearError();
    }, []);
    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image source={require("../assets/images/traveling.jpg")} style={styles.image} resizeMode="cover"></Image>
            </View>
            <TextInput placeholder='login' style={styles.input} value={data.login} onChangeText={value => { setData({ ...data, login: value }) }} />
            <TextInput placeholder='password' secureTextEntry={true} style={styles.input} value={data.password} onChangeText={value => { setData({ ...data, password: value }) }} />
            <View style={styles.buttonContainer}>
                <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => navigation.navigate('Regist')}
                >
                    <Text style={styles.textStyle}>Sign up</Text>
                </Pressable>
                <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={signInHandler}
                >
                    <Text style={styles.textStyle}>Sign in</Text>
                </Pressable>
            </View>
        </View>
    )
}

export default SignIn

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: "50%"
    },
    input: {
        backgroundColor: 'white',
        width: 300,
        padding: 10,
        borderRadius: 50,
        fontSize: 15,
        margin: 5
    },
    imageContainer: {
        height: 100,
        width: 100,
        bottom: 10
    },
    image: {
        flex: 1,
        height: undefined,
        width: undefined
    },
    buttonContainer: {
        flexDirection: 'row',
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        margin: 10,
        width: 100,
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 15
    },
})