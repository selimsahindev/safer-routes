import { useEffect } from 'react';

interface DirectionsProps {
  map: google.maps.Map | null;
  origin: string;
  destination: string;
}

const Directions: React.FC<DirectionsProps> = ({
  map,
  origin,
  destination,
}) => {
  useEffect(() => {
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer({ map });

    const request = {
      origin,
      destination,
      travelMode: google.maps.TravelMode.DRIVING,
    };

    directionsService.route(request, (result, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        directionsRenderer.setDirections(result);
      } else {
        console.error(`Error fetching directions: ${status}`);
      }
    });
  }, [map, origin, destination]);

  return null;
};

export default Directions;
