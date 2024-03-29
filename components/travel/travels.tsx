import { StyleSheet, View, Pressable, ScrollView, FlatList, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native'
import React from 'react'
import { Tab, TabView, Text } from '@rneui/themed';
import { Ionicons } from '@expo/vector-icons';
import Travel from './travel';
import { useTravel } from '../../api/hooks/useTravel';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import ModalCreateTravel from './modalCreateTravel';
import * as SecureStore from 'expo-secure-store';
import { useService } from '../../api/hooks/useService';
import { useAuth } from '../../api/hooks/useAuth';


const { width, height } = Dimensions.get('screen')

const Travels = () => {
    const navigation = useNavigation<StackNavigationProp<any>>();

    const [take, setTake] = React.useState(5);
    const [skip, setSkip] = React.useState(0);
    const [modalVisible, setModalVisible] = React.useState(false);

    const { travel, travels, isLoading, getTravels, clearError, error } = useTravel()
    const { user } = useAuth();

    React.useEffect(() => {
        clearError();
        getTravels(skip, take, user.id);
    }, [])

    async function getMoreTravels() {
        getTravels(skip, take, user.id);
        setTake(take + take);
    }
    const renderItem = ({ item }) => (
        <Travel id={item.id} name={item.name} description={item.description} dateE={item.dateEnd} dateS={item.dateStart} expectedCost={item.expectedCost} actualCost={item.actualCost} projectedCost={item.projectedCost} />
    );

    return (
        <View>
            {/* <SearchBar
                platform="default"
                containerStyle={{ backgroundColor: "white" }}
                inputContainerStyle={{ borderRadius: 50, backgroundColor: "#2196F3" }}
                leftIconContainerStyle={{}}
                rightIconContainerStyle={{}}
                loadingProps={{}}
                lightTheme
                onChangeText={newVal => setValue(newVal)}
                //onClearText={() => console.log(onClearText())}
                placeholder="Текст для поиска..."
                placeholderTextColor="white"
                //cancelButtonTitle="Cancel"
                //cancelButtonProps={{}}
                //onCancel={() => console.log(onCancel())}
                value={value}
            /> */}
            <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => navigation.navigate('CreateTravel')}
            >
                <Ionicons name="add" size={24} color="white" />
                <Text style={styles.textStyle}>Create travel</Text>
            </Pressable>
            {isLoading ?
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', top: 15 }}>
                    <ActivityIndicator size="large" color="blue" />
                </View>
                :
                <View>
                    <FlatList style={{ marginBottom: 125 }}
                        data={travels}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                        showsVerticalScrollIndicator={false}
                        onScroll={getMoreTravels}
                    />
                    {error && <Text style={{ color: "red" }}>{error}</Text>}
                </View>
            }
            {modalVisible &&
                <ModalCreateTravel />
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {

        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',

    },
    text: {
        color: "#52575D",
        fontSize: 28
    },
    button: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 25,
        padding: 10,
        elevation: 2,
        margin: 10,
        marginBottom: 0,
        width: 150,
        height: "auto",
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
    },
});
export default Travels

