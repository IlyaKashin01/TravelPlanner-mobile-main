import { View, Text, TouchableOpacity, TextInput, StyleSheet, FlatList, ActivityIndicator } from 'react-native'
import React, { FC, useEffect, useState } from 'react'
import { useParsing } from '../../api/hooks/useParsing'
import { IFlightRequest, IFlightResponse } from '../../api/interfaces/parsing';
import { SimpleLineIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import FlightsList from './flightsList';
import Travels from '../travel/travels';

const Flights: FC = () => {
    const { getFlights, flights, isLoading } = useParsing();
    const [params, setParams] = useState<IFlightRequest>({} as IFlightRequest);
    const [reload, setReload] = useState(true);
    const get = () => { setReload(false); getFlights(params); }
    return (
        <View style={{ height: "100%" }}>
            {reload ?
                <View style={styles.searchContainer}>
                    <View style={styles.searchInputContainer}>
                        <TextInput style={styles.searchInput} placeholder="Откуда" value={params.WhereFrom} onChangeText={value => { setParams({ ...params, WhereFrom: value }) }} />
                        <TextInput style={styles.searchInput} placeholder="Куда" value={params.Where} onChangeText={value => { setParams({ ...params, Where: value }) }} />
                        <TextInput style={styles.searchInput} placeholder="Месяц" value={params.MonthFrom} onChangeText={value => { setParams({ ...params, MonthFrom: value }) }} />
                        <TextInput style={styles.searchInput} placeholder="Число" value={params.DayFrom} onChangeText={value => { setParams({ ...params, DayFrom: value }) }} />
                    </View>
                    <View style={styles.searchInputContainer}>
                        <TextInput style={styles.searchInput} placeholder="Месяц" value={params.MonthAnd} onChangeText={value => { setParams({ ...params, MonthAnd: value }) }} />
                        <TextInput style={styles.searchInput} placeholder="Число" value={params.DayAnd} onChangeText={value => { setParams({ ...params, DayAnd: value }) }} />
                        <TextInput style={styles.searchInput} placeholder="Пассажиры" value={params.Adults} onChangeText={value => { setParams({ ...params, Adults: value }) }} />
                        <TextInput style={styles.searchInput} placeholder="Класс" value={params.TravelClass} onChangeText={value => { setParams({ ...params, TravelClass: value }) }} />
                    </View>
                    <TouchableOpacity style={styles.filterButton} onPress={get}>
                        <AntDesign name="search1" size={15} color="black" />
                    </TouchableOpacity>
                </View>
                :
                <View style={[styles.searchContainer, { top: 5, height: '100%' }]}>
                    <TouchableOpacity style={[styles.filterButton, { width: 40, marginBottom: 10 }]} onPress={() => setReload(true)}>
                        <AntDesign name="reload1" size={20} color="black" />
                    </TouchableOpacity>
                    {!flights &&
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', top: 50 }}>
                            <ActivityIndicator size="large" color="blue" />
                        </View>
                    }
                    <FlightsList response={flights} />
                </View>
            }
        </View>
    )
}
const styles = StyleSheet.create({
    searchContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: 10,
    },
    searchInputContainer: {
        flexDirection: 'row',
        marginBottom: 5
    },
    searchInput: {
        flexDirection: "row",
        backgroundColor: '#f5f5f5',
        borderRadius: 15,
        paddingHorizontal: 15,
        paddingVertical: 5,
        marginRight: 5,
    },
    filterButton: {
        backgroundColor: '#f5f5f5',
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    filterButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
})
export default Flights