import { LocateFixed, ScanSearch } from 'lucide-react';
import LocationSearchInput from './LocationSearchInput';

const MapPage: React.FC = () => {
  return (
    <div className="flex flex-col h-screen bg-white">
      <Map />
      <SearchBar />
    </div>
  );
};

const Map: React.FC = () => {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  const googleUrl = `https://www.google.com/maps/embed/v1/place?q=place_id:ChIJawhoAASnyhQR0LABvJj-zOE&key=${apiKey}`;

  return (
    <iframe
      className="w-screen h-screen scale-95 -mb-5 rounded-t-3xl rounded-b-md shadow-sm"
      loading="lazy"
      src={googleUrl}
    ></iframe>
  );
};

const SearchBar: React.FC = () => {
  const inputStyle =
    'border border-gray-30 text-sm w-full rounded-xl px-4 py-2 shadow-sm text-gray-500';

  return (
    <div className="text-black bg-white">
      <form>
        <div className="grid md:grid-cols-2 gap-1 px-2 md:px-[15%] my-4">
          <LocationSearchInput
            placeholder="Mevcut Konum"
            inputStyle={`${inputStyle} pr-10`}
          >
            <button>
              <LocateFixed className="text-blue-500 my-auto -ml-8" />
            </button>
          </LocationSearchInput>

          <LocationSearchInput
            placeholder="Hedef Konum"
            inputStyle={inputStyle}
          />

          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 mt-1 rounded-full shadow-md"
            onClick={(e) => e.preventDefault()}
          >
            <div className="flex flex-row justify-center gap-2">
              <p className="font-normal">Rota Bul</p>
              <ScanSearch className="w-5" />
            </div>
          </button>
        </div>
      </form>
    </div>
  );
};

export default MapPage;
