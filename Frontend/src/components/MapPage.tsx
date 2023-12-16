import { useState } from 'react';
const { compose, withProps, lifecycle } = require('recompose');
import { DirectionsRenderer } from 'react-google-maps';
import SearchBar from '@/components/SearchBar';
const { withScriptjs, withGoogleMap, GoogleMap } = require('react-google-maps');
import routeCoordinates from '@/data/routeCoordinates';

const apiKey = process.env.GOOGLE_MAPS_API_KEY;
const googleUrl = `https://www.google.com/maps/embed/v1/directions?key=${apiKey}&origin=Istanbul+Turkey&destination=Telemark+Norway&avoid=tolls|highways`;

const MapPage: React.FC = () => {
  const [mapRef, setMapRef] = useState<google.maps.Map | null>(null);

  return (
    <div className="flex flex-col h-screen bg-white md:px-[15%]">
      <MapWithDirectionsRenderer />
      <SearchBar />
    </div>
  );
};

const MapWithDirectionsRenderer = compose(
  withProps({
    googleMapURL: googleUrl,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div className={'h-full w-full'} />,
    mapElement: (
      <div
        className={
          'w-full h-full scale-95 -mb-5 rounded-t-3xl rounded-b-md md:rounded-b-3xl shadow-sm'
        }
      />
    ),
  }),
  withScriptjs,
  withGoogleMap,
  lifecycle({
    componentDidMount() {
      const DirectionsService = new google.maps.DirectionsService();

      const waypoints = routeCoordinates.slice(0, 10).map((coordinate) => ({
        location: { lat: coordinate.lat, lng: coordinate.lng },
        stopover: false,
      }));

      DirectionsService.route(
        {
          origin: new google.maps.LatLng(
            routeCoordinates[0].lat,
            routeCoordinates[0].lng
          ),
          destination: new google.maps.LatLng(
            routeCoordinates[10].lat,
            routeCoordinates[10].lng
          ),
          waypoints: waypoints,
          travelMode: google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
            this.setState({ directions: result });
          } else {
            console.error(`error fetching directions ${result}`);
          }
        }
      );
    },
  })
)((props: any) => (
  <GoogleMap
    defaultZoom={7}
    defaultCenter={new google.maps.LatLng(41.85073, -87.65126)}
  >
    {props.directions && <DirectionsRenderer directions={props.directions} />}
  </GoogleMap>
));

export default MapPage;
