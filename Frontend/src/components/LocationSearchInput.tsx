import { Loader2, MapPin } from 'lucide-react';
import React from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import useFocusStore from '@/stores/focusStore';

interface LocationSearchInputState {
  address: string;
}

interface LocationSearchInputProps {
  children?: React.ReactNode;
  placeholder?: string;
  inputStyle?: string;
  inputId?: string;
  setLocation?: (latLng: any) => void;
}

class LocationSearchInput extends React.Component<
  LocationSearchInputProps,
  LocationSearchInputState
> {
  constructor(props: {}) {
    super(props);
    this.state = { address: '' };
  }

  handleChange = (address: string) => {
    this.setState({ address });
  };

  handleSelect = (address: string) => {
    this.setState({ address });

    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => {
        console.log('Success', latLng);
        if (this.props.setLocation) {
          this.props.setLocation(latLng);
        }
      })
      .catch((error) => console.error('Error', error));
  };

  render() {
    return (
      <PlacesAutocomplete
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <div className="autocomplete-dropdown-container">
              {suggestions
                .slice()
                .reverse()
                .map((suggestion) => {
                  const className = suggestion.active
                    ? 'suggestion-item--active'
                    : 'suggestion-item';

                  const style = suggestion.active
                    ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                    : { backgroundColor: '#ffffff', cursor: 'pointer' };

                  return (
                    <div
                      {...getSuggestionItemProps(suggestion, {
                        className,
                        style,
                      })}
                    >
                      <div className="border-b border-gray-200"></div>

                      <div className="flex flex-row gap-2 w-full">
                        <div className="text-green-500 my-auto pl-1">
                          <MapPin size={20} strokeWidth={2.5} />
                        </div>
                        <div className="text-sm text-gray-500 py-2">
                          {suggestion.description}
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>

            <div className="flex flex-row">
              <input
                {...getInputProps({
                  placeholder: this.props.placeholder || 'Search Places ...',
                  className: `location-search-input ${this.props.inputStyle}`,
                  onFocus: () =>
                    useFocusStore.setState({
                      isFocused: this.props.inputId === 'current-location',
                    }),
                  onBlur: () => useFocusStore.setState({ isFocused: false }),
                  id: this.props.inputId,
                })}
              />
              {loading ? (
                <Loader2
                  className="text-teal-400 my-auto -ml-8 animate-spin"
                  strokeWidth={3}
                  size={20}
                />
              ) : (
                this.props.children
              )}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    );
  }
}

export default LocationSearchInput;
