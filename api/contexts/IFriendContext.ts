import { IFriendResponse } from "../interfaces/friends";
import { IOperationResult } from "../interfaces/operationResult";

export interface IFriendContext {
    friends: IFriendResponse[];
    isLoading: Boolean;
    getFriends: (skip: number, take: number, searchIntValue: number) => Promise<any>;
}