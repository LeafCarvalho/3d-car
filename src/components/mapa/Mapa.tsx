import { LatLngTuple } from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { CarIcon } from '../../utils/carIcon';
import { FollowCar } from '../follow-car/followCar';
interface MapaProps {
  position: LatLngTuple;
  direction: number;
  zoom?: number;
}

export const Mapa = ({ position, direction, zoom = 18 }: MapaProps) => {

  return (
    <MapContainer
      center={position}
      zoom={zoom}
      scrollWheelZoom={false}
      style={{ height: '100vh', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <FollowCar position={position} />

      <Marker position={position} icon={CarIcon(direction)}>
        <Popup>
          Localização Atual
        </Popup>
      </Marker>
    </MapContainer>
  );
};