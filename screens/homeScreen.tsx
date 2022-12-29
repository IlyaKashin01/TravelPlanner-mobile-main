import React, { useEffect } from "react";
import { TouchableOpacity, ScrollView } from "react-native";
import { useAuth } from "../api/hooks/useAuth";
import PostCard from "../components/postCard";


const HomeScreen: React.FC = () => {
    return (
        <ScrollView>
            <PostCard></PostCard>
            <PostCard></PostCard>
            <PostCard></PostCard>
        </ScrollView>
    );
};

export default HomeScreen;