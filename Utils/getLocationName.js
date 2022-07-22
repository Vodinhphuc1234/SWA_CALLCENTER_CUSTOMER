import Geocoder from "react-native-geocoding";
import { GOOGLE_MAP_API } from "@env";

Geocoder.init(GOOGLE_MAP_API);

const getLocationName = async (coordinate) => {
  let address = await Geocoder.from(coordinate);
  return address;
};

export default getLocationName;
