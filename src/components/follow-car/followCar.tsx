import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import { FollowCarProps } from '../../types/followCar';

export const FollowCar = ({ position }: FollowCarProps) => {
  const map = useMap();

  useEffect(() => {
    map.panTo(position);
  }, [position, map]);

  return null;
};
