import { DivIcon } from 'leaflet';
import carSprite from '../assets/images/cars.png';

export const CarIcon = (direction: number, vehicleStatus: 'moving' | 'stopped_on' | 'stopped_off') => {
  const totalFrames = 120;
  const frameWidth = 20;
  const frameHeight = 20;

  const correctedDirection = (-direction + 360) % 360;
  const frame = Math.round(correctedDirection / 3) % totalFrames;

  return new DivIcon({
    className: `car ${vehicleStatus}`,
    html: `<div class="car ${vehicleStatus}" style="
      width: ${frameWidth}px;
      height: ${frameHeight}px;
      background-image: url(${carSprite});
      background-size: ${frameWidth * totalFrames}px ${frameHeight}px;
      background-position: -${frame * frameWidth}px 0;
    "></div>`,
    iconSize: [frameWidth, frameHeight],
    iconAnchor: [frameWidth / 2, frameHeight / 8],
    popupAnchor: [0, -frameHeight / 2],
  });
};
