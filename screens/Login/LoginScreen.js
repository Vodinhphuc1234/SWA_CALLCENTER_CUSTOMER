import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import SafeAreaViewAdroid from "../../components/SafeAreaView";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faArrowLeft,
  faArrowLeftRotate,
  faArrowRight,
  faCircleCheck,
  faCircleQuestion,
} from "@fortawesome/free-solid-svg-icons";
import tw from "tailwind-react-native-classnames";
import { Input } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PhoneNumberScreen from "./PhoneNumberScreen";
import OTPScreen from "./OTPScreen";

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
        <Stack.Navigator>
          <Stack.Screen
            name="PhoneNumberScreen"
            component={PhoneNumberScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="OTPScreen"
            component={OTPScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </View>
    </SafeAreaViewAdroid>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
