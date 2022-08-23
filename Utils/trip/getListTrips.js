import getInstance from "../BaseAPI";

const getListTrips = async (limit, offset) => {
  const instance = await getInstance();

  var data;
  try {
    const ret = await instance.get("/rider/trip/", { limit, offset });
    data = ret.data;
  } catch (e) {
    data = e.response.data;
  }
  return data;
};



export default getListTrips;
