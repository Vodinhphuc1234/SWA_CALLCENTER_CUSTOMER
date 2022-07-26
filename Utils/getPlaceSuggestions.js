import axios from "axios";
import { HERE_MAP_API } from "@env";
export const getPlaceSuggests = async (q) => {
  const response = await axios.get(
    "https://autocomplete.geocoder.ls.hereapi.com/6.2/suggest.json",
    {
      params: {
        apiKey: HERE_MAP_API,
        query: q,
      },
    }
  );
  return response.data;
};


