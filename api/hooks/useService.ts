import { ServiceContext } from "../providers/ServiceProvider";
import { useContext } from 'react'

export const useService = () => useContext(ServiceContext);