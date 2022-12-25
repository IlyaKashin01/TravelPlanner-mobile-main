import { View, Text, Dimensions, StyleSheet, Image, ScrollView } from 'react-native'
import React from 'react'
import { FlatList } from 'react-navigation'

const data = [
    {
        name: 'Ilya Kashin',
        message: 'test',
        date: '25.12.2022'
    }, {
        name: 'Ilya Kashin',
        message: 'test',
        date: '25.12.2022'
    }, {
        name: 'Ilya Kashin',
        message: 'test',
        date: '25.12.2022'
    },
]

const { width, height } = Dimensions.get('window')
const ChatList = () => {

    return (
        <ScrollView>
            {data.map((item) => (
                <View style={[styles.subContainer,]}>
                    <View style={styles.profileImage}>
                        <Image source={require("../../assets/images/profile.jpg")} style={styles.image} resizeMode="cover"></Image>
                    </View>
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={[styles.text, { fontWeight: "200", fontSize: 24, marginLeft: 10 }]}>{item.name}</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                            <Text style={[styles.text, { fontWeight: "200", fontSize: 20, marginLeft: 10 }]}>{item.message}</Text>
                            <Text style={[styles.text, { fontWeight: "200", fontSize: 15, marginLeft: 100 }]}>{item.date}</Text>
                        </View>
                    </View>
                </View>
            ))}
        </ScrollView>
    )
}

export default ChatList

const styles = StyleSheet.create({
    subContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
    },
    text: {
        color: "#52575D"
    },
    image: {
        flex: 1,
        height: undefined,
        width: undefined
    },
    profileImage: {
        width: 40,
        height: 40,
        borderRadius: 100,
        overflow: "hidden"
    },
})