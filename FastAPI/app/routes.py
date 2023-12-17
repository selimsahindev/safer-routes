from fastapi import APIRouter 
import pandas as pd
import networkx as nx
import os
import osmnx as ox
from geopy.distance import geodesic

router = APIRouter(
    prefix="/api/v1/map",
    tags=['Api']
)

# Use the __file__ attribute to get the path of the current script
current_script_path = os.path.dirname(os.path.realpath(__file__))

nodes_df = pd.read_csv(os.path.join(current_script_path, 'data', 'nodes.csv'))
edges_df = pd.read_csv(os.path.join(current_script_path, 'data', 'edges.csv'))

# Create an empty graph
G = nx.Graph()

# Add nodes to the graph
for index, row in nodes_df.iterrows():
    G.add_node(
        row['osmid'],
        geometry=row['geometry'],
        highway=row['highway'],
        ref=row['ref'],
        street_count=row['street_count'],
        x=row['x'],
        y=row['y'],
    )  # Adjust attributes as needed

for index, row in edges_df.iterrows():
    G.add_edge(
        u_of_edge=row['start_node'],
        v_of_edge=row['end_node'],
        osmid=row['osmid'],
        oneway=row['oneway'],
        lanes=row['lanes'],
        highway=row['highway'],
        maxspeed=row['maxspeed'],
        reversed=row['reversed'],
        length=row['length'],
        bridge=row['bridge'],
        geometry=row['geometry'],
        speed_kph=row['speed_kph'],
        travel_time=row['travel_time'],
        traffic_collisions_number=row['traffic_collisions_number'],
        distance_to_hospital=row['distance_to_hospital'],
    )

G.graph['crs'] = 'EPSG:4326'

class Coordinate:
    def __init__(self, lat, lng):
        self.lat = lat
        self.lng = lng


@router.get("/routes")
async def get_route(
    origin_lat: float,
    origin_long: float,
    destination_lat: float,
    destination_long: float,
):
    distance_from_origin_to_center = geodesic((origin_lat, origin_long), (41.0824261, 29.0114145)).meters
    distance_from_destination_to_center = geodesic((destination_lat, destination_long), (41.0824261, 29.0114145)).meters

    if distance_from_origin_to_center > 30000 or distance_from_destination_to_center > 30000:
        return {
            "code": 404,
            "status": "NOT_FOUND_ERROR",
            "message": "Origin or destination point not found on map."
        }

    start_node = ox.distance.nearest_nodes(G, origin_long, origin_lat)
    end_node = ox.distance.nearest_nodes(G, destination_long, destination_lat)

    shortest_path_nodes = nx.shortest_path(G, source=start_node, target=end_node,
                                   method='dijkstra', weight='weight')

    path_coordinates = []
    response = []

    for node in shortest_path_nodes:
        coordinate = Coordinate(G.nodes[node]['y'], G.nodes[node]['x'])
        path_coordinates.append(coordinate)

    if len(path_coordinates) > 27:
        response.append(path_coordinates[0])
        k = (len(path_coordinates) - 2) // 25
        length = len(path_coordinates)
        for i in range(1, length - 1):
            if i % k == 0:
                response.append(path_coordinates[i])

        response.append(path_coordinates[length-1])
    return { "route": response }