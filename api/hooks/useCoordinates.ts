import { useContext } from 'react';
import { CoordinatesContext } from '../providers/CoordinatesProvider';

export const useCoordinate = () => useContext(CoordinatesContext);