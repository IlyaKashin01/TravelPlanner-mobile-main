import { StyleSheet, TextInput, TouchableOpacity, View, Text, Image, FlatList, SafeAreaView, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react'
import ChatHub from './chat/chatHub';
import { SimpleLineIcons } from '@expo/vector-icons';
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import { useFriends } from '../api/hooks/useFriends';
import { useAuth } from '../api/hooks/useAuth';
import { AntDesign } from '@expo/vector-icons';

const Friends = () => {
    const { friends, getFriends, isLoading } = useFriends();
    const { user } = useAuth();
    useEffect(() => {
        getFriends(0, 10, 1);
        //console.log(friends)
    }, [])
    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity >
                <View style={styles.chatItem}>
                    <View style={styles.avatarContainer}>
                        <Image source={{ uri: `data:image/jpeg;base64,${item.avatar}` }} style={styles.avatar} />
                    </View>
                    <View style={styles.chatInfo}>
                        <Text style={styles.chatName}>{item.login}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };
    const DATA = [
        {
            id: '1',
            name: 'Пользователь',
            avatar: require('../assets/images/profile.jpg'),
            lastMessage: 'Тест',
            lastMessageDate: 'Добавить',
            isGroupChat: false,
        },
        {
            id: '2',
            name: 'Пользователь',
            avatar: require('../assets/images/profile.jpg'),
            lastMessage: 'Тест',
            lastMessageDate: 'Добавить',
            isGroupChat: false,
        },
        {
            id: '3',
            name: 'Пользователь',
            avatar: require('../assets/images/profile.jpg'),
            lastMessage: 'Тест',
            lastMessageDate: 'Добавить',
            isGroupChat: false,
        },
        {
            id: '4',
            name: 'Пользователь',
            avatar: require('../assets/images/profile.jpg'),
            lastMessage: 'Тест',
            lastMessageDate: 'Добавить',
            isGroupChat: false,
        },
        {
            id: '5',
            name: 'Пользователь',
            avatar: require('../assets/images/profile.jpg'),
            lastMessage: 'Тест',
            lastMessageDate: 'Добавить',
            isGroupChat: false,
        },
        {
            id: '6',
            name: 'Пользователь',
            avatar: require('../assets/images/profile.jpg'),
            lastMessage: 'Тест',
            lastMessageDate: 'Добавить',
            isGroupChat: false,
        },
        {
            id: '7',
            name: 'Пользователь',
            avatar: require('../assets/images/profile.jpg'),
            lastMessage: 'Тест',
            lastMessageDate: 'Добавить',
            isGroupChat: false,
        },
        {
            id: '8',
            name: 'Пользователь',
            avatar: require('../assets/images/profile.jpg'),
            lastMessage: 'Тест',
            lastMessageDate: 'Добавить',
            isGroupChat: false,
        },
        {
            id: '9',
            name: 'Пользователь',
            avatar: require('../assets/images/profile.jpg'),
            lastMessage: 'Тест',
            lastMessageDate: 'Добавить',
            isGroupChat: false,
        },
        {
            id: '10',
            name: 'Пользователь',
            avatar: require('../assets/images/profile.jpg'),
            lastMessage: 'Тест',
            lastMessageDate: 'Добавить',
            isGroupChat: false,
        },
    ];
    const [searchValue, setSearchValue] = useState<string>("");
    return (
        <GestureHandlerRootView style={styles.container}>
            <View style={styles.searchContainer}>
                <TextInput style={styles.searchInput} placeholder="Search" value={searchValue} onChangeText={(value) => setSearchValue(value)} />
            </View>

            {searchValue === "" ?
                isLoading === true ?
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', top: 15 }}>
                        <ActivityIndicator size="large" color="blue" />
                    </View>
                    :
                    <FlatList style={{ height: 300 }}
                        data={friends}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id}
                        showsVerticalScrollIndicator={false}
                        scrollEnabled={true}
                    />
                :
                <ScrollView>
                    <View style={{ backgroundColor: "white", alignItems: 'center', justifyContent: 'center', borderBottomWidth: 1, borderColor: "blue" }}>
                        <Text style={{ fontSize: 18, color: 'blue', padding: 5 }}>Друзья</Text>
                    </View>
                    {DATA.map((item) => (
                        <TouchableOpacity key={item.id}>
                            <View style={styles.chatItem}>

                                <View style={styles.avatarContainer}>
                                    <Image source={item.avatar} style={styles.avatar} />
                                </View>
                                <View style={styles.chatInfo}>
                                    <Text style={styles.chatName}>{item.name}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))}
                    <View style={{ backgroundColor: "white", alignItems: 'center', justifyContent: 'center', borderBottomWidth: 1, borderColor: "blue" }}>
                        <Text style={{ fontSize: 18, color: 'blue', padding: 5 }}>Поиск</Text>
                    </View>
                    {DATA.map((item) => (
                        <TouchableOpacity key={item.id}>
                            <View style={styles.chatItem}>

                                <View style={styles.avatarContainer}>
                                    <Image source={item.avatar} style={styles.avatar} />
                                </View>
                                <View style={styles.chatInfo}>
                                    <Text style={styles.chatName}>{item.name}</Text>
                                </View>
                                <TouchableOpacity style={styles.button}>
                                    <Text style={styles.lastMessageDate}>{item.lastMessageDate}</Text>
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            }
        </GestureHandlerRootView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: '100%',
        height: '100%',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        top: 10,
        left: 5
    },
    searchInput: {
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginRight: 10,
    },
    filterButton: {
        backgroundColor: 'white',
        borderRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    filterButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
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
    avatar: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
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
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "blue",
        width: 75,
        height: 30,
        borderRadius: 25
    },
    lastMessageDate: {
        color: '#999',
        fontSize: 12,
    },
});

export default Friends