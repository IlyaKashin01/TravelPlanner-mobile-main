import axios from 'axios';
import React, {
    createContext,
    Dispatch,
    FC,
    ReactNode,
    SetStateAction,
    useMemo,
    useState,
} from 'react';
import {
    IAuthRequest,
    IAuthResponse,
    IPerson,
    ISignUpRequest,
} from '../interfaces/auth';
import { IOperationResult } from '../interfaces/operationResult';
import { API_HOST } from '../apiHost';
import * as SecureStore from 'expo-secure-store';
import { IAuthContext } from '../contexts/IAuthContext';

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

type Props = { children: ReactNode };

export const AuthProvider: FC<Props> = ({ children }) => {
    const [user, setUser] = useState<IPerson | null>();

    const [isLoading, setIsLoading] = useState(false);

    const [error, setError] = useState<string | null>(null);

    const clearError = () => setError(null);

    const registration = async (
        regRequest: ISignUpRequest
    ): Promise<boolean> => {
        try {
            setIsLoading(true);
            console.log(`${API_HOST}auth/signup`);
            const { data } = await axios
                .post<IOperationResult<number>>(
                    `${API_HOST}auth/signup`,
                    regRequest
                )
                .then(resp => resp);

            if (data.success) {
                return true;
            }

            return false;
        } catch (e: any) {
            setError(e?.response?.data?.message);
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    const login = async (authRequest: IAuthRequest) => {
        try {
            setIsLoading(true);
            const { data } = await axios
                .post<IOperationResult<IAuthResponse>>(
                    `${API_HOST}auth/signin`,
                    authRequest
                )
                .then(resp => resp);

            if (data.success) {
                setUser(data?.result?.person);

                await SecureStore.setItemAsync('token', data.result!.token);
            }
        } catch (e: any) {
            setError(e?.response?.data?.message);
        } finally {
            setIsLoading(false);
        }
    };

    const logout = async () => {
        setUser(null);

        await SecureStore.deleteItemAsync('token');
    };

    const getToken = async (): Promise<string | null> => {
        try {
            return await SecureStore.getItemAsync('token').then(token => token);
        } catch (e: any) {
            return null;
        }
    };

    const value = useMemo(
        () => ({
            user,
            isLoading,
            login,
            registration,
            logout,
            getToken,
            error,
            clearError,
            setError,
        }),
        [user, isLoading, error, setError]
    );
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
