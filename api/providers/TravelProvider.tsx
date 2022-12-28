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

export const TravelContext = createContext<ITravelContext>({} as ITravelContext);

type Props = { children: ReactNode };

const TravelProvider: FC<Props> = ({ children }) => {
    const [travel, setTravel] = useState<ITravel | null>();
    const [travels, setTravels] = useState<ITravel[]>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const clearError = () => setError(null);

    const getTravels = async (skip?: number, take?: number, searchValue?: number)
        : Promise<void> => {
        try {
            const { data } = await axios
                .get<IOperationResult<any>>(
                    `${API_HOST}journey/getAllJourney?_skip=${skip}&_take=${take}&_searchValue=${searchValue}`,
                    {
                        headers: {
                            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9zaWQiOiIyIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoidXNlciIsImV4cCI6MTY3Mjg1ODg1MSwiaXNzIjoiYXV0aFNlcnZlciIsImF1ZCI6ImF1dGhDbGllbnQifQ.3uzH4ti-f_jKV0xfuJum9HK7BHS3WJ52_F_-VJn9g2M`,
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
            console.log(e);
        } finally {
        }
    }

    const createTravel = async (JourneyRequest: ICreateTravel): Promise<IOperationResult<number>> => {
        try {

            const { data } = await axios.post<IOperationResult<number>>(
                `http://192.168.1.56:7143/api/journey/createJourney`,
                {
                    ...JourneyRequest,
                },
                {
                    headers: {
                        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9zaWQiOiIyIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoidXNlciIsImV4cCI6MTY3Mjg1ODg1MSwiaXNzIjoiYXV0aFNlcnZlciIsImF1ZCI6ImF1dGhDbGllbnQifQ.3uzH4ti-f_jKV0xfuJum9HK7BHS3WJ52_F_-VJn9g2M`,
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