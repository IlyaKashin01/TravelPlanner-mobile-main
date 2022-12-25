import { View, Text, Image, StyleSheet, TextInput, Pressable, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useAuth } from '../api/hooks/useAuth';
import { ISignUpRequest } from '../api/interfaces/auth';

const SignUp = () => {
    const navigation = useNavigation<StackNavigationProp<any>>();

    const { registration, isLoading, error, setError, clearError } = useAuth();


    const [data, setData] = useState<ISignUpRequest>(
        {} as ISignUpRequest
    );

    const [confirmPassword, setConfirmPassword] = useState('');

    const isPasswordConfirm = (): boolean => data.password === confirmPassword;

    const signUpHandler = async () => {
        clearError();

        if (!isPasswordConfirm()) {
            setError('Пароли не совпадают');
            return;
        }

        if (await registration(data)) navigation.navigate('Auth');
        else console.log(data, error);
    };

    useEffect(() => {
        clearError();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image source={require("../assets/images/traveling.jpg")} style={styles.image} resizeMode="cover"></Image>
            </View>
            <TextInput placeholder='Login' value={data.login} onChangeText={value => { setData({ ...data, login: value }) }} style={styles.input} />
            <TextInput placeholder='First name' autoCapitalize='words' value={data.firstName} onChangeText={value => setData({ ...data, firstName: value })} style={styles.input} />
            <TextInput placeholder='Second name' autoCapitalize='words' value={data.lastName} onChangeText={value => setData({ ...data, lastName: value })} style={styles.input} />
            <TextInput placeholder='Middle name' autoCapitalize='words' value={data.middleName} onChangeText={value => { setData({ ...data, middleName: value }) }} style={styles.input} />
            <TextInput placeholder='Password' secureTextEntry={true} value={data.password} onChangeText={value => { setData({ ...data, password: value }) }} style={styles.input} />
            <TextInput placeholder='Confirm password' secureTextEntry={true} value={confirmPassword} onChangeText={value => { setConfirmPassword(value) }} style={styles.input} />
            <TextInput placeholder='Phone' autoComplete='tel' value={data.phone} onChangeText={value => { setData({ ...data, phone: value }) }} style={styles.input} />
            <TextInput placeholder='Email' autoComplete='email' value={data.email} onChangeText={value => { setData({ ...data, email: value }) }} style={styles.input} />
            <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={signUpHandler}
            >
                <Text style={styles.textStyle}>Sign in</Text>
            </TouchableOpacity>
        </View>
    )
}

export default SignUp

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 25
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
        width: 100,
        height: 100,
        overflow: 'hidden'
    },
    image: {
        flex: 1,
        height: undefined,
        width: undefined
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
})