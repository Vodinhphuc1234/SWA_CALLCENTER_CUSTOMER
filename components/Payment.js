import {
  faAngleLeft,
  faAngleRight,
  faMoneyBill,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation } from "@react-navigation/native";
import { Button, Divider } from "@rneui/themed";
import React, { useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import PagerView from "react-native-pager-view";
import { useDispatch, useSelector } from "react-redux";
import tw from "tailwind-react-native-classnames";
import {
  selectDestination,
  selectIP,
  selectOrigin,
  selectTripInformation,
  setSocketLink,
  setTripInformation,
} from "../slices/navSlice";
import bookTrip from "../Utils/trip/bookTrip";
import PaymentMethodOptionsDialog from "./PaymentMethodOptionsDialog";
import TaxiOptionCard from "./TaxiOptionCard";
import Constants from "expo-constants";
const { manifest } = Constants;

const taxiOptions = [
  {
    type: "four_seats",
    image:
      "https://5.imimg.com/data5/NJ/NL/GLADMIN-34139327/sail-sedan-4-seater-luxury-car-rental-services-500x500.png",
  },
  {
    type: "six_seats",
    image:
      "https://www.kindpng.com/picc/m/13-131791_toyota-family-car-7-seater-hd-png-download.png",
  },
];

const Payment = () => {
  const [loading, setLoading] = useState(false);
  const [showPaymentOptionsDialog, setShowPaymentOptionsDialog] =
    useState(false);
  const navigator = useNavigation();
  const tripInfo = useSelector(selectTripInformation);
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);
  const IP = useSelector(selectIP);

  const dispatch = useDispatch();
  return (
    <>
      <View style={tw`bg-white h-full`}>
        <View style={tw` mx-2 rounded-lg`}>
          <TouchableOpacity
            style={tw`absolute left-2 top-2 bg-gray-200 p-1.5 rounded-full z-50`}
            onPress={() => {
              navigator.navigate("TripDetail");
            }}
          >
            <FontAwesomeIcon icon={faAngleLeft} color="black" size={20} />
          </TouchableOpacity>
          <Text style={tw`text-center py-2 text-lg font-bold`}>
            Pick Taxi Type {tripInfo?.type}
          </Text>
        </View>
        <Divider />
        <PagerView style={tw`h-1/2 mb-2`}>
          {taxiOptions.map((item) => (
            <TaxiOptionCard
              key={item.type}
              speed={item.speed}
              price={item.price}
              type={item.type}
              image={item.image}
            />
          ))}
        </PagerView>
        <Divider />
        <TouchableOpacity
          style={tw`pl-2 ml-7 mt-1 flex-row items-center bg-gray-200 w-24 rounded-full`}
          onPress={() => {
            setShowPaymentOptionsDialog(true);
          }}
        >
          <FontAwesomeIcon icon={faMoneyBill} />
          <Text style={tw`text-sm font-medium mx-2`}>
            {tripInfo?.paymentMethod}
          </Text>
          <FontAwesomeIcon icon={faAngleRight} size={14} />
        </TouchableOpacity>

        <View style={tw`flex-row justify-center mx-5 my-2 h-2/3`}>
          <Button
            color="black"
            buttonStyle={{
              borderRadius: 20,
              backgroundColor: "black",
              padding: 12,
            }}
            containerStyle={tw`w-full`}
            titleStyle={tw`text-white`}
            disabled={!tripInfo?.type || !tripInfo?.paymentMethod || loading}
            iconRight={true}
            onPress={async () => {
              setLoading(true);
              const data = await bookTrip(tripInfo, origin, destination);
              setLoading(false);
              if (data.message) {
                alert(data.message);
                return;
              }

              if (data) {
                let action = setSocketLink(
                  data["self_socket"].replace("localhost", IP)
                );
                dispatch(
                  setTripInformation({
                    price: data.cash,
                    distance: data.distance,
                    duration: data["estimate_time"],
                    paymentMetho: data["payment_method"],
                    status: data.status,
                    self: data.self,
                  })
                );
                dispatch(action);
                navigator.navigate("ProcessingScreen");
              }
            }}
          >
            <View style={tw`w-full`}>
              <View style={tw`absolute right-3`}>
                {loading ? (
                  <ActivityIndicator />
                ) : (
                  <FontAwesomeIcon
                    icon={faAngleRight}
                    color="white"
                    size={20}
                  />
                )}
              </View>
              <Text style={tw`text-center text-white font-bold`}>
                Get a taxi
              </Text>
            </View>
          </Button>
        </View>
      </View>

      <PaymentMethodOptionsDialog
        isVisible={showPaymentOptionsDialog}
        setVisible={setShowPaymentOptionsDialog}
      />
    </>
  );
};

export default Payment;

const styles = StyleSheet.create({});
