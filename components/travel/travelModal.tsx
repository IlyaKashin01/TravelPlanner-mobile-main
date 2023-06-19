import { Alert, Modal, StyleSheet, Text, Pressable, View, TouchableOpacity, ScrollView } from "react-native";
import React, { useState, useRef, Dispatch, FC, SetStateAction } from 'react'
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Modalize } from 'react-native-modalize';

export interface Props {
    showModal: boolean;
    setShowModal: Dispatch<SetStateAction<boolean>>;
}

const TravelModal: React.FC<Props> = ({ showModal, setShowModal }) => {
    const navigation = useNavigation<StackNavigationProp<any>>();

    return (
        <View style={styles.centeredView} >

            <Modal
                animationType="slide"
                transparent={true}
                visible={showModal}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setShowModal(!showModal);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>

                        <TouchableOpacity
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => { setShowModal(!showModal); navigation.navigate("addCoordinates") }}
                        >
                            <Text style={styles.textStyle}>Add coordinates</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => { setShowModal(!showModal); navigation.navigate("showCoordinates") }}
                        >
                            <Text style={styles.textStyle}>View coordinates</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => { setShowModal(!showModal); navigation.navigate("createService") }}
                        >
                            <Text style={styles.textStyle}>Add service</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => { setShowModal(!showModal); navigation.navigate("listServices") }}
                        >
                            <Text style={styles.textStyle}>View services</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setShowModal(!showModal)}
                        >
                            <Text style={styles.textStyle}>Закрыть окно</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    )
}
const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "stretch",
        marginBottom: 35
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",

        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
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
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
});

export default TravelModal