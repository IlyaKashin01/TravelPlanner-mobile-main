import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";
import React, { useState, Dispatch, FC, SetStateAction } from 'react'
import { useAuth } from "../api/hooks/useAuth";

export interface Props {
    showModel?: boolean;
    setShowModel: Dispatch<SetStateAction<boolean>>;
}

const ModalProfile: React.FC<Props> = ({ showModel, setShowModel }) => {
    const { logout } = useAuth();
    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={showModel}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setShowModel(!showModel);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Hello World!</Text>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setShowModel(!showModel)}
                        >
                            <Text style={styles.textStyle}>Hide Modal</Text>
                        </Pressable>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={logout}
                        >
                            <Text style={styles.textStyle}>Hide Modal</Text>
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
        shadowOffset: {
            width: 0,
            height: 2
        },
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