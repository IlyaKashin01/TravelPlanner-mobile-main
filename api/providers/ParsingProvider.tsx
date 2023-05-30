import { FC, ReactNode, createContext, useMemo, useState } from "react";
import { IParsingContext } from "../contexts/IParsincContext";
import { IFlightRequest, IFlightResponse, IHotelRequest, IHotelsResponse } from "../interfaces/parsing";
import { IOperationResult } from "../interfaces/operationResult";
import axios, { AxiosError } from 'axios';
import { API_HOST } from "../apiHost";

export const ParsingContext = createContext<IParsingContext>({} as IParsingContext);

type Props = { children: ReactNode };

const TravelProvider: FC<Props> = ({ children }) => {
    const [flights, setFlights] = useState<IFlightResponse[]>();
    const [hotels, setHotels] = useState<IHotelsResponse[]>();
    const [isLoading, setIsLoading] = useState<Boolean>(false);
    const [error, setError] = useState<string | null>(null);
    //const { getToken, token } = useAuth();

    const clearError = () => setError(null);

    const getFlights = async (request: IFlightRequest): Promise<IOperationResult<IFlightResponse[]>> => {
        try {
            //getToken();
            setFlights(null)
            setIsLoading(true)
            const { data } = await axios
                .post<IOperationResult<any>>(
                    `${API_HOST}parsing/parseFlights`,
                    {
                        ...request,
                    },
                    // {
                    //     headers: {
                    //         Authorization: `Bearer ${token}`,
                    //     },
                    // }
                )
            setFlights(data?.result);
            if (data?.message) setError(data.message);
            console.log(flights);
            return data;
        } catch (e) {
            //console.log(getToken());
        } finally {
            setIsLoading(false);
        }
    }
    const getHotels = async (request: IHotelRequest): Promise<IOperationResult<IHotelsResponse[]>> => {
        try {
            //getToken();
            setHotels(null)
            setIsLoading(true)
            const { data } = await axios
                .post<IOperationResult<any>>(
                    `${API_HOST}parsing/parseHotels`,
                    {
                        ...request,
                    },
                    // {
                    //     headers: {
                    //         Authorization: `Bearer ${token}`,
                    //     },
                    // }
                )
            setHotels(data?.result);
            if (data?.message) setError(data.message);
            console.log(hotels);
            return data;
        } catch (e) {
            //console.log(getToken());
        } finally {
            setIsLoading(false);
        }
    }
    const value = useMemo(() =>
    ({
        flights,
        getFlights,
        hotels,
        getHotels,
        isLoading,
        error
    }), [flights, getFlights, hotels, getHotels, isLoading, error])
    return <ParsingContext.Provider value={value}>{children}</ParsingContext.Provider>
}

export default TravelProvider