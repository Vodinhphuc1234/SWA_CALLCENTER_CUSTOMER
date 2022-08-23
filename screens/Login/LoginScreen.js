import {
  faArrowLeft,
  faCircleQuestion
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import tw from "tailwind-react-native-classnames";
import SafeAreaViewAdroid from "../../components/SafeAreaView";
import FormScreen from "./FormScreen";

const LoginScreen = () => {
  const Stack = createNativeStackNavigator();
  const navigator = useNavigation();
  return (
    <SafeAreaViewAdroid>
      <View style={tw`h-full p-5`}>
        <View style={tw`h-1/6 flex-row justify-between`}>
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

export default LoginScreen;

const styles = StyleSheet.create({});
