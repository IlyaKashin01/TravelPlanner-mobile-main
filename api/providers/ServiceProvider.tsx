import { createContext, FC, ReactNode, useMemo } from "react";
import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { ICoordinates, ICreateCoordinate } from "../interfaces/coordinates";
import { API_HOST } from "../apiHost";
import { IOperationResult } from "../interfaces/operationResult";
import axios, { AxiosError } from 'axios';
import { IServiceContext } from "../contexts/IServiceContext";
import { ICreateService, IService } from "../interfaces/service";

export const ServiceContext = createContext<IServiceContext>({} as IServiceContext);
type Props = { children: ReactNode };

const ServiceProvider: FC<Props> = ({ children }) => {
    const [services, setServices] = useState<IService[]>();
    const [TravelId, setTravelId] = useState<number>();
    const [cost, setCost] = useState<number>();

    const getServices = async (skip?: number, take?: number, searchValue?: number)
        : Promise<void> => {
        try {
            const { data } = await axios
                .get<IOperationResult<any>>(
                    `${API_HOST}service/getAllServices?_skip=${skip}&_take=${take}&_searchValue=${TravelId}`,
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
            setServices(data?.result.items);
            console.log(data);
        } catch (e) {
            console.log(e);
        } finally {
        }
    }

    const createService = async (request: ICreateService): Promise<IOperationResult<number>> => {
        try {

            const { data } = await axios.post<IOperationResult<number>>(
                `${API_HOST}service/createService`,
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

    const getResult = () => {
        const { data }: any = axios.post<IOperationResult<number>>(
            `${API_HOST}service/getSumm?id=${TravelId}`,


        )
        setCost(data?.result);
        return data;
    }
    const value = useMemo(() => ({
        services,
        TravelId,
        cost,
        setTravelId,
        getServices,
        getResult,
        createService,
    }), [services, TravelId, cost, setTravelId, getServices, getResult, createService])
    return (
        <ServiceContext.Provider value={value}>{children}</ServiceContext.Provider>
    )
}

export default ServiceProvider