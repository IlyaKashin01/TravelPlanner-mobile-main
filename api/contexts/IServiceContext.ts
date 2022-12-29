import { ICreateService, IService } from "../interfaces/service";
export interface IServiceContext {
    services: IService[];
    TravelId: number;
    setTravelId: any;
    cost: number;
    getResult: () => Promise<any>;
    createService: (requestService: ICreateService) => Promise<any>;
    getServices: (skip: number, take: number, searchValue: number) => Promise<void>;
}