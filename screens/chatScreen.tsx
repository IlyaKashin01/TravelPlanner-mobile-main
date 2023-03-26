import { View, Text, TouchableOpacity, Image, FlatList, TextInput } from 'react-native'
import React from 'react'

interface Props {
    item: any
}

const ChatScreen: React.FC<Props> = ({ item }) => {
    const messages = [
        { id: 1, text: 'Привет', sender: 'me' },
        { id: 2, text: 'Привет, как дела?', sender: 'other' },
        { id: 3, text: 'Хорошо, а у тебя?', sender: 'me' },
        { id: 4, text: 'Тоже неплохо', sender: 'other' },
    ];

    const MessageItem = ({ message }) => {
        const isMe = message.sender === 'me';
        return (
            <View style={{ flexDirection: isMe ? 'row-reverse' : 'row', alignItems: 'center', marginBottom: 10 }}>
                <View style={{ backgroundColor: isMe ? 'blue' : 'gray', padding: 10, borderRadius: 10 }}>
                    <Text style={{ color: 'white' }}>{message.text}</Text>
                </View>
            </View>
        );
    };

    return (
        <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
                <Image source={item.avatar} style={{ width: 50, height: 50, borderRadius: 25 }} />
                <Text style={{ marginLeft: 10, fontSize: 18, fontWeight: 'bold' }}>{item.name}</Text>
            </View>
            <FlatList
                data={messages}
                renderItem={({ item }) => <MessageItem message={item} />}
                keyExtractor={(item) => item.id.toString()}
                style={{ flex: 1 }}
                contentContainerStyle={{ paddingVertical: 10 }}
            />
            <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
                <TextInput
                    placeholder="Введите сообщение"
                    style={{ flex: 1, marginRight: 10, padding: 10, borderWidth: 1, borderRadius: 10, borderColor: 'gray' }}
                />
                <TouchableOpacity style={{ backgroundColor: 'blue', padding: 10, borderRadius: 10 }}>
                    <Text style={{ color: 'white', fontWeight: 'bold' }}>Отправить</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default ChatScreen