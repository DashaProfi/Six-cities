import { MutableRefObject, useEffect, useMemo, useRef, useState } from 'react';
import { Map as LeafletGeoMap, TileLayer } from 'leaflet';

export type OfferLocation = {
  latitude: number;
  longitude: number;
  zoom: number;
};

export const DEFAULT_GEOLOCATION: OfferLocation = {
  latitude: 0,
  longitude: 0,
  zoom: 0,
} as const;

export const GeoMapAttributes = {
  TileType:
    'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
  Copyright:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
} as const;

export function useGeoMap(
  nodeRef: MutableRefObject<HTMLElement | null>,
  centerLocation: OfferLocation | null
): LeafletGeoMap | null {
  const mapRef = useRef<LeafletGeoMap | null>(null);
  const [geoMap, setGeoMap] = useState<LeafletGeoMap | null>(null);
  const layer = useMemo(
    () =>
      new TileLayer(GeoMapAttributes.TileType, {
        attribution: GeoMapAttributes.Copyright,
      }),
    []
  );

  useEffect(() => {
    if (nodeRef.current === null) {
      mapRef.current?.remove();
      mapRef.current = null;
      setGeoMap(null);
      return;
    }

    if (mapRef.current !== null) {
      return;
    }

    mapRef.current = new LeafletGeoMap(nodeRef.current);
    mapRef.current.addLayer(layer);

    setGeoMap(mapRef.current);
  }, [layer, nodeRef]);

  useEffect(() => {
    if (geoMap === null) {
      setGeoMap(mapRef.current);
    }

    if (mapRef.current === null) {
      return;
    }

    const center = centerLocation ?? DEFAULT_GEOLOCATION;

    mapRef.current.setView([center.latitude, center.longitude], center.zoom);
  }, [centerLocation, geoMap]);

  return geoMap;
}
