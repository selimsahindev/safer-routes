import React, { createContext, useContext, useState } from 'react';
import LocationType from '@/types/LocationType';

interface MapRouteContextProps {
  origin: LocationType | null;
  destination: LocationType | null;
  waypoints?: LocationType[];
  setRouteData: (newOrigin: LocationType, newDestination: LocationType) => void;
}

export const MapRouteContext = createContext<MapRouteContextProps>(
  {} as MapRouteContextProps
);

interface RouteProviderProps {
  children: React.ReactNode;
}

export const MapRouteProvider: React.FC<RouteProviderProps> = ({
  children,
}) => {
  const [origin, setOrigin] = useState<LocationType | null>(null);
  const [destination, setDestination] = useState<LocationType | null>(null);

  const setRouteData = (
    newOrigin: LocationType,
    newDestination: LocationType
  ) => {
    setOrigin(newOrigin);
    setDestination(newDestination);
  };

  return (
    <MapRouteContext.Provider value={{ origin, destination, setRouteData }}>
      {children}
    </MapRouteContext.Provider>
  );
};

export const useMapRoute = () => React.useContext(MapRouteContext);
