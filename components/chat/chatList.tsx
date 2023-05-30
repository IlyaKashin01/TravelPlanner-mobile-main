import React, { useState } from 'react'
import { View, Text, StyleSheet, Image, FlatList, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import ChatScreen from '../../screens/chatScreen';

const ChatList: React.FC = () => {
    const navigation = useNavigation<StackNavigationProp<any>>();
    const [On, setOn] = useState(false);
    const [nameD, setD] = useState('');
    const [ava, setAva] = useState();

    const click = (x, y) => { setD(x); setAva(y); setOn(true); navigation.navigate('dialogue', { nameDialogue: nameD, avatar: ava }); }
    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => navigation.navigate('dialogue')}>
                <View style={styles.chatItem}>
                    {item.isGroupChat ? (
                        <View style={styles.groupAvatarContainer}>
                            {item.groupMembers.map((member, index) => (
                                <Image key={index} source={item.avatar} style={[styles.groupAvatar, index === 1 && styles.groupAvatarSecond]} />
                            ))}
                        </View>
                    ) : (
                        <View style={styles.avatarContainer}>
                            <Image source={item.avatar} style={styles.avatar} />

                        </View>)}
                    <View style={styles.chatInfo}>
                        <Text style={styles.chatName}>{item.name}</Text>
                        <Text style={styles.lastMessage}>{item.lastMessage}</Text>
                    </View>
                    <View style={styles.chatDate}>
                        <Text style={styles.lastMessageDate}>{item.lastMessageDate}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    const DATA = [
        {
            id: '1',
            name: 'Диалог 1',
            avatar: require('../../assets/images/profile.jpg'),
            lastMessage: 'Тест',
            lastMessageDate: '10:00',
            isGroupChat: false,
        },
        {
            id: '2',
            name: 'Диалог 2',
            avatar: require('../../assets/images/profile.jpg'),
            lastMessage: 'Тест',
            lastMessageDate: 'Вчера',
            isGroupChat: false,
        },
        {
            id: '3',
            name: 'User1 + User2 + Я',
            avatar: require('../../assets/images/profile.jpg'),
            lastMessage: 'Тест',
            lastMessageDate: '2 дня назад',
            isGroupChat: true,
            groupMembers: [
                require('../../assets/images/profile.jpg'),
                require('../../assets/images/profile.jpg'),
            ],
        },
    ];
    return (

        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <TextInput style={styles.searchInput} placeholder="Search" />
            </View>
            <FlatList
                data={DATA}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
            />
        </View>


    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    searchBar: {
        height: 50,
        backgroundColor: '#f2f2f2',
        paddingHorizontal: 20,
        justifyContent: 'center',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10,
    },
    searchInput: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        borderRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    chatItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
    },
    avatarContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        overflow: 'hidden',
        marginRight: 10,
        position: 'relative',
    },
    groupAvatarContainer: {
        width: 60,
        height: 60,
        borderRadius: 25,
        overflow: 'hidden',
        marginRight: 10,
        position: 'relative',
    },
    avatar: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    groupAvatar: {
        position: 'absolute',
        borderWidth: 2,
        borderColor: '#fff',
        borderRadius: 25,
        width: 40,
        height: 40,
        resizeMode: 'cover',

    },
    groupAvatarSecond: {
        position: 'absolute',
        borderWidth: 2,
        borderColor: '#fff',
        borderRadius: 25,
        width: 40,
        height: 40,
        resizeMode: 'cover',
        top: 15,
        left: 20,
    },
    chatInfo: {
        flex: 1,
        justifyContent: 'center',
        paddingRight: 10,
    },
    chatName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    lastMessage: {
        color: '#999',
        fontSize: 14,
    },
    chatDate: {
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    lastMessageDate: {
        color: '#999',
        fontSize: 12,
    },
})

export default ChatList

