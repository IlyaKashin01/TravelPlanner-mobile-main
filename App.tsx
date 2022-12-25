import { StyleSheet, Text, View } from 'react-native';
import BottomNav from './components/navigation/bottomNav';
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/homeScreen';
import UserProfile from './screens/userProfile';
import Travels from './components/travel/travel';
import Profile from './screens/profile';
import ChatScreen from './screens/chatScreen';
import { AuthProvider } from './api/providers/AuthProvider';
import { useAuth } from './api/hooks/useAuth';
import SignIn from './screens/signIn';
import SignUp from './screens/signUp';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MenuProvider } from 'react-native-popup-menu';
import * as SecureStore from 'expo-secure-store';

export default function App() {
  const Stack = createNativeStackNavigator();
  const { user } = useAuth();
  const ref = useNavigationContainerRef();
  return (
    <SafeAreaView style={{ height: '100%' }}>
      <AuthProvider>
        <MenuProvider>
          <NavigationContainer ref={ref}>
            <Stack.Navigator>
              {SecureStore.getItemAsync('token') ? (
                <>
                  <Stack.Screen
                    name="Main"
                    component={BottomNav}
                    options={{ headerShown: false, }}
                  />

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
        </MenuProvider>
      </AuthProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
