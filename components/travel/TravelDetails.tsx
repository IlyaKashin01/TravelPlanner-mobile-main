import { View, Text, Image, StyleSheet, TextInput, Pressable, TouchableOpacity, FlatList } from 'react-native'
import React, { useState, useEffect, FC } from 'react'
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useCoordinate } from '../../api/hooks/useCoordinates';
import { ICreateCoordinate } from '../../api/interfaces/coordinates';
import { useService } from '../../api/hooks/useService';

const TravelDetails: FC = () => {
    const navigation = useNavigation<StackNavigationProp<any>>();
    const { createCoordinates, getCoordinates, coordinates, JourneyId } = useCoordinate();
    const { getResult, cost } = useService();
    const [alert, setAlert] = useState(false);


    const [data, setData] = useState<ICreateCoordinate>(
        { journeyId: JourneyId } as ICreateCoordinate
    );

    useEffect(() => {
        getCoordinates(JourneyId);
        //getResult();
    }, [])

    return (
        <View style={styles.container}>
            {alert && <Text>Error create journey </Text>}
            {/* <View>
                <Text>Result cost journey: {cost}</Text>
            </View> */}
            <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={() => navigation.navigate("addCoordinates")}
            >
                <Text style={styles.textStyle}>Add coordinates</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={() => navigation.navigate("showCoordinates")}
            >
                <Text style={styles.textStyle}>View coordinates</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={() => navigation.navigate("createService")}
            >
                <Text style={styles.textStyle}>Add service</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={() => navigation.navigate("listServices")}
            >
                <Text style={styles.textStyle}>View services</Text>
            </TouchableOpacity>
        </View>
    )
}

export default TravelDetails

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 25,
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
        elevation: 2,
        margin: 10
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