import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import SafeAreaViewAdroid from "../components/SafeAreaView";
import tw from "tailwind-react-native-classnames";
import { Button, Input } from "@rneui/themed";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faCircleQuestion,
  faMarsAndVenus,
  faPersonCircleQuestion,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigation } from "@react-navigation/native";

const WellcomeScreen = () => {
  const navigator = useNavigation();
  return (
    <SafeAreaViewAdroid>
      <View style={tw`p-5 bg-white`}>
        <View style={tw`h-1/6 flex-row justify-between`}>
          <View style={tw`h-10 bg-gray-200 p-3 rounded-full`}>
            <Text style={tw`font-bold text-center`}>CALL CENTER</Text>
          </View>
          <TouchableOpacity style={tw`p-3 bg-gray-100 h-10 rounded-full`}>
            <FontAwesomeIcon icon={faCircleQuestion} />
          </TouchableOpacity>
        </View>
        <View style={tw`h-3/6 flex justify-center items-center`}>
          <Text style={tw`font-bold text-3xl mb-10`}>
            Wellcome to our service
          </Text>
          <Image
            style={tw`h-2/3 w-2/3`}
            source={{
              uri: "https://img.freepik.com/free-vector/illustration-taxi-driver-moves-by-car-smiling-format-eps-10_481160-1149.jpg?w=2000",
            }}
          />
        </View>
        <View style={tw`h-2/6 flex justify-center`}>
          <Button
            buttonStyle={tw`mb-10 rounded-full bg-black`}
            onPress={() => {
              navigator.navigate("LoginScreen");
            }}
          >
            Login
          </Button>
          <Button
            type="outline"
            buttonStyle={tw`rounded-full border-black text-black mb-10`}
            titleStyle={tw`text-black`}
            onPress={() => {
              navigator.navigate("RegisterScreen");
            }}
          >
            Register
          </Button>
          <Text>
            If you don't have an account, register an account by your phone
            number?
          </Text>
        </View>
      </View>
    </SafeAreaViewAdroid>
  );
};

export default WellcomeScreen;

const styles = StyleSheet.create({});
