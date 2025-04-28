import { LatLngTuple } from "leaflet";

export interface MapaProps {
  position: LatLngTuple;
  direction: number;
  vehicleStatus: 'moving' | 'stopped_on' | 'stopped_off';
  zoom?: number;
}