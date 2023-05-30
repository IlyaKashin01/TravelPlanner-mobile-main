import { Alert, Modal, StyleSheet, Text, Pressable, View, TouchableOpacity, ScrollView } from "react-native";
import React, { useState, useRef, Dispatch, FC, SetStateAction } from 'react'
import { useAuth } from "../api/hooks/useAuth";
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Modalize } from 'react-native-modalize';

export interface Props {
    showModal: boolean;
    setShowModal: Dispatch<SetStateAction<boolean>>;
}

const ModalProfile: React.FC<Props> = ({ showModal, setShowModal }) => {
    const { logout } = useAuth();
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
                        <Text style={styles.modalText}>Hello World!</Text>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setShowModal(!showModal)}
                        >
                            <Text style={styles.textStyle}>Закрыть окно</Text>
                        </Pressable>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => { setShowModal(!showModal); navigation.navigate("addAvatar"); }}
                        >
                            <Text style={styles.textStyle}>Добавить аватар</Text>
                        </Pressable>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={logout}
                        >
                            <Text style={styles.textStyle}>Выйти</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
            {/* <Pressable
                style={[styles.button, styles.buttonOpen]}
                onPress={() => setModalVisible(true)}
            >
                <Text style={styles.textStyle}>Show Modal</Text>
            </Pressable> */}
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

export default ModalProfile