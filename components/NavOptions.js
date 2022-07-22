import { StyleSheet, View, Image, Text } from "react-native";
import React from "react";
import tw from "tailwind-react-native-classnames";
import { TouchableOpacity } from "react-native";
import { Icon } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { selectOrigin } from "../slices/navSlice";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faAngleRight, faArrowRight } from "@fortawesome/free-solid-svg-icons";

const NavOptions = () => {
  const navigation = useNavigation();
  const origin = useSelector(selectOrigin);
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
          <Text style={tw`font-bold text-lg`}>Get a ride</Text>
          <View style={tw`bg-white rounded-full p-2 ml-5`}>
            <FontAwesomeIcon icon={faAngleRight} size={20} />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default NavOptions;

const styles = StyleSheet.create({});
