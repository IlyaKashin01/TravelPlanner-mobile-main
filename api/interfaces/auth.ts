export interface IPerson {
    id: number,
    login: string,
    firstName?: string,
    lastName?: string,
    middleName?: string,
    email?: string,
    phone?: string,
}

export interface IAuthRequest {
    login: string,
    password: string,
}

export interface IAuthResponse {
    person: IPerson,
    token: string,
}

export interface ISignUpRequest {
    login: string,
    firstName: string,
    lastName: string,
    middleName: string,
    password: string,
    email?: string,
    phone?: string,
}

