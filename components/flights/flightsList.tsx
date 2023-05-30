import { View, Text, TouchableOpacity, TextInput, StyleSheet, FlatList } from 'react-native'
import React, { FC, useEffect, useState } from 'react'
import { IFlightRequest, IFlightResponse } from '../../api/interfaces/parsing';
import { SimpleLineIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { IOperationResult } from '../../api/interfaces/operationResult';
import { useParsing } from '../../api/hooks/useParsing';

export interface Props { response: IFlightResponse[] };

const FlightsList: FC<Props> = ({ response }) => {
    const { error } = useParsing();
    const renderItem = ({ item }) => (
        <View style={{ display: "flex", flexDirection: "row", padding: 5, borderWidth: 1, borderColor: "blue", borderRadius: 15, marginBottom: 10 }} key={item.id}>
            <View style={{ flexDirection: "column" }} >
                <View style={{ flexDirection: "row", width: "100%" }} >
                    <View style={{ width: 90, padding: 5 }}>
                        <Text>{item.fromDepartureTime}</Text>
                        <Text>{item.fromDepartureAirport}</Text>
                        <Text>{item.fromAirline}</Text>
                    </View>
                    <View style={{ width: 60, padding: 5 }}>
                        <Text style={{ borderBottomWidth: 1, borderColor: "blue" }}>{item.fromTimeline}</Text>
                        <Text>{item.fromTypeFlight}</Text>
                    </View>
                    <View style={{ width: 90, padding: 5 }}>
                        <Text>{item.fromArrivalTime}</Text>
                        <Text>{item.fromArrivalAirport}</Text>
                    </View>
                </View>
                <View style={{ flexDirection: "row" }} >
                    <View style={{ width: 90, padding: 5 }}>
                        <Text>{item.backDepartureTime}</Text>
                        <Text>{item.backDepartureAirport}</Text>
                        <Text>{item.backAirline}</Text>
                    </View>
                    <View style={{ width: 60, padding: 5 }}>
                        <Text style={{ borderBottomWidth: 1, borderColor: "blue" }}>{item.backTimeline}</Text>
                        <Text>{item.backTypeFlight}</Text>
                    </View>
                    <View style={{ width: 90, padding: 5 }}>
                        <Text>{item.backArrivalTime}</Text>
                        <Text>{item.backArrivalAirport}</Text>
                    </View>
                </View>
            </View>
            <TouchableOpacity style={{ flexDirection: "row", padding: 5, borderRadius: 10, backgroundColor: "#2196F3", width: 70, height: 30, top: 30 }} >
                <Text>{item.price}</Text>
            </TouchableOpacity>
        </View>
    )
    return (
        <View style={{ height: "100%" }}>
            {error ?
                <View><Text>No search result</Text></View>
                :
                <View>
                    <FlatList style={{ marginBottom: 150 }}
                        data={response}
                        renderItem={renderItem}
                        keyExtractor={item => item.Id}
                        showsVerticalScrollIndicator={false}
                        scrollEnabled={true}
                    />
                </View>
            }
        </View>
    )
}
export default FlightsList