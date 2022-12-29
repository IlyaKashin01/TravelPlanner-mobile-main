import { createContext, FC, ReactNode, useMemo } from "react";
import { ICoordinatesContext } from "../contexts/ICoordinatesContext";
import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { ICoordinates, ICreateCoordinate } from "../interfaces/coordinates";
import { API_HOST } from "../apiHost";
import { IOperationResult } from "../interfaces/operationResult";
import axios, { AxiosError } from 'axios';

export const CoordinatesContext = createContext<ICoordinatesContext>({} as ICoordinatesContext);
type Props = { children: ReactNode };

const CoordinatesProvider: FC<Props> = ({ children }) => {
    const [coordinates, setCoordinates] = useState<ICoordinates[]>();
    const [JourneyId, setJourneyId] = useState<number>(31);

    const getCoordinates = async ()
        : Promise<void> => {
        try {
            const { data } = await axios
                .get<IOperationResult<any>>(
                    `${API_HOST}coordinates/getAllCoordinates/${JourneyId}`,
                    // {
                    //     headers: {
                    //         Authorization: `Bearer ${token}`,
                    //     },
                    // }
                )

                .then((x) => {
                    //console.log(x.data.result?.items);
                    return x;
                });
            setCoordinates(data?.result);
            console.log(data);
        } catch (e) {
            console.log(e);
        } finally {
        }
    }

    const createCoordinates = async (request: ICreateCoordinate): Promise<IOperationResult<number>> => {
        try {

            const { data } = await axios.post<IOperationResult<number>>(
                `${API_HOST}coordinates/createCoordinates`,
                {
                    ...request,
                },

            )
            console.log(data.message)
            return data;
        } catch (e) {
            const error = e as AxiosError<IOperationResult<any> | null | undefined>;
            return error.response?.data!;
        } finally {

        }
    }

    const value = useMemo(() => ({
        coordinates,
        JourneyId,
        setJourneyId,
        getCoordinates,
        createCoordinates,
    }), [coordinates, JourneyId, setJourneyId, getCoordinates, createCoordinates])
    return (
        <CoordinatesContext.Provider value={value}>{children}</CoordinatesContext.Provider>
    )
}

export default CoordinatesProvider