import { Double } from "react-native/Libraries/Types/CodegenTypes";

export interface ICoordinates {
    Id: number;
    Latitube: Double,
    Longitude: Double,
    JourneyId: number,
}

export interface ICreateCoordinate {
    Latitube: Double,
    Longitude: Double,
    journeyId: number,
}

export interface ICoordinatesResponse {
    Id: number;
    Latitube: Double,
    Longitude: Double,
    JourneyId: number,
}