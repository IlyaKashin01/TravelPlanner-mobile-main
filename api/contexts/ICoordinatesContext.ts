import { ICoordinates, ICreateCoordinate } from "../interfaces/coordinates";

export interface ICoordinatesContext {
    coordinates: ICoordinates[];
    JourneyId: number;
    setJourneyId: any;
    getCoordinates: (Id: number) => Promise<any>;
    createCoordinates: (requestCoordinates: ICreateCoordinate) => Promise<any>;
}