import { Dispatch, SetStateAction } from 'react'
import { IOperationResult } from '../interfaces/operationResult';
import { ICreateTravel, IResponseTravel, ITravel } from '../interfaces/travel';

export interface ITravelContext {
    travel: ITravel;
    travels: ITravel[];
    setTravels: any;
    setTravel: any;
    getTravel: (key: number) => Promise<void>;
    isLoading: boolean;
    getTravels: (skip: number, take: number, searchValue: number) => Promise<void>;
    createTravel: (JourneyRequest: ICreateTravel) => Promise<IOperationResult<number>>;
    error: string | null;
    setError: Dispatch<SetStateAction<string | null>>;
    clearError: () => void;
}