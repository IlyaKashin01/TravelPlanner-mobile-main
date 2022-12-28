import { StyleSheet, Text, View } from 'react-native';
import { AuthProvider } from './api/providers/AuthProvider';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MenuProvider } from 'react-native-popup-menu';
import TravelProvider from './api/providers/TravelProvider';
import Navigation from './components/navigation/navigation';

export default function App() {
  return (
    <SafeAreaView style={{ height: '100%' }}>
      <AuthProvider>
        <TravelProvider>
          <MenuProvider>
            <Navigation />
          </MenuProvider>
        </TravelProvider>
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
