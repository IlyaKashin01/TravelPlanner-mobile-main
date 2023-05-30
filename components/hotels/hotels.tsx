import { View, Text, TouchableOpacity, TextInput, StyleSheet, FlatList, ActivityIndicator } from 'react-native'
import React, { FC, useEffect, useState } from 'react'
import { useParsing } from '../../api/hooks/useParsing'
import { IHotelRequest, IFlightResponse } from '../../api/interfaces/parsing';
import { SimpleLineIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import HotelsList from './hotelslist';

const Hotels: FC = () => {
    const { getHotels, hotels, isLoading } = useParsing();
    const [params, setParams] = useState<IHotelRequest>({} as IHotelRequest);
    const [reload, setReload] = useState(true);
    const get = () => { setReload(false); getHotels(params); }
    return (
        <View style={{ height: "100%" }}>
            {reload ?
                <View style={styles.searchContainer}>
                    <View style={styles.searchInputContainer}>
                        <TextInput style={styles.searchInput} placeholder="Город" value={params.City} onChangeText={value => { setParams({ ...params, City: value }) }} />
                        <TextInput style={styles.searchInput} placeholder="Месяц" value={params.NameMonthFrom} onChangeText={value => { setParams({ ...params, NameMonthFrom: value }) }} />
                        <TextInput style={styles.searchInput} placeholder="Число" value={params.DayFrom} onChangeText={value => { setParams({ ...params, DayFrom: value }) }} />
                    </View>
                    <View style={styles.searchInputContainer}>
                        <TextInput style={styles.searchInput} placeholder="Месяц" value={params.NameMonthAnd} onChangeText={value => { setParams({ ...params, NameMonthAnd: value }) }} />
                        <TextInput style={styles.searchInput} placeholder="Число" value={params.DayAnd} onChangeText={value => { setParams({ ...params, DayAnd: value }) }} />
                        <TextInput style={styles.searchInput} placeholder="Мест" value={params.CountPersons} onChangeText={value => { setParams({ ...params, CountPersons: value }) }} />
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
                    {!hotels &&
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', top: 50 }}>
                            <ActivityIndicator size="large" color="blue" />
                        </View>
                    }
                    <HotelsList response={hotels} />
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
export default Hotels