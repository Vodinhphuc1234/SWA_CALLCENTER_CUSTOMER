import axios from "axios";
import {HERE_MAP_API_ROUTE} from "@env"

const getDistanceAndDuration = async (origin, destination) => {
  let data = await axios.get("https://router.hereapi.com/v8/routes", {
    params: {
      apiKey: HERE_MAP_API_ROUTE,
      transportMode: "car",
      return: "summary",
      origin: `${origin.lat},${origin.lng}`,
      destination: `${destination.lat},${destination.lng}`,
    },
  });
  console.log(data.data.routes[0].sections[0].summary);
  return data.data.routes[0].sections[0].summary;
};

export default getDistanceAndDuration;
