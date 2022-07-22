import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import tw from "tailwind-react-native-classnames";
import { useDispatch } from "react-redux";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TripDetail from "../../components/TripDetail";
import Map from "../../components/Map";
import { useRef } from "react/cjs/react.development";
import GoogleAutoComplete from "../../components/GoogleAutoComplete";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons/faArrowLeft";
import { useNavigation } from "@react-navigation/native";
import Payment from "../../components/Payment";
import SafeAreaViewAdroid from "../../components/SafeAreaView";
import { setDestination } from "../../slices/navSlice";

const MapScreens = () => {
  const autocompleteRef = useRef();
  const stack = createNativeStackNavigator();
  const dispatch = useDispatch();

  const navigator = useNavigation();
  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <SafeAreaViewAdroid>
        <View style={tw`h-2/3 w-full bg-red-100`}>
          <View style={tw`absolute z-50 w-96 ml-1 rounded-full mt-2`}>
            <View style={tw`flex-row`}>
              <TouchableOpacity
                style={tw`px-5 py-4 mb-2 bg-gray-500 mr-2 rounded-lg flex items-center justify-center opacity-50 h-10 `}
                onPress={() => {
                  navigator.navigate("HomeScreen");
                }}
              >
                <FontAwesomeIcon icon={faArrowLeft} />
              </TouchableOpacity>
              <GoogleAutoComplete
                ref={autocompleteRef}
                styles={tw`relative top-10`}
                onPress={(data, details = null) => {
                  console.log(details)
                  let action = setDestination({
                    description: data.description,
                    lat: details.geometry.location.lat,
                    lng: details.geometry.location.lng,
                  });
                  dispatch(action);
                }}
                placeholder={"Pick destination..."}
              />
            </View>
          </View>
          <Map autocompleteInput={autocompleteRef} />
        </View>

        <View style={tw`h-1/3`}>
          <stack.Navigator>
            <stack.Screen
              name="TripDetail"
              component={TripDetail}
              options={{ headerShown: false }}
            />
            <stack.Screen
              name="Payment"
              component={Payment}
              options={{ headerShown: false }}
            />
          </stack.Navigator>
        </View>
      </SafeAreaViewAdroid>
    </KeyboardAvoidingView>
  );
};

export default MapScreens;

const styles = StyleSheet.create({});
