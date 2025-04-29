import { useTranslation } from 'react-i18next'
import gpsJson from "../../data/frontend_data_gps.json"
import { RouteSelectorProps } from '../../types/routeSelector';

export const RouteSelector = ({ selectedCourse, setSelectedCourse, startAnimation, stopAnimation, isPlaying }: RouteSelectorProps) => {
  const { t } = useTranslation();

  const handleStart = () => {
    startAnimation();
    setTimeout(() => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="route-selector">
      <label className="select-route-message">{t('home.select_route')}</label>
      <select 
        value={selectedCourse}
        className="select-route-dropdown"
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
      <button className="start" onClick={handleStart} disabled={isPlaying}>
        {t('home.startRouteMessage')}
      </button>
      <button className="stop" onClick={stopAnimation} disabled={!isPlaying}>
        {t('home.stopRouteMessage')}
      </button>
    </div>
  );
};
