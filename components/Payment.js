import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Button, Card, Divider, Icon } from "@rneui/themed";
import tw from "tailwind-react-native-classnames";
import PagerView from "react-native-pager-view";
import TaxiOptionCard from "./TaxiOptionCard";
import { useState } from "react/cjs/react.development";
import { useNavigation } from "@react-navigation/native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faMoneyBill,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import {
  selectDestination,
  selectOrigin,
  selectTravelTimeInfromation,
} from "../slices/navSlice";
import PaymentMethodOptionsDialog from "./PaymentMethodOptionsDialog";
import pushNotification from "../Utils/pushNotification";

const taxiOptions = [
  {
    type: "4 seats",
    speed: 100,
    price: 100000,
    image:
      "https://5.imimg.com/data5/NJ/NL/GLADMIN-34139327/sail-sedan-4-seater-luxury-car-rental-services-500x500.png",
  },
  {
    type: "7 seats",
    speed: 70,
    price: 150000,
    image:
      "https://www.kindpng.com/picc/m/13-131791_toyota-family-car-7-seater-hd-png-download.png",
  },
  {
    type: "10 seats",
    speed: 60,
    price: 120000,
    image:
      "https://mpng.subpng.com/20180330/jfw/kisspng-toyota-hilux-car-toyota-land-cruiser-prado-toyota-van-5abdce71911090.8064252015223885935942.jpg",
  },
];

const Payment = () => {
  const [showPaymentOptionsDialog, setShowPaymentOptionsDialog] =
    useState(false);
  const navigator = useNavigation();
  const tripInfo = useSelector(selectTravelTimeInfromation);
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);
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
            Pick Taxi Type {tripInfo?.tripDetails?.type}
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
            {tripInfo?.paymentMethod?.method || "Cash"}
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
            disabled={!tripInfo?.tripDetails}
            iconRight={true}
            onPress={async () => {
              const data = {
                origin: {
                  ...origin,
                  name: origin.description.split(",")[0],
                },
                destination: {
                  ...destination,
                  name: destination.description.split(",")[0],
                },
              };
              await pushNotification(
                "ExponentPushToken[ZFt-cfD22B6TXNc2g5LxZ8]",
                "You have a ride",
                "Click accept to get this trip",
                data
              );
              navigator.navigate("ProcessingScreen");
            }}
          >
            <View style={tw`w-full`}>
              <View style={tw`absolute right-3`}>
                <FontAwesomeIcon icon={faAngleRight} color="white" size={20} />
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
