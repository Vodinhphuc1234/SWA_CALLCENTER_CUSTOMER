import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowRight, faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { Input } from "@rneui/themed";
import tw from "tailwind-react-native-classnames";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react/cjs/react.development";

const PhoneNumberScreen = () => {
  const navigator = useNavigation();
  const [phoneNumber, setPhoneNumber] = useState();
  return (
    <>
      <View style={tw`h-5/6`}>
        <Text style={tw`text-xl font-bold mb-5`}>Login</Text>
        <Text style={tw` font-medium mb-5`}>
          Enter your phone number to receive OTP throungh SMS
        </Text>
        <Text style={tw`text-xs`}>Phone number:</Text>
        <Input
          keyboardType="numeric"
          rightIcon={
            <FontAwesomeIcon
              icon={faCircleCheck}
              placeholder="Enter your phone number"
            />
          }
          minLength={10}
          maxLength={10}
          value={phoneNumber}
          onChangeText={(text) => {
            setPhoneNumber(text);
          }}
        ></Input>
      </View>
      <TouchableOpacity
        style={tw`absolute p-4 bg-black bottom-5 right-5 rounded-full ${
          !phoneNumber && "opacity-50"
        }`}
        onPress={() => {
          navigator.navigate("OTPScreen");
        }}
        disabled={!phoneNumber}
      >
        <FontAwesomeIcon icon={faArrowRight} color="white" size={20} />
      </TouchableOpacity>
    </>
  );
};

export default PhoneNumberScreen;
