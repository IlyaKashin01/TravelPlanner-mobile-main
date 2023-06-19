import { FC, ReactNode, createContext, useMemo, useState } from "react";
import { IOperationResult } from "../interfaces/operationResult";
import axios, { AxiosError } from 'axios';
import { API_HOST } from "../apiHost";
import { IFriendContext } from "../contexts/IFriendContext";
import { IFriendRequest, IFriendResponse, ISearchResult } from "../interfaces/friends";
import { useAuth } from "../hooks/useAuth";

export const FriendContext = createContext<IFriendContext>({} as IFriendContext);

type Props = { children: ReactNode };

const FriendProvider: FC<Props> = ({ children }) => {
    const [friends, setFriends] = useState<IFriendResponse[]>();
    const [searchResult, setSearchResult] = useState<ISearchResult>();
    const [isLoading, setIsLoading] = useState<Boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const { getToken, token } = useAuth();

    const clearError = () => setError(null);

    const getFriends = async (skip: number, take: number, searchIntValue: number): Promise<any> => {
        try {
            getToken();
            setIsLoading(true);
            const { data } = await axios
                .get<IOperationResult<any>>(
                    `${API_HOST}friend/getAllFriends?skip=${skip}&take=${take}&searchIntValue=${searchIntValue}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                ).then((x) => {
                    console.log(x.data.result?.items);
                    return x;
                });
            setFriends(data?.result?.items);
        } catch (e) {
            //console.log(getToken());
        } finally {
            setIsLoading(false);
        }
    }

    const search = async (searchValue: string): Promise<ISearchResult> => {
        try {
            getToken();
            setIsLoading(true);
            const { data } = await axios
                .get<IOperationResult<ISearchResult>>(
                    `${API_HOST}friend/searchFriends?searchValue=${searchValue}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                ).then((x) => {
                    console.log(x.data.result);
                    return x;
                });
            setSearchResult(data?.result);
            return searchResult;
        } catch (e) {
            //console.log(getToken());
        } finally {
            setIsLoading(false);
        }
    }
    const addFriend = async (request: IFriendRequest): Promise<IOperationResult<Boolean>> => {
        try {
            getToken();
            setIsLoading(true);
            const { data } = await axios
                .post<IOperationResult<Boolean>>(
                    `${API_HOST}friend/addFriend`,
                    {
                        ...request
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                )
            if (data) setIsLoading(false);
            return data;
        }
        catch (e) {

        }
        finally {
            setIsLoading(false);
        }
    }
    const value = useMemo(() =>
    ({
        friends,
        getFriends,
        searchResult,
        search,
        addFriend,
        isLoading,
    }), [friends, getFriends, searchResult, search, addFriend, isLoading])
    return <FriendContext.Provider value={value}>{children}</FriendContext.Provider>
}

export default FriendProvider