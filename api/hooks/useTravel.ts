import { useContext } from 'react';
import { TravelContext } from '../providers/TravelProvider';

export const useTravel = () => useContext(TravelContext);