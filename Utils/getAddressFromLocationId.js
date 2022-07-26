import axios from "axios";
import { HERE_MAP_API } from "@env";
export const getAddressFromLocationId = async (locationId) => {
  let ret = await axios.get(
    "https://geocoder.ls.hereapi.com/6.2/geocode.json",
    {
      params: {
        locationid: locationId,
        jsonattributes: 1,
        gen: 9,
        apiKey: HERE_MAP_API,
      },
    }
  );

  return {
    ...ret.data.response.view[0].result[0].location.displayPosition,
  };
};
