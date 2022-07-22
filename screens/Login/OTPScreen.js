import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Input } from "@rneui/themed";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import tw from "tailwind-react-native-classnames";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { setUser } from "../../slices/navSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

const OTPScreen = () => {
  const navigator = useNavigation();
  const dispatch = useDispatch();
  return (
    <>
      <View style={tw`h-5/6`}>
        <Text style={tw`text-xl font-bold mb-5`}>Your OTP was sent!</Text>
        <Text style={tw` font-medium mb-5`}>
          Enter your OTP that just was sent to your phone number.
        </Text>
        <Text style={tw`text-xs`}>OTP:</Text>
        <Input
          keyboardType="numeric"
          maxLength={6}
          rightIcon={
            <FontAwesomeIcon
              icon={faCircleCheck}
              placeholder="Enter your phone number"
            />
          }
        ></Input>
      </View>
      <TouchableOpacity
        style={tw`absolute p-4 bg-black bottom-5 left-5 rounded-full`}
        onPress={() => {
          navigator.navigate("PhoneNumberScreen");
        }}
      >
        <FontAwesomeIcon icon={faArrowLeft} color="white" size={20} />
      </TouchableOpacity>
      <TouchableOpacity
        style={tw`absolute p-4 bg-black bottom-5 right-5 rounded-full`}
        onPress={async () => {
          await AsyncStorage.setItem("USER_TOKEN", "This is token");
          dispatch(setUser({ userToken: "This is token" }));
        }}
      >
        <FontAwesomeIcon icon={faArrowRight} color="white" size={20} />
      </TouchableOpacity>
    </>
  );
};

export default OTPScreen;
