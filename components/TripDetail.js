import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import tw from "tailwind-react-native-classnames";
import { useSelector } from "react-redux";
import { selectTripInformation } from "../slices/navSlice";
import { Divider, Icon } from "@rneui/base";
import { useNavigation } from "@react-navigation/native";

const TripDetail = ({ props }) => {
  const tralvelInfomation = useSelector(selectTripInformation);
  console.log(tralvelInfomation);
  const navigator = useNavigation();
  return (
    <View style={tw`bg-white h-full`}>
      <View style={tw` mx-2 rounded-lg my-2`}>
        <Text style={tw`text-center py-1 text-lg font-bold`}>Trip Detail</Text>
      </View>
      <Divider />

      {tralvelInfomation && (
        <>
          <View style={tw`flex-grow flex-row py-3 px-10 items-center`}>
            <View style={tw`mr-20 bg-gray-100 p-5 rounded-full`}>
              <Icon name="road" type="font-awesome" />
            </View>
            <View>
              <Text style={tw`text-xl font-bold`}>
                {tralvelInfomation.distance}
              </Text>
              <Text style={tw`text-sm text-gray-500`}>
                {tralvelInfomation.duration}
              </Text>
              <Text style={tw`text-sm text-gray-500`}>
                {tralvelInfomation.price}
              </Text>
            </View>
          </View>
          <Divider />

          <View style={tw`flex-row justify-evenly`}>
            <TouchableOpacity
              style={tw`bg-black text-center mt-2 py-2 w-40 rounded-full`}
              onPress={() => {
                navigator.navigate("Payment");
              }}
            >
              <View>
                <Text style={tw`text-center text-white`}>Pick Taxi Type</Text>
              </View>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

export default TripDetail;

const styles = StyleSheet.create({});
