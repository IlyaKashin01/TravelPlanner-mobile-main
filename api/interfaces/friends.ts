export interface IFriendRequest {

}



export interface IFriendResponse {
    id: number;
    personOne: number;
    personTwo: number;
    status: any;
    login: string;
    firstName: string;
    lastName: string;
    middleName: string;
    avatar: any
}

export interface ISearchResult {
    addedFriendResult: IFriendResponse[];
    noAddedFriendResult: IFriendResponse[];
}