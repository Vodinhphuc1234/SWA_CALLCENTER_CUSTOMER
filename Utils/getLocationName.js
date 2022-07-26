import { HERE_MAP_API } from "@env";
import axios from "axios";

const getLocationName = async (coordinate) => {
  console.log(coordinate);
  let ret = await axios.get(
    "https://reverse.geocoder.ls.hereapi.com/6.2/reversegeocode.json",
    {
      params: {
        apiKey: HERE_MAP_API,
        mode: "retrieveAddresses",
        prox: `${coordinate.latitude},${coordinate.longitude},1000`,
      },
    }
  );
  const detail = ret.data.Response.View[0].Result[0].Location.Address;
  return `${detail.HouseNumber ? detail.HouseNumber + " " : ""}${
    detail.Street ? detail.Street + ", " : ""
  }${detail.District ? detail.District + ", " : ""}${
    detail.County ? detail.County + ", " : ""
  }${detail.Country}`;
};

export default getLocationName;
