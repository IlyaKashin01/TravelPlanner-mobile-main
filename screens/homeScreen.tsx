import React, { useEffect, useState } from "react";
import { useAuth } from "../api/hooks/useAuth";
import PostCard from "../components/post/postCard";
import { View, Text, TouchableOpacity, Image, TextInput, StyleSheet, ScrollView } from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import Slider from "../components/slider/slider";
import News from "../components/post/news";
import Flights from "../components/flights/flights";
import Hotels from "../components/hotels/hotels";

const HomeScreen: React.FC = () => {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState(0);
    const slides = [
        {
            id: 1,
            title: 'Slide 1',
            content: 'This is the first slide',
        },
        {
            id: 2,
            title: 'Slide 2',
            content: 'This is the second slide',
        },
        {
            id: 3,
            title: 'Slide 3',
            content: 'This is the third slide',
        },
    ];
    return (
        <View style={styles.container}>
            <View style={styles.locationContainer}>
                <FontAwesome name="map-marker" size={20} color="black" style={styles.locationIcon} />
                <Text style={styles.locationText}>Владимир, РФ</Text>
                <TouchableOpacity style={styles.avatarContainer}>
                    <Image source={{ uri: `data:image/jpeg;base64,${user.avatar}` }} style={styles.avatar} />
                </TouchableOpacity>
            </View>
            {/* <View style={styles.searchContainer}>
                <TextInput style={styles.searchInput} placeholder="Search" />
                <TouchableOpacity style={styles.filterButton}>
                    <SimpleLineIcons name="equalizer" size={15} color="black" />
                </TouchableOpacity>
            </View> */}
            <View style={styles.tabContainer}>
                <TouchableOpacity style={[styles.tabInactive, activeTab === 0 && styles.tabActive]} onPress={() => setActiveTab(0)}>
                    <Text style={[styles.tabLabelInactive, activeTab === 0 && styles.tabLabelActive]}>Explore</Text>
                    {activeTab === 0 && <Text style={styles.dot}></Text>}
                </TouchableOpacity>
                <TouchableOpacity style={[styles.tabInactive, activeTab === 1 && styles.tabActive]} onPress={() => setActiveTab(1)}>
                    <Text style={[styles.tabLabelInactive, activeTab === 1 && styles.tabLabelActive]}>Flights</Text>
                    {activeTab === 1 && <Text style={styles.dot}></Text>}
                </TouchableOpacity>
                <TouchableOpacity style={[styles.tabInactive, activeTab === 2 && styles.tabActive]} onPress={() => setActiveTab(2)}>
                    <Text style={[styles.tabLabelInactive, activeTab === 2 && styles.tabLabelActive]}>Hotels</Text>
                    {activeTab === 2 && <Text style={styles.dot}></Text>}
                </TouchableOpacity>
                <TouchableOpacity style={[styles.tabInactive, activeTab === 3 && styles.tabActive]} onPress={() => setActiveTab(3)}>
                    <Text style={[styles.tabLabelInactive, activeTab === 3 && styles.tabLabelActive]}>Places</Text>
                    {activeTab === 3 && <Text style={styles.dot}></Text>}
                </TouchableOpacity>
                <TouchableOpacity style={[styles.tabInactive, activeTab === 4 && styles.tabActive]} onPress={() => setActiveTab(4)}>
                    <Text style={[styles.tabLabelInactive, activeTab === 4 && styles.tabLabelActive]}>Other</Text>
                    {activeTab === 4 && <Text style={styles.dot}></Text>}
                </TouchableOpacity>
            </View>
            {activeTab === 0 ?
                <ScrollView style={{ width: "100%" }}>
                    <Slider slides={slides} />
                    <News />
                </ScrollView> : activeTab === 1 ?
                    <Flights />
                    : activeTab === 2 ?
                        <Hotels />
                        :
                        <View />
            }
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingTop: 10,
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    locationIcon: {
        width: 20,
        height: 20,
        marginRight: 10,
    },
    locationText: {
        fontSize: 14,
        fontWeight: 'bold',
        marginRight: 'auto',
    },
    avatarContainer: {
        marginLeft: 'auto',
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    searchInput: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        borderRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginRight: 10,
    },
    filterButton: {
        backgroundColor: '#f5f5f5',
        borderRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    filterButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    tabContainer: {
        flexDirection: 'row',
        marginBottom: 15,
    },
    tab: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        borderRadius: 20,
        paddingVertical: 10,
        alignItems: 'center',
        borderBottomWidth: 2,
        borderBottomColor: 'transparent',
    },
    tabActive: {
        borderBottomColor: 'blue',
        margin: 10,
    },
    tabInactive: {
        borderBottomColor: 'black',
        margin: 10,
    },
    tabLabel: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    tabLabelActive: {
        color: 'blue',
    },
    tabLabelInactive: {
        color: 'black',
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: 'blue',
        position: 'absolute',
        bottom: -10,
        left: '50%',
        transform: [{ translateX: -4 }],
    },
})
export default HomeScreen;


