import { LocateFixed, ScanSearch } from 'lucide-react';
import LocationSearchInput from './LocationSearchInput';
import useFocusStore from '@/stores/focusStore';

const SearchBar: React.FC = () => {
  const inputStyle =
    'border border-gray-30 text-sm w-full rounded-xl px-4 py-2 shadow-sm text-gray-500 focus:outline-teal-400';

  const isFocused = useFocusStore((state: any) => state.isFocused);

  return (
    <div className="text-black w-full md:mx-auto">
      <form>
        <div className="grid gap-1 px-2 my-4">
          <LocationSearchInput
            placeholder="Mevcut Konum"
            inputStyle={`${inputStyle} pr-10`}
            inputId="current-location"
          >
            <button
              className="focus:outline-teal-400"
              onClick={(e) => e.preventDefault()}
            >
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
          />

          <button
            type="submit"
            className="bg-teal-500 text-white px-4 py-2 mt-1 rounded-full shadow-md"
            onClick={(e) => e.preventDefault()}
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
