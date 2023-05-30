export interface IFlightRequest {
    WhereFrom: string;
    Where: string;
    MonthFrom: string;
    DayFrom: string;
    MonthAnd: string;
    DayAnd: string;
    Adults: string;
    TravelClass: string;
}

export interface IFlightResponse {
    Id: number;
    FromAirline: string;
    BackAirline: string;
    FromDepartureTime: string;
    FromArrivalTime: string;
    BackDepartureTime: string;
    BackArrivalTime: string;
    FromTimeline: string;
    BackTimeline: string;
    FromTypeFlight: string;
    BackTypeFlight: string;
    FromDepartureAirport: string;
    FromArrivalAirport: string;
    BackDepartureAirport: string;
    BackArrivalAirport: string;
    Price: string;
}

export interface IHotelRequest {
    City: string;
    NameMonthFrom: string;
    DayFrom: string;
    NameMonthAnd: string;
    DayAnd: string;
    CountPersons: string;
}

export interface IHotelsResponse {
    Id: number;
    Name: string;
    CountStars: string;
    Type: string;
    Position: string;
    Tags: string[];
    CountNights: string;
    Price: string;
    SrcImages: string[];
}