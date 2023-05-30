import { useContext } from "react";
import { FriendContext } from "../providers/FriendProvider";

export const useFriends = () => useContext(FriendContext);