import { View, Text, Image, StyleSheet, TextInput, Pressable, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native'
import React, { useState, useEffect, FC } from 'react'
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useCoordinate } from '../../api/hooks/useCoordinates';
import { ICreateCoordinate } from '../../api/interfaces/coordinates';
import { useService } from '../../api/hooks/useService';
import { useTravel } from '../../api/hooks/useTravel';
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import TravelModal from './travelModal';
import ServicesList from '../service/ServicesList';

const TravelDetails: FC = () => {
    const navigation = useNavigation<StackNavigationProp<any>>();
    const { travel, isLoading } = useTravel();
    const [modalVisible, setModalVisible] = useState(false);




    return (
        <View>
            {isLoading ?
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', top: 15 }}>
                    <ActivityIndicator size="large" color="blue" />
                </View>
                :
                <View style={{ flex: 1, }}>



                    <View style={{ flexDirection: "row", backgroundColor: "#7ad9ff", paddingBottom: 10, paddingLeft: 10 }}>
                        <View style={{ flexDirection: "column", }}>

                            <Text style={{ fontSize: 24, alignItems: "center", justifyContent: "center" }}>{travel.name}</Text>
                            <Text style={{ fontSize: 18, alignItems: "center", justifyContent: "center" }}><Entypo name="compass" size={16} color="black" /> {travel.description}</Text>
                            <Text style={{ fontSize: 18, alignItems: "center", justifyContent: "center" }}><MaterialIcons name="date-range" size={16} color="black" /> {travel.dateStart.toString()} - {travel.dateEnd.toString()}</Text>
                            <Text style={{ fontSize: 18, alignItems: "center", justifyContent: "center" }}><Entypo name="clock" size={16} color="black" /> {travel.countDays} Дней</Text>
                            <Text style={{ fontSize: 18, alignItems: "center", justifyContent: "center" }}><Ionicons name="person" size={16} color="black" /> {travel.countPerson}</Text>
                        </View>
                        <View>
                            <TouchableOpacity
                                style={{ marginLeft: 100 }}
                                onPress={() => setModalVisible(!modalVisible)}
                            >
                                <MaterialIcons name="menu" size={30} color="black" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={{ flexDirection: "row", backgroundColor: "#7ad9ff", paddingBottom: 10 }}>

                        <View style={{ flexDirection: "column", width: "35%", borderRightWidth: 1, borderColor: "blue", }}>
                            <Text style={{ fontSize: 10, alignItems: "center", justifyContent: "center" }}>Предполагаемая</Text>
                            <Text style={{ fontSize: 18, alignItems: "center", justifyContent: "center" }}>{travel.expectedCost}</Text>
                        </View>
                        <View style={{ flexDirection: "column", width: "35%", borderRightWidth: 1, borderColor: "blue", marginLeft: "5%" }}>
                            <Text style={{ fontSize: 10, alignItems: "center", justifyContent: "center" }}>Фактическая</Text>
                            <Text style={{ fontSize: 18, alignItems: "center", justifyContent: "center" }}>{travel.actualCost}</Text>
                        </View>
                        <View style={{ flexDirection: "column", width: "35%", marginLeft: "5%" }}>
                            <Text style={{ fontSize: 10, alignItems: "center", justifyContent: "center" }}>Прогнозная</Text>
                            <Text style={{ fontSize: 18, alignItems: "center", justifyContent: "center" }}>{travel.projectedCost}</Text>
                        </View>
                    </View>
                    <View>
                        <ServicesList />
                    </View>
                    <TravelModal showModal={modalVisible} setShowModal={setModalVisible} />

                </View>}
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