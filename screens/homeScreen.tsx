import React, { useEffect } from "react";
import { TouchableOpacity, ScrollView } from "react-native";
import { useAuth } from "../api/hooks/useAuth";
import PostCard from "../components/postCard";


const HomeScreen: React.FC = () => {
    const { logout } = useAuth()
    useEffect(() => { logout() }, [])
    return (
        <ScrollView>
            <PostCard></PostCard>
            <PostCard></PostCard>
            <PostCard></PostCard>
        </ScrollView>
    );
};

export default HomeScreen;