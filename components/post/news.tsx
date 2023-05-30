import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import PostCard from './postCard';


const News: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const scrollViewRef = useRef<ScrollView>(null);

    const handleNext = () => {
        setActiveIndex(activeIndex + 1);
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Новости</Text>
                <TouchableOpacity onPress={handleNext} style={{ flexDirection: 'row' }}>
                    <Text style={styles.button}>Показать все</Text>
                    <AntDesign name="right" size={18} color="#007AFF" style={{ top: 2 }} />
                </TouchableOpacity>
            </View>
            <PostCard />
            <PostCard />
            <PostCard />
        </View>
    )
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: 20,
        width: '100%',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    button: {
        fontSize: 16,
        color: '#007AFF',
    },
    textContainer: {
        position: 'absolute',
        top: 160
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 10,
    },
    titleCard: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
    slide: {
        width: 300,
        height: 250,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
        paddingBottom: 20
    },
    content: {
        fontSize: 20,
        textAlign: 'center',
        paddingHorizontal: 20,
    },
    dots: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 10,
        width: '100%',
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#ccc',
        marginHorizontal: 5,
    },
    activeDot: {
        backgroundColor: '#007AFF',
    }
});
export default News;