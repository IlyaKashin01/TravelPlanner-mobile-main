import React, { useContext, useEffect, useState } from 'react';
import { TouchableOpacity, View, StyleSheet, Text, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import UserProfile from '../screens/userProfile';
import { StackNavigationProp } from '@react-navigation/stack';


const PostCard: React.FC = () => {
    const navigation = useNavigation<StackNavigationProp<any>>();
    const [colorLike, setColor] = useState('black');
    const [colorDisLike, setDisColor] = useState('black');

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate('Account')}>
                <View style={[styles.subContainer, { marginBottom: 20 }]}>
                    <View style={styles.profileImage}>
                        <Image source={require("../assets/images/profile.jpg")} style={styles.image} resizeMode="cover"></Image>
                    </View>
                    <Text style={[styles.text, { fontWeight: "200", fontSize: 28, marginLeft: 10 }]}>Ilya Kashin</Text>
                </View>
            </TouchableOpacity>
            <View >
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    <View style={styles.mediaImageContainer}>
                        <Image source={require("../assets/images/media1.jpg")} style={styles.image} resizeMode="cover"></Image>
                    </View>
                    <View style={styles.mediaImageContainer}>
                        <Image source={require("../assets/images/media1.jpg")} style={styles.image} resizeMode="cover"></Image>
                    </View>
                    <View style={styles.mediaImageContainer}>
                        <Image source={require("../assets/images/media1.jpg")} style={styles.image} resizeMode="cover"></Image>
                    </View>
                </ScrollView>
            </View>
            <Text style={[styles.text, { fontWeight: "200", fontSize: 28 }]}>Blog post</Text>
            <View style={styles.subContainer}>
                <TouchableOpacity style={styles.button} onPress={() => colorLike === 'black' ? [setColor('red'), setDisColor('black')] : setColor('black')}>
                    <AntDesign name="like2" size={24} color={colorLike} />
                    <Text style={{ color: colorLike }}>200</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => colorDisLike === 'black' ? [setDisColor('blue'), setColor('black')] : setDisColor('black')}>
                    <AntDesign name="dislike2" size={24} color={colorDisLike} />
                    <Text style={{ color: colorDisLike }}>200</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <FontAwesome name="comments" size={24} color="black" />
                    <Text>200</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <FontAwesome name="share" size={24} color="black" />
                    <Text>200</Text>
                </TouchableOpacity>
            </View>
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF",
        borderRadius: 25,
        padding: 25,
        margin: 10
    },
    button: {
        margin: 20,
        alignItems: "center",
        justifyContent: "center",
    },
    subContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        width: "auto"
    },
    text: {
        color: "#52575D"
    },
    image: {
        flex: 1,
        height: undefined,
        width: undefined
    },
    profileImage: {
        width: 40,
        height: 40,
        borderRadius: 100,
        overflow: "hidden"
    },
    mediaImageContainer: {
        width: 280,
        height: 280,
        borderRadius: 12,
        overflow: "hidden",
        marginHorizontal: 10
    },
});
export default PostCard;