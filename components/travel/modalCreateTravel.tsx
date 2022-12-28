import { View, Text, Image, StyleSheet, TextInput, Pressable, TouchableOpacity } from 'react-native'
import React, { useState, useEffect, FC } from 'react'
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ICreateTravel } from '../../api/interfaces/travel';
import { useTravel } from '../../api/hooks/useTravel';
import DateField from 'react-native-datefield';
import moment from 'moment';

const ModalCreateTravel: FC = () => {
    const navigation = useNavigation<StackNavigationProp<any>>();
    const { clearError, createTravel } = useTravel();
    const [alert, setAlert] = useState(false);


    const [data, setData] = useState<ICreateTravel>(
        { categoryId: 1, personId: 1 } as ICreateTravel
    );

    const create = async () => {
        clearError(); //console.log(data)
        if (await createTravel(data)) navigation.navigate('Travels');
        else setAlert(true);
    };

    useEffect(() => {
        clearError();
    }, []);

    return (
        <View style={styles.container}>
            {alert && <Text>Error create journey </Text>}
            <TextInput
                placeholder='Name'
                value={data.name}
                onChangeText={value => { setData({ ...data, name: value }) }}
                style={styles.input} />

            <TextInput
                placeholder='Description'
                value={data.description}
                onChangeText={value => setData({ ...data, description: value })}
                style={styles.input} />


            <DateField
                onSubmit={(value) => setData({ ...data, dateStart: moment(value).format("YYYY-MM-DD").toString() })}
            />
            <DateField
                onSubmit={(value) => setData({ ...data, dateEnd: moment(value).format("YYYY-MM-DD").toString() })}
            />



            <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={create}
            >
                <Text style={styles.textStyle}>Create</Text>
            </TouchableOpacity>
        </View>
    )
}

export default ModalCreateTravel

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