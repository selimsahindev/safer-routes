import { LocateFixed, ScanSearch } from 'lucide-react';
import LocationSearchInput from './LocationSearchInput';
import useFocusStore from '@/stores/focusStore';
import RoutesService from '@/services/RouteService';
import { useEffect, useState } from 'react';
import LocationType from '@/types/LocationType';
import { useMapRoute } from '@/context/MapRouteContext';

interface SearchBarProps {
  onLocateClick: (e: any) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onLocateClick }) => {
  const [origin, setOrigin] = useState<LocationType | null>(null);
  const [destination, setDestination] = useState<LocationType | null>(null);
  const { setRouteData } = useMapRoute();

  const inputStyle =
    'border border-gray-30 text-sm w-full rounded-xl px-4 py-2 shadow-sm text-gray-500 focus:outline-teal-400';

  const isFocused = useFocusStore((state: any) => state.isFocused);

  const handleFindRoutes = async (e: any) => {
    e.preventDefault();

    if (!origin || !destination) {
      console.log('Origin or destination is null.');
      return;
    }

    try {
      const routes = await RoutesService.getWaypoints(origin, destination);
      setRouteData(origin, destination);
      // TODO: Do something with the routes, e.g., update state or perform further actions.
      console.log('Routes:', routes);
    } catch (error) {
      console.error('Error fetching routes:', error);
    }
  };

  return (
    <div className="text-black w-full md:mx-auto">
      <form>
        <div className="grid gap-1 px-2 my-4">
          <LocationSearchInput
            placeholder="Mevcut Konum"
            inputStyle={`${inputStyle} pr-10`}
            inputId="current-location"
            setLocation={setOrigin}
          >
            <button className="focus:outline-teal-400" onClick={onLocateClick}>
              <div
                className={`bg-gray-50 w-10 h-full -ml-10 rounded-r-xl border ${
                  isFocused ? 'border-teal-400 border-2' : 'border-gray-30'
                }`}
              >
                <LocateFixed
                  className="text-teal-400 h-full pl-2"
                  strokeWidth={2.25}
                  size={30}
                />
              </div>
            </button>
          </LocationSearchInput>

          <LocationSearchInput
            placeholder="Hedef Konum"
            inputStyle={inputStyle}
            inputId="target-location"
            setLocation={setDestination}
          />

          <button
            type="submit"
            className="bg-teal-500 text-white px-4 py-2 mt-1 rounded-full shadow-md"
            onClick={(e) => handleFindRoutes(e)}
          >
            <div className="flex flex-row justify-center gap-2">
              <p className="font-normal">Rota Bul</p>
              <ScanSearch className="my-auto" size={21} strokeWidth={2.2} />
            </div>
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
