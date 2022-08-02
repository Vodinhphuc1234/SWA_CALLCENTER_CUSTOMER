import {MAPBOX_API} from "@env"

const { default: axios } = require("axios");

const getGeometies = async (origin, destination) => {
  const ret = await axios.get(
    `https://api.mapbox.com/directions/v5/mapbox/driving/${origin.lng},${origin.lat};${destination.lng},${destination.lat}`,
    {
      params: {
        geometries: "geojson",
        access_token: MAPBOX_API,
      },
      headers: {},
    }
  );

  let coordinates = [];

  ret?.data?.routes[0]?.geometry?.coordinates.forEach((coordinate) => {
    coordinates.push({
      latitude: coordinate[1],
      longitude: coordinate[0],
    });
  });

  return coordinates;
};

export default getGeometies;
