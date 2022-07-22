import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Divider } from "@rneui/themed";
import tw from "tailwind-react-native-classnames";
import { setTravelTimeInfromation } from "../slices/navSlice";
import { useDispatch } from "react-redux";

const TaxiOptionCard = ({ price, speed, type, image }) => {
  const dispatch = useDispatch();
  return (
    <TouchableOpacity
      onPress={() => {
        const action = setTravelTimeInfromation({
          tripDetails: {
            type,
            speed,
            price,
          },
        });
        dispatch(action);
      }}
    >
      <View
        style={tw`p-5 mx-5 my-2 flex-grow flex-row bg-gray-100 items-center rounded-3xl`}
      >
        <Image
          style={tw`h-2/3 w-1/2`}
          source={{
            uri: "https://www.pngall.com/wp-content/uploads/5/Vehicle-Red-Car.png",
          }}
        />
        <Divider orientation="vertical" />

        <View style={tw`ml-5`}>
          <Text style={tw`font-bold text-lg`}>{type}</Text>
          <Text style={tw``}>{speed} km/h</Text>
          <Text style={tw``}>{price} VND</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default TaxiOptionCard;

const styles = StyleSheet.create({});
