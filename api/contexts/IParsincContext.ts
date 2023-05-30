import { IOperationResult } from "../interfaces/operationResult";
import { IFlightRequest, IFlightResponse, IHotelRequest, IHotelsResponse } from "../interfaces/parsing";

export interface IParsingContext {
    flights: IFlightResponse[];
    hotels: IHotelsResponse[]
    isLoading: Boolean;
    error: string | null;
    getFlights: (request: IFlightRequest) => Promise<IOperationResult<IFlightResponse[]>>;
    getHotels: (request: IHotelRequest) => Promise<IOperationResult<IHotelsResponse[]>>;
}