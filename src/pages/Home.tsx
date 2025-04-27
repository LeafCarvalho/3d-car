import { useState } from 'react';
import { Mapa } from '../components/mapa/Mapa';
import { useGpsData } from '../hooks/useGpsData';
import gpsJson from '../data/frontend_data_gps.json';
import { useTranslation } from 'react-i18next';

export const Home = () => {
  const [selectedCourse, setSelectedCourse] = useState(0); 
  const { position, direction, startAnimation, stopAnimation, isPlaying, vehicleStatus } = useGpsData(selectedCourse);
  const { t } = useTranslation();

  return (
    <>
      <div style={{ marginBottom: 20 }}>
        <label>{t('home.select_route')}</label>
        <select 
          value={selectedCourse} 
          onChange={(e) => {
            stopAnimation();         
            setSelectedCourse(Number(e.target.value));
          }}
        >
          {Array.from({ length: gpsJson.courses.length }).map((_, index) => (
            <option key={index} value={index}>
              {t('home.route')} {index + 1}
            </option>
          ))}
        </select>
        <button onClick={startAnimation} disabled={isPlaying} style={{ marginLeft: 10 }}>
          {t('home.startRouteMessage')}
        </button>
        <button onClick={stopAnimation} disabled={!isPlaying} style={{ marginLeft: 10 }}>
          {t('home.stopRouteMessage')}
        </button>
      </div>

      {position && (
        <Mapa position={position} direction={direction} vehicleStatus={vehicleStatus} />
      )}
    </>
  );
};
