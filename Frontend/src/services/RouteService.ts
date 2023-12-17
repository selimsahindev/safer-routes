import axios, { AxiosInstance, AxiosResponse } from 'axios';
import LocationType from '@/types/LocationType';

class RouteService {
  private api: AxiosInstance;

  constructor() {
    const baseURL = process.env.FAST_API_URL;
    this.api = axios.create({ baseURL });
  }
  
  public async getWaypoints(origin: LocationType, destination: LocationType): Promise<any[]> {
    const queryString = `/maps/get_route?origin_lat=${origin.lat}&origin_long=${origin.lng}&destination_lat=${destination.lat}&destination_long=${destination.lng}`;

    console.log(queryString);

    // TODO: DUMMY TEST DATA. REMOVE THIS RETURN STATEMENT
    return [
      { lat: 41.026938, lng: 28.9262909 },
      { lat: 41.0266053, lng: 28.9267022 },
      { lat: 41.0293569, lng: 28.9259901 },
      { lat: 41.0320037, lng: 28.9270232 },
      { lat: 41.0358999, lng: 28.933627 },
      { lat: 41.036433, lng: 28.9344268 },
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

export default new RouteService();