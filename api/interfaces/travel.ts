export interface ITravel {
    id: number,
    name: string,
    description: string,
    dateStart: Date,
    dateEnd: Date,
    categoryId: number,
}

export interface ICreateTravel {
    name: string,
    description: string,
    dateStart: Date,
    dateEnd: Date,
    categoryId: number,
    personId: number,
}

export interface IResponseTravel {
    id: number,
    name: string,
    description: string,
    dateStart: Date,
    dateEnd: Date,
    categoryId: number,
    //personId: number,
}