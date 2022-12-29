import { Double } from "react-native/Libraries/Types/CodegenTypes";

export interface IService {
    Name: string;
    Description: string;
    Cost: Double;
    JourneyId: number;
}


export interface ICreateService {
    Name: string;
    Description: string;
    Cost: Double;
    JourneyId: number;
}

export interface IServiceResponse {
    Id: number;
    Name: string;
    Description: string;
    Cost: Double;
}