import React, { ChangeEvent } from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';

interface LocationSearchInputState {
  address: string;
}

interface LocationSearchInputProps {
  children?: React.ReactNode;
  placeholder?: string;
  inputStyle?: string;
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
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => console.log('Success', latLng))
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
              {loading && <div>Loading...</div>}
              {suggestions.map((suggestion) => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                // inline style for demonstration purpose
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
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-row">
              <input
                {...getInputProps({
                  placeholder: this.props.placeholder || 'Search Places ...',
                  className: `location-search-input ${this.props.inputStyle}`,
                })}
              />
              {this.props.children}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    );
  }
}

export default LocationSearchInput;
