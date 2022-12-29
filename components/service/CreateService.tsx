import { View, Text, Image, StyleSheet, TextInput, Pressable, TouchableOpacity } from 'react-native'
import React, { useState, useEffect, FC } from 'react'
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useCoordinate } from '../../api/hooks/useCoordinates';
import { ICreateCoordinate } from '../../api/interfaces/coordinates';
import { ICreateService } from '../../api/interfaces/service';
import { useService } from '../../api/hooks/useService';

const CreateService: FC = () => {
    const navigation = useNavigation<StackNavigationProp<any>>();
    const { createService, TravelId } = useService();
    const [alert, setAlert] = useState(false);


    const [data, setData] = useState<ICreateService>(
        { JourneyId: TravelId } as ICreateService
    );

    const create = async () => {

        if (await createService(data)) navigation.navigate("Travels");
    };
    return (
        <View style={styles.container}>
            {alert && <Text>Error create journey </Text>}
            <TextInput
                placeholder='Name'
                value={data.Name}
                onChangeText={value => { setData({ ...data, Name: value }) }}
                style={styles.input} />

            <TextInput
                placeholder='Description'
                value={data.Description}
                onChangeText={value => setData({ ...data, Description: value })}
                style={styles.input} />
            <TextInput
                placeholder='Cost'
                value={data.Cost}
                onChangeText={value => setData({ ...data, Cost: value })}
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

export default CreateService

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