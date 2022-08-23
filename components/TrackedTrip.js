import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import tw from "tailwind-react-native-classnames";
import { useSelector } from "react-redux";
import {
  selectDriverInfomation,
  selectTripInformation,
} from "../slices/navSlice";
import { Avatar, Divider, Icon } from "@rneui/base";
import { useNavigation } from "@react-navigation/native";

const TrackedTrip = ({ props }) => {
  const tralvelInfomation = useSelector(selectTripInformation);
  const driverInfo = useSelector(selectDriverInfomation);
  return (
    <View style={tw`bg-white h-full`}>
      <View style={tw` mx-2 rounded-lg my-2`}>
        <Text style={tw`text-center py-1 text-lg font-bold`}>
          Your current trip
        </Text>
      </View>
      <View
        style={{
          borderBottomColor: "gray",
          borderBottomWidth: 0.5,
        }}
      />

      {tralvelInfomation && (
        <>
          <View style={tw`flex-grow flex-row px-10 items-center`}>
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
          <Divider style={{ marginBottom: 10 }} />

          {driverInfo && (
            <View
              style={{ display: "flex", flexDirection: "row", paddingLeft: 40 }}
            >
              <Avatar
                size={55}
                rounded
                source={{
                  uri: "https://cdn.pixabay.com/photo/2019/11/03/20/11/portrait-4599553__340.jpg",
                }}
              />
              <View
                style={{
                  marginLeft: 80,
                  display: "flex",
                  justifyContent: "space-evenly",
                }}
              >
                <Text style={{ fontSize: 14, fontWeight: "500" }}>
                  {driverInfo.name}
                </Text>
                <Text style={{ fontSize: 14, fontWeight: "500" }}>
                  {driverInfo.phoneNumber}
                </Text>
              </View>
            </View>
          )}
        </>
      )}
    </View>
  );
};

export default TrackedTrip;

const styles = StyleSheet.create({});
