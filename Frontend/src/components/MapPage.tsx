import { useEffect, useState } from 'react';
import { DirectionsRenderer } from 'react-google-maps';
import SearchBar from '@/components/SearchBar';
import { useMapRoute } from '@/context/MapRouteContext';
const { compose, withProps, lifecycle } = require('recompose');
const { withScriptjs, withGoogleMap, GoogleMap } = require('react-google-maps');

const apiKey = process.env.GOOGLE_MAPS_API_KEY;
const googleUrl = `https://www.google.com/maps/embed/v1/directions?key=${apiKey}&origin=Istanbul+Turkey&destination=Telemark+Norway&avoid=tolls|highways`;

const MapPage: React.FC = () => {
  const [mapRef, setMapRef] = useState<google.maps.Map | null>(null);
  const [userLocation, setUserLocation] =
    useState<google.maps.LatLngLiteral | null>(null);
  const { origin, destination, waypoints } = useMapRoute();

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });

          // Optional: Pan the map to the current location
          if (mapRef) {
            mapRef.panTo({ lat: latitude, lng: longitude });
          }
        },
        (error) => {
          console.error('Error getting current location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by your browser.');
    }
  };

  const handleOnLocateClick = (e: any) => {
    e.preventDefault();
    console.log(getCurrentLocation());
  };

  return (
    <div className="flex flex-col h-screen bg-white md:px-[15%]">
      <MapWithDirectionsRenderer
        onMapMounted={setMapRef}
        userLocation={userLocation}
        origin={origin}
        destination={destination}
        waypoints={waypoints}
      />
      <SearchBar onLocateClick={handleOnLocateClick} />
    </div>
  );
};

const MapWithDirectionsRenderer = compose(
  withProps({
    googleMapURL: googleUrl,
    loadingElement: <div className={'h-full'} />,
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
      const { origin, destination, waypoints } = this.props;

      this.props.onMapMounted(this.refs.map);

      // const waypoints = routeCoordinates.slice(0, 10).map((coordinate) => ({
      //   location: { lat: coordinate.lat, lng: coordinate.lng },
      //   stopover: false,
      // }));

      if (!origin || !destination) {
        console.log('ComponentDidMount: Origin or destination is null.');
        return;
      }

      DirectionsService.route(
        {
          origin: new google.maps.LatLng(origin),
          destination: new google.maps.LatLng(destination),
          waypoints: waypoints,
          travelMode: google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
            this.setState({ directions: result });
          } else {
            console.error(`Error fetching directions ${result}`);
          }
        }
      );
    },
    componentDidUpdate(prevProps: any) {
      const DirectionsService = new google.maps.DirectionsService();
      const { origin, destination, waypoints } = this.props;

      if (
        origin !== prevProps.origin ||
        destination !== prevProps.destination
      ) {
        DirectionsService.route(
          {
            origin: new google.maps.LatLng(origin),
            destination: new google.maps.LatLng(destination),
            waypoints: waypoints,
            travelMode: google.maps.TravelMode.DRIVING,
          },
          (result, status) => {
            if (status === google.maps.DirectionsStatus.OK) {
              this.setState({ directions: result });
            } else {
              console.error(`Error fetching directions ${result}`);
            }
          }
        );
      }
    },
  })
)((props: any) => (
  <GoogleMap
    defaultZoom={12}
    defaultCenter={new google.maps.LatLng(41.01003362760944, 28.97641250120364)}
  >
    {props.directions && <DirectionsRenderer directions={props.directions} />}
  </GoogleMap>
));

export default MapPage;
