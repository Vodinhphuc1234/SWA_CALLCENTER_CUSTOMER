import { faAngleRight, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import tw from "tailwind-react-native-classnames";
import { selectOrigin, selectTripInformation } from "../slices/navSlice";

const NavOptions = () => {
  const navigation = useNavigation();
  const origin = useSelector(selectOrigin);
  const tripInfo = useSelector(selectTripInformation);
  return (
    <View style={tw`flex`}>
      <TouchableOpacity
        style={tw`flex p-8 bg-gray-100 rounded-lg w-8/12 justify-center items-center
        `}
        onPress={() => {
          navigation.navigate("MapScreen");
        }}
        disabled={!origin}
      >
        <Image
          style={{
            height: 100,
            width: 100,
            resizeMode: "contain",
          }}
          source={{
            uri: "https://pngimg.com/uploads/mercedes/mercedes_PNG80135.png",
          }}
        />

        <View style={tw`flex-row items-center`}>
          <Text style={tw`font-bold text-lg`}>
            {tripInfo?.status == "processing" || tripInfo?.status == "assigned" || tripInfo?.status == "pick_up"
              ? "Track your trip"
              : "Get a taxi"}
          </Text>
          <View style={tw`bg-white rounded-full p-2 ml-5`}>
            {tripInfo?.status == "processing" ||
            tripInfo?.status == "assigned" || tripInfo?.status == "pick_up" ? (
              <FontAwesomeIcon icon={faSearch} size={20} />
            ) : (
              <FontAwesomeIcon icon={faAngleRight} size={20} />
            )}
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default NavOptions;

const styles = StyleSheet.create({});
