import { StyleSheet, View, Pressable, ScrollView, FlatList, TouchableOpacity, Dimensions } from 'react-native'
import React from 'react'
import { SearchBar } from '@rneui/base';
import { Tab, TabView, Text } from '@rneui/themed';
import { Ionicons } from '@expo/vector-icons';
import Travel from './travel';

const { width, height } = Dimensions.get('screen')
const DATA = [
    {
        name: 'Крым',
        description: 'Путешествие всей семьей в Крым',
        dateE: '24.12.2022',
        dateS: '01.01.2023'
    },
    {
        name: 'Крым',
        description: 'Путешествие всей семьей в Крым',
        dateE: '24.12.2022',
        dateS: '01.01.2023'
    },
    {
        name: 'Крым',
        description: 'Путешествие всей семьей в Крым',
        dateE: '24.12.2022',
        dateS: '01.01.2023'
    },
    {
        name: 'Крым',
        description: 'Путешествие всей семьей в Крым',
        dateE: '24.12.2022',
        dateS: '01.01.2023'
    },
    {
        name: 'Крым',
        description: 'Путешествие всей семьей в Крым',
        dateE: '24.12.2022',
        dateS: '01.01.2023'
    },
    {
        name: 'Крым',
        description: 'Путешествие всей семьей в Крым',
        dateE: '24.12.2022',
        dateS: '01.01.2023'
    },
    {
        name: 'Крым',
        description: 'Путешествие всей семьей в Крым',
        dateE: '24.12.2022',
        dateS: '01.01.2023'
    },
]
const Travels = () => {
    const [value, setValue] = React.useState("");

    const renderItem = ({ item }) => (
        <Travel id={item.id} name={item.name} description={item.description} dateE={item.dateE} dateS={item.dateS} />
    );
    return (
        <View>
            <SearchBar
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
            />
            {value &&
                <View><Text>{value}</Text></View>
            }
            {!value &&
                <View>
                    <Pressable
                        style={[styles.button, styles.buttonClose]}
                    //onPress={() => setShowModel(!showModel)}
                    >
                        <Ionicons name="add" size={24} color="white" />
                        <Text style={styles.textStyle}>Create travel</Text>
                    </Pressable>

                    <FlatList style={{ flexGrow: 1, width, height }}
                        data={DATA}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
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
export default Travels

