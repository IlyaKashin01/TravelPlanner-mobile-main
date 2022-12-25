import { View, Text } from 'react-native'
import React from 'react'
import ChatList from '../components/chat/chatList'

const ChatScreen = () => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ChatList />
        </View>
    )
}

export default ChatScreen