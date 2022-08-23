import getInstance from "../BaseAPI";

const bookTrip = async (tripInfo, origin, destination) => {
  const instance = await getInstance();
  var data;

  const requestData = {
    car_type: tripInfo.type,
    note: "No note",
    pick_up_address_line: origin.description,
    pick_up_address_coordinates: {
      latitude: origin.lat, //10.84211235188076,
      longitude: origin.lng, //106.7289320425035,
    },
    drop_off_address_line: destination.description,
    drop_off_address_coordinates: {
      latitude: destination.lat,
      longitude: destination.lng,
    },
    estimate_time: parseInt(tripInfo.duration.split(" ")[0] * 60),
    distance: parseInt(tripInfo.distance.split(" ")[0] * 1000),
    payment_method: tripInfo.paymentMethod,
  };

  try {
    const result = await instance.post("/rider/trip/", {
      ...requestData,
    });
    data = result.data;
  } catch (error) {
    data = error.response.data;
  }

  console.log(data);
  return data;
};

export default bookTrip;
