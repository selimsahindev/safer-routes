import axios, { AxiosInstance, AxiosResponse } from 'axios';
import LocationType from '@/types/LocationType';

class RouteService {
  private api: AxiosInstance;

  constructor() {
    const baseURL = process.env.FAST_API_URL;
    this.api = axios.create({ baseURL });
  }
  
  public async getWaypoints(origin: LocationType, destination: LocationType): Promise<any[]> {
    const queryString = `/map/routes?origin_lat=${origin.lat}&origin_long=${origin.lng}&destination_lat=${destination.lat}&destination_long=${destination.lng}`;

    console.log(queryString);

    try {
      const response: AxiosResponse<any>  = await this.api.get(queryString);

      console.log(response.data);

      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }
}

export default new RouteService();