import { View, Text, Image, StyleSheet, TextInput, Pressable, TouchableOpacity, FlatList } from 'react-native'
import React, { useState, useEffect, FC } from 'react'
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useCoordinate } from '../../api/hooks/useCoordinates';
import { ICreateCoordinate } from '../../api/interfaces/coordinates';
import { CoordinatesContext } from '../../api/providers/CoordinatesProvider';

const CoordinatesList: FC = () => {
    const navigation = useNavigation<StackNavigationProp<any>>();
    const { getCoordinates, coordinates, JourneyId } = useCoordinate();
    const [alert, setAlert] = useState(false);

    useEffect(() => {
        getCoordinates(JourneyId);
    }, [])
    const renderItem = ({ item }) => (
        <View key={item.id} style={{ flex: 1, flexDirection: "row", margin: 5, backgroundColor: "white", borderRadius: 25 }}>
            <Text style={{ padding: 5, fontSize: 24 }}>latitube: {item.latitube}</Text>
            <Text style={{ padding: 5, fontSize: 24 }}>longitude: {item.longitude}</Text>
        </View>
    );
    return (
        <View style={styles.container}>
            <FlatList
                data={coordinates}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
            />
        </View>
    )
}

export default CoordinatesList

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
    inputBorder: {
        width: '30%',
        borderRadius: 8,
        borderColor: '#cacaca',
        borderWidth: 1,
        marginBottom: 20,
    },
})