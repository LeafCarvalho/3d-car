import { DivIcon } from 'leaflet';
import carSprite from '../assets/images/cars.png';

export const CarIcon = (direction: number) => {
  const totalFrames = 120;
  const frameWidth = 30;
  const frameHeight = 30;

  const frame = Math.round(direction / 3) % totalFrames;

  return new DivIcon({
    className: '',
    html: `<div style="
      width: ${frameWidth}px;
      height: ${frameHeight}px;
      background-image: url(${carSprite});
      background-size: ${frameWidth * totalFrames}px ${frameHeight}px;
      background-position: -${frame * frameWidth}px 0;
    "></div>`,
    iconSize: [frameWidth, frameHeight],
    iconAnchor: [frameWidth / 2, frameHeight / 2],
    popupAnchor: [0, -frameHeight / 2],
  });
};
