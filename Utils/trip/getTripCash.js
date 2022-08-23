import getInstance from "../BaseAPI";

const getTripCash = async (distance) => {
  const instance = await getInstance();
  var data;
  try {
    const result = await instance.post("/rider/trip/calculate-cash/", { distance });
    data = result.data.cash;
  } catch (err) {
    console.log(err);
    data = null;
  }
  return data;
};

export default getTripCash;
