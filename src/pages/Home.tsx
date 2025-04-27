import { useState } from 'react';
import { Mapa } from '../components/mapa/Mapa';
import { useGpsData } from '../hooks/useGpsData';
import gpsJson from '../data/frontend_data_gps.json';

export const Home = () => {
  const [selectedCourse, setSelectedCourse] = useState(0); 
  const { position, direction, startAnimation, stopAnimation, isPlaying } = useGpsData(selectedCourse);

  return (
    <>
      <div style={{ marginBottom: 20 }}>
        <label>Selecione o trajeto desejado: </label>
        <select 
          value={selectedCourse} 
          onChange={(e) => {
            stopAnimation();         
            setSelectedCourse(Number(e.target.value));
          }}
        >
          {Array.from({ length: gpsJson.courses.length }).map((_, index) => (
            <option key={index} value={index}>
              Rota {index + 1}
            </option>
          ))}
        </select>
        <button onClick={startAnimation} disabled={isPlaying} style={{ marginLeft: 10 }}>
          Inicar trajeto
        </button>
        <button onClick={stopAnimation} disabled={!isPlaying} style={{ marginLeft: 10 }}>
          Parar
        </button>
      </div>

      {position && (
        <Mapa position={position} direction={direction} />
      )}
    </>
  );
};
