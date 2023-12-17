import axios, { AxiosInstance, AxiosResponse } from 'axios';
import LocationType from '@/types/LocationType';

class DirectionsService {
  private api: AxiosInstance;

  constructor() {
    const baseURL = process.env.FAST_API_URL;
    this.api = axios.create({ baseURL });
  }
  
  public async getRoutes(origin: LocationType, destination: LocationType): Promise<any[]> {
    const queryString = `/maps/get_route?origin_lat=${origin.lat}&origin_long=${origin.lng}&destination_lat=${destination.lat}&destination_long=${destination.lng}`;

    console.log(queryString);
    return [
      {
        "id": 1,
        "name": "Route 1",
        "description": "Route 1 description",
        "distance": 100,
        "duration": 100,
        "origin": {
          "lat": 1,
          "lng": 1
        },
        "destination": {
          "lat": 2,
          "lng": 2
        },
        "waypoints": [
          {
            "lat": 1.5,
            "lng": 1.5
          }
        ]
      },
      {
        "id": 2,
        "name": "Route 2",
        "description": "Route 2 description",
        "distance": 200,
        "duration": 200,
        "origin": {
          "lat": 1,
          "lng": 1
        },
        "destination": {
          "lat": 2,
          "lng": 2
        },
        "waypoints": [
          {
            "lat": 1.5,
            "lng": 1.5
          }
        ]
      },
      {
        "id": 3,
        "name": "Route 3",
        "description": "Route 3 description",
        "distance": 300,
        "duration": 300,
        "origin": {
          "lat": 1,
          "lng": 1
        },
        "destination": {
          "lat": 2,
          "lng": 2
        },
        "waypoints": [
          {
            "lat": 1.5,
            "lng": 1.5
          }
        ]
      }
    ];

    try {
      const response: AxiosResponse<any>  = await this.api.get(
        queryString,
        { withCredentials: true }
      );

      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }
}

export default new DirectionsService();