import axios, { AxiosError } from 'axios';
import React, {
    Children,
    createContext,
    Dispatch,
    FC,
    ReactNode,
    SetStateAction,
    useMemo,
    useState,
} from 'react';
import { IOperationResult } from '../interfaces/operationResult';
import { API_HOST } from '../apiHost';
import * as SecureStore from 'expo-secure-store';
import { ITravelContext } from '../contexts/ITravelContext';
import { ICreateTravel, ITravel } from '../interfaces/travel';
import { IPagination } from '../interfaces/pagination';
import { useAuth } from '../hooks/useAuth';

export const TravelContext = createContext<ITravelContext>({} as ITravelContext);

type Props = { children: ReactNode };

const TravelProvider: FC<Props> = ({ children }) => {
    const [travel, setTravel] = useState<ITravel | null>();
    const [travels, setTravels] = useState<ITravel[]>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { getToken, token } = useAuth();

    const clearError = () => setError(null);

    const getTravels = async (skip?: number, take?: number, searchValue?: number)
        : Promise<void> => {
        try {
            getToken();
            const { data } = await axios
                .get<IOperationResult<any>>(
                    `${API_HOST}journey/getAllJourney?_skip=${skip}&_take=${take}&_searchValue=${searchValue}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                )

                .then((x) => {
                    //console.log(x.data.result?.items);
                    return x;
                });
            setTravels(data?.result?.items);
            console.log(data);
        } catch (e) {
            console.log(getToken());
        } finally {
        }
    }

    const createTravel = async (JourneyRequest: ICreateTravel): Promise<IOperationResult<number>> => {
        try {
            getToken();
            const { data } = await axios.post<IOperationResult<number>>(
                `http://192.168.1.56:7143/api/journey/createJourney`,
                {
                    ...JourneyRequest,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            if (data) setIsLoading(true);
            //console.log(...JourneyRequest)
            return data;
        } catch (e) {
            const error = e as AxiosError<IOperationResult<any> | null | undefined>;

            if (error.response?.status === 403) {
                setError('У вас недостаточно прав');
            } else {
                setError(error.response?.data?.message);
            }

            return error.response?.data!;
        } finally {
            setIsLoading(false);
        }
    }

    const value = useMemo(() =>
    ({
        travel,
        travels,
        setTravels,
        isLoading,
        getTravels,
        createTravel,
        error,
        setError,
        clearError,
    }), [travel, travels, setTravels, isLoading, getTravels, createTravel, error, setError, clearError])
    return <TravelContext.Provider value={value}>{children}</TravelContext.Provider>
}

export default TravelProvider