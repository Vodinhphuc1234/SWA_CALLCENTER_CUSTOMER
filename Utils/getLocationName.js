import Geocoder from "react-native-geocoding";
import { HERE_MAP_API } from "@env";
import axios from "axios";

const getLocationName = async (coordinate) => {
  console.log(coordinate)
  let ret = await axios.get(
    "https://reverse.geocoder.ls.hereapi.com/6.2/reversegeocode.json",
    { params: {
      apiKey: HERE_MAP_API,
      mode: "retrieveAddresses",
      prox: `${coordinate.latitude},${coordinate.longitude},1000`
    } }
  );
  //console.log(ret.data.Response.View[0].Result[0])
  return ret.data.Response.View[0].Result[0].Location.Address.Label;
};

export default getLocationName;
