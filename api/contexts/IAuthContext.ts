import { IAuthRequest, IPerson, ISignUpRequest } from "../interfaces/auth";
import { Dispatch, SetStateAction } from 'react'
import { useState } from 'react'

export interface IAuthContext {
    user: IPerson | null | undefined;
    token: string;
    isLoading: boolean;
    login: (authRequest: IAuthRequest) => Promise<any>;
    registration: (signUpRequest: ISignUpRequest) => Promise<boolean>;
    logout: () => Promise<void>;
    getToken: () => Promise<string | null>;
    error: string | null;
    setError: Dispatch<SetStateAction<string | null>>;
    clearError: () => void;
}