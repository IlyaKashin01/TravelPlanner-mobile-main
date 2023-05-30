import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

interface Slide {
    title: string;
    content: string;
}

interface SliderProps {
    slides: Slide[];
}

const Slider: React.FC<SliderProps> = ({ slides }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const scrollViewRef = useRef<ScrollView>(null);

    const handleNext = () => {
        setActiveIndex(activeIndex + 1);
    };

    const handleScroll = (event: any) => {
        const slideWidth = event.nativeEvent.layoutMeasurement.width;
        const offset = event.nativeEvent.contentOffset.x;
        const index = Math.round(offset / slideWidth);
        setActiveIndex(index);
    };

    const handleDotPress = (index: number) => {
        setActiveIndex(index);
        scrollViewRef.current?.scrollTo({ x: index * 300 });
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                {/* <Text style={styles.title}>{slides[activeIndex].title}</Text> */}
                <Text style={styles.title}>Популярное</Text>
                <TouchableOpacity onPress={handleNext} style={{ flexDirection: 'row' }}>
                    <Text style={styles.button}>Показать все</Text>
                    <AntDesign name="right" size={18} color="#007AFF" style={{ top: 2 }} />
                </TouchableOpacity>
            </View>
            <ScrollView ref={scrollViewRef} horizontal={true} showsHorizontalScrollIndicator={false} onScroll={handleScroll}>
                {
                    slides.map((slide, index) => (
                        <View key={index} style={styles.slide}>
                            <Image source={require("../../assets/images/281.jpg")} style={styles.image} />
                            <View style={styles.textContainer}><Text style={styles.titleCard}>{slide.content}</Text></View>
                        </View>
                    ))
                }
            </ScrollView>
            <View style={styles.dots}>
                {slides.map((slide, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[styles.dot, activeIndex === index && styles.activeDot]}
                        onPress={() => handleDotPress(index)}
                    />
                ))}
            </View>
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
export default Slider;