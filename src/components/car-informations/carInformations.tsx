import { useTranslation } from "react-i18next";
import gpsJson from "../../data/frontend_data_gps.json";

export const CarInformations = () => {
  const { t } = useTranslation();

  return (
    <div className="car-informations">
      <h3 className="car-informations__plate">{gpsJson.vehicle.plate}</h3>
      <div className="car-informations__image-wrapper">
        <img 
          src={gpsJson.vehicle.picture.address} 
          alt="Vehicle" 
          className="car-informations__image"
        />
      </div>
      <div className="car-informations__info">
        <strong>VIN:</strong> {gpsJson.vehicle.vin}
      </div>
      <div className="car-informations__info">
        <strong>{t('home.colorCar')}:</strong> 
        <span 
          className="car-informations__color" 
          style={{ backgroundColor: gpsJson.vehicle.color }}
        />
      </div>
    </div>
  );
};
