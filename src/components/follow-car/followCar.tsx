import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import { LatLngTuple } from 'leaflet';

interface FollowCarProps {
  position: LatLngTuple;
}

export const FollowCar = ({ position }: FollowCarProps) => {
  const map = useMap();

  useEffect(() => {
    map.panTo(position);
  }, [position, map]);

  return null;
};
