import { View, Text, TouchableOpacity, TextInput, StyleSheet, FlatList, Image } from 'react-native'
import React, { FC, useEffect, useState } from 'react'
import { IHotelsResponse } from '../../api/interfaces/parsing';
import { SimpleLineIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { IOperationResult } from '../../api/interfaces/operationResult';
import { useParsing } from '../../api/hooks/useParsing';
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';

export interface Props { response: IHotelsResponse[] };

const HotelsList: FC<Props> = ({ response }) => {
    const { error } = useParsing();
    const renderItem = ({ item }) => (
        <GestureHandlerRootView style={{ display: "flex", flexDirection: "column", padding: 5, borderWidth: 1, borderColor: "blue", borderRadius: 15, marginBottom: 10 }} key={item.id}>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                {item.srcImages.map((y: string) => (
                    <Image source={{ uri: y }} style={{ width: 300, height: 200, borderRadius: 25, marginRight: 5 }} />
                ))}
            </ScrollView>
            <View style={{ flexDirection: "row", width: "100%" }} >
                <View style={{ width: 150, padding: 5 }}>
                    <Text>{item.name}</Text>
                    <Text>{item.countStars}</Text>
                    <Text>{item.type}</Text>
                </View>
                <View style={{ width: 150, padding: 5 }}>
                    <Text>{item.position}</Text>
                    <Text>{item.tags}</Text>
                </View>
            </View>
            <View style={{ flexDirection: "row", width: "100%" }} >
                <Text style={{ top: 5 }}>{item.countNights}</Text>
                <TouchableOpacity style={{ marginLeft: 50, padding: 5, borderRadius: 10, backgroundColor: "#2196F3", height: 30 }} >
                    <Text>{item.price}</Text>
                </TouchableOpacity></View>
        </GestureHandlerRootView>
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
export default HotelsList