import { IFriendRequest, IFriendResponse, ISearchResult } from "../interfaces/friends";
import { IOperationResult } from "../interfaces/operationResult";

export interface IFriendContext {
    friends: IFriendResponse[];
    searchResult: ISearchResult;
    isLoading: Boolean;
    getFriends: (skip: number, take: number, searchIntValue: number) => Promise<any>;
    search: (searchValue: string) => Promise<ISearchResult>;
    addFriend: (request: IFriendRequest) => Promise<IOperationResult<Boolean>>;
}