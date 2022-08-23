import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import SafeAreaViewAdroid from "../../components/SafeAreaView";

import {
  faArrowLeft,
  faCircleQuestion
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import tw from "tailwind-react-native-classnames";
import FormScreen from "./FormScreen";

const RegisterScreen = () => {
  const Stack = createNativeStackNavigator();
  const navigator = useNavigation();
  return (
    <SafeAreaViewAdroid>
      <View style={tw`h-full p-5`}>
        <View style={tw`flex-row justify-between mb-1`}>
          <TouchableOpacity
            onPress={() => {
              navigator.navigate("WellcomeScreen");
            }}
          >
            <FontAwesomeIcon icon={faArrowLeft} size={20} />
          </TouchableOpacity>
          <FontAwesomeIcon icon={faCircleQuestion} size={20} />
        </View>
        <FormScreen />
      </View>
    </SafeAreaViewAdroid>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({});
