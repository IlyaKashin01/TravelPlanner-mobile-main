import { View, Text, Image, StyleSheet, TextInput, Pressable, TouchableOpacity } from 'react-native'
import React, { useState, useEffect, FC } from 'react'
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useCoordinate } from '../../api/hooks/useCoordinates';
import { ICreateCoordinate } from '../../api/interfaces/coordinates';

const CreateCoordinates: FC = () => {
    const navigation = useNavigation<StackNavigationProp<any>>();
    const { createCoordinates, JourneyId } = useCoordinate();
    const [alert, setAlert] = useState(false);


    const [data, setData] = useState<ICreateCoordinate>(
        { journeyId: JourneyId } as ICreateCoordinate
    );

    const create = async () => {

        if (await createCoordinates(data)) navigation.navigate("Travels");
    };
    return (
        <View style={styles.container}>
            {alert && <Text>Error create journey </Text>}
            <TextInput
                placeholder='Latitube'
                value={data.Latitube}
                onChangeText={value => { setData({ ...data, Latitube: value }) }}
                style={styles.input} />

            <TextInput
                placeholder='Longitude'
                value={data.Longitude}
                onChangeText={value => setData({ ...data, Longitude: value })}
                style={styles.input} />


            <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={create}
            >
                <Text style={styles.textStyle}>Create</Text>
            </TouchableOpacity>
        </View>
    )
}

export default CreateCoordinates

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