import { StyleSheet, TextInput, TouchableOpacity, View, Text, Image, FlatList, SafeAreaView, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react'
import ChatHub from './chat/chatHub';
import { SimpleLineIcons } from '@expo/vector-icons';
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import { useFriends } from '../api/hooks/useFriends';
import { useAuth } from '../api/hooks/useAuth';
import { AntDesign } from '@expo/vector-icons';
import { IFriendRequest } from '../api/interfaces/friends';

const Friends = () => {
    const { friends, getFriends, searchResult, search, addFriend, isLoading } = useFriends();
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
                        <Text style={styles.chatName}>{item.firstName} {item.lastName}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    const [searchValue, setSearchValue] = useState<string>("");
    const [friendRequest, setFriendRequest] = useState<IFriendRequest>({} as IFriendRequest);
    const sendRequest = (personOne: number, personTwo: number) => {
        setFriendRequest({ ...friendRequest, personOne: personOne, personTwo: personTwo });
        addFriend(friendRequest);
    }
    return (
        <GestureHandlerRootView style={styles.container}>
            <View style={styles.searchContainer}>
                <TextInput style={styles.searchInput} placeholder="Search" value={searchValue} onChangeText={(value) => setSearchValue(value)} />
                <TouchableOpacity style={styles.filterButton} onPress={() => search(searchValue)}>
                    <AntDesign name="search1" size={15} color="black" />
                </TouchableOpacity>
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
                isLoading === true ?
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', top: 15 }}>
                        <ActivityIndicator size="large" color="blue" />
                    </View>
                    :
                    <ScrollView>
                        {searchResult?.addedFriendResult.length !== 0 &&
                            <View style={{ backgroundColor: "white", alignItems: 'center', justifyContent: 'center', borderBottomWidth: 1, borderColor: "blue" }}>
                                <Text style={{ fontSize: 18, color: 'blue', padding: 5 }}>Друзья</Text>
                            </View>}

                        {searchResult?.addedFriendResult.map((item) => (
                            <TouchableOpacity >
                                <View style={styles.chatItem} key={item.id}>

                                    <View style={styles.avatarContainer}>
                                        <Image source={{ uri: `data:image/jpeg;base64,${item.avatar}` }} style={styles.avatar} />
                                    </View>
                                    <View style={styles.chatInfo}>
                                        <Text style={styles.chatName}>{item.login}</Text>
                                        <Text style={styles.chatName}>{item.firstName} {item.lastName}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        ))}

                        {searchResult?.noAddedFriendResult.length !== 0 &&
                            <View style={{ backgroundColor: "white", alignItems: 'center', justifyContent: 'center', borderBottomWidth: 1, borderColor: "blue" }}>
                                <Text style={{ fontSize: 18, color: 'blue', padding: 5 }}>Поиск</Text>
                            </View>}

                        {searchResult?.noAddedFriendResult.map((item) => (
                            <TouchableOpacity >
                                <View style={styles.chatItem} key={item.id}>

                                    <View style={styles.avatarContainer}>
                                        <Image source={{ uri: `data:image/jpeg;base64,${item.avatar}` }} style={styles.avatar} />
                                    </View>
                                    <View style={styles.chatInfo}>
                                        <Text style={styles.chatName}>{item.login}</Text>
                                        <Text style={styles.chatName}>{item.firstName} {item.lastName}</Text>
                                    </View>
                                    <TouchableOpacity style={styles.button} onPress={() => sendRequest(user.id, item.id)}>
                                        <Text style={styles.lastMessageDate}>Добавить</Text>
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
        marginRight: 5,
    },
    filterButton: {
        backgroundColor: 'white',
        borderRadius: 20,
        marginRight: 15,
        paddingHorizontal: 15,
        paddingVertical: 15,
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