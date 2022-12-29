import { StyleSheet, View, Pressable, ScrollView, FlatList, TouchableOpacity, Dimensions } from 'react-native'
import React from 'react'
import { Tab, TabView, Text } from '@rneui/themed';
import { Ionicons } from '@expo/vector-icons';
import { useTravel } from '../../api/hooks/useTravel';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import * as SecureStore from 'expo-secure-store';
import { useService } from '../../api/hooks/useService';



const ServicesList = () => {
    const navigation = useNavigation<StackNavigationProp<any>>();

    const [take, setTake] = React.useState(5);
    const [skip, setSkip] = React.useState(0);
    const [searchValue] = React.useState(1);

    const { getServices, services } = useService()

    React.useEffect(() => {
        getServices(skip, take, searchValue);
    }, [])

    async function getMoreServices() {
        getServices(skip, take, searchValue);
        setTake(take + take);
    }
    const renderItem = ({ item }) => (
        <View style={[styles.container, { backgroundColor: "white", borderRadius: 25, margin: 10 }]} key={item.id}>
            <Text style={styles.text}>{item.name}</Text>
            <View >
                <Text style={{ fontSize: 18 }}>{item.description}</Text>
            </View>

            <View>
                <Text style={{ fontSize: 18, alignItems: "center", justifyContent: "center" }}>{item.cost}</Text>
            </View>
        </View>
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
            {!services ?
                <View><Text>Error get journeys </Text></View>
                :
                <View>
                    <FlatList style={{ marginBottom: 125 }}
                        data={services}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                        showsVerticalScrollIndicator={false}
                        onScroll={getMoreServices}
                    />
                </View>
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
export default ServicesList

