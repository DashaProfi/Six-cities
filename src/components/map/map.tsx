import { useRef, useEffect } from 'react';
import { CardListType, CardOneType, CityType } from '../../types/cardInfo';
import { URL_MARKER_DEFAULT, URL_MARKER_CURRENT } from '../../const/const';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import useMap from '../../hooks/useMap';

type MapProps = {
  city: CityType;
  offersOneCity: CardListType;
  selectedPoint: CardOneType | undefined;
  classIn: string;
  styleIn: {
    height: string;
    minHeight: string;
  };
};

const { Icon, Marker } = leaflet;

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [40, 40],
  iconAncor: [20, 20],
});

const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [40, 40],
  iconAncor: [20, 20],
});

function Map({
  city,
  offersOneCity,
  classIn,
  styleIn,
  selectedPoint,
}: MapProps): JSX.Element {
  const mapRef = useRef<HTMLElement | null>(null);
  const map = useMap(mapRef, city);
  const markersLayer = new leaflet.LayerGroup();

  useEffect(() => {
    if (map) {
      offersOneCity.forEach((item) => {
        const marker = new Marker({
          lat: item.location.latitude,
          lng: item.location.longitude,
        });

        marker.setIcon(
          selectedPoint !== undefined && item.id === selectedPoint.id
            ? currentCustomIcon
            : defaultCustomIcon
        );

        markersLayer.addLayer(marker);
      });

      markersLayer.addTo(map);
      return () => {
        markersLayer.clearLayers();
      };
    }
  }, [map, offersOneCity, selectedPoint]);

  return <section className={classIn} style={styleIn} ref={mapRef}></section>;
}

export default Map;
