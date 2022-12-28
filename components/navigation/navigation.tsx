import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import BottomNav from './bottomNav';
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../../screens/homeScreen';
import UserProfile from '../../screens/userProfile';
import Travels from '../travel/travels';
import Profile from '../../screens/profile';
import ChatScreen from '../../screens/chatScreen';
import { useAuth } from '../../api/hooks/useAuth';
import SignIn from '../../screens/signIn';
import SignUp from '../../screens/signUp';
import ModalCreateTravel from '../travel/modalCreateTravel';

const Navigation = () => {
    const Stack = createNativeStackNavigator();
    const { user } = useAuth();
    const ref = useNavigationContainerRef();
    return (
        <NavigationContainer ref={ref}>
            <Stack.Navigator>
                {user ? (
                    <>
                        <Stack.Screen
                            name="Main"
                            component={BottomNav}
                            options={{ headerShown: false, }}
                        />

                        <Stack.Screen name="CreateTravel" component={ModalCreateTravel} />
                        <Stack.Screen name="Account" component={Profile} />
                        <Stack.Screen name="Chat" component={ChatScreen} />
                    </>
                ) :
                    (
                        <>
                            <Stack.Screen name="Auth" component={SignIn} />
                            <Stack.Screen name="Regist" component={SignUp} />
                        </>
                    )}
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigation