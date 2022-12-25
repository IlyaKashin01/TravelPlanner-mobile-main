import React from "react";
import { TouchableOpacity, ScrollView } from "react-native";

import PostIcon from "../../assets/images/post.png";
import ReplyIcon from "../../assets/images/reply.png";
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