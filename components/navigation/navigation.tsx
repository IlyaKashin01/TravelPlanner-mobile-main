import React, { FC } from 'react'
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
import * as SecureStore from 'expo-secure-store';
import TravelDetails from '../travel/TravelDetails';
import CreateCoordinates from '../coordinates/CreateCoordinates';
import CoordinatesList from '../coordinates/CoordinatesList';
import CreateService from '../service/CreateService';
import ServicesList from '../service/ServicesList';

const Navigation: FC = () => {
    const Stack = createNativeStackNavigator();
    const { user } = useAuth(); console.log(user)
    const ref = useNavigationContainerRef();
    return (
        <NavigationContainer ref={ref} >
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
                        <Stack.Screen name="travelInfo" component={TravelDetails} />
                        <Stack.Screen name="addCoordinates" component={CreateCoordinates} />
                        <Stack.Screen name="showCoordinates" component={CoordinatesList} />
                        <Stack.Screen name="createService" component={CreateService} />
                        <Stack.Screen name="listServices" component={ServicesList} />
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