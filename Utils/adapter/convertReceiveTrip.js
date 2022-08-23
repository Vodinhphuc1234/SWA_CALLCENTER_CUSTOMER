import Constants from "expo-constants";
const { manifest } = Constants;
// const IP = `${manifest.debuggerHost.split(":").shift()}:8000`;
const convertTripInformation = (reveicedTrip, IP) => {
  const ret = {};
  ret.tripInformation = {
    price: reveicedTrip.cash,
    distance: reveicedTrip.distance,
    duration: reveicedTrip["estimate_time"],
    paymentMethod: reveicedTrip["payment_method"],
    status: reveicedTrip.status,
    self: reveicedTrip.self,
  };
  ret.origin = {
    description: reveicedTrip["pick_up_address_line"],
    lat: reveicedTrip["pick_up_address_coordinates"].latitude,
    lng: reveicedTrip["pick_up_address_coordinates"].longitude,
  };
  ret.destination = {
    description: reveicedTrip["drop_off_address_line"],
    lat: reveicedTrip["drop_off_address_coordinates"].latitude,
    lng: reveicedTrip["drop_off_address_coordinates"].longitude,
  };

  ret.socketLink = reveicedTrip["self_socket"].replace("localhost", IP);

  if (
    reveicedTrip["driver_email"].length !== 0 &&
    reveicedTrip["driver_name"].length !== 0 &&
    reveicedTrip["driver_phone_number"].length !== 0
  ) {
    ret.driverInformation = {
      email: reveicedTrip["driver_email"],
      name: reveicedTrip["driver_name"],
      phoneNumber: reveicedTrip["driver_phone_number"],
    };
  }

  return ret;
};

export default convertTripInformation;
