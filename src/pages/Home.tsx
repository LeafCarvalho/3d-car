import { useState } from 'react'
import { Map } from '../components/map/Map'
import { useGpsData } from '../hooks/useGpsData'
import { RouteSelector } from '../components/route-selector/routeSelector'

export const Home = () => {
  const [selectedCourse, setSelectedCourse] = useState(0); 
  const { position, direction, startAnimation, stopAnimation, isPlaying, vehicleStatus } = useGpsData(selectedCourse);

  return (
    <>
      <RouteSelector
        selectedCourse={selectedCourse}
        setSelectedCourse={setSelectedCourse}
        startAnimation={startAnimation}
        stopAnimation={stopAnimation}
        isPlaying={isPlaying}
      />
      {position && (
        <Map position={position} direction={direction} vehicleStatus={vehicleStatus} />
      )}
    </>
  );
};
