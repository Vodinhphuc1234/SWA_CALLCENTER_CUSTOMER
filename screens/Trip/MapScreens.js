import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import tw from "tailwind-react-native-classnames";
import { useDispatch, useSelector } from "react-redux";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TripDetail from "../../components/TripDetail";
import Map from "../../components/Map";
import { useRef } from "react/cjs/react.development";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons/faArrowLeft";
import { useNavigation } from "@react-navigation/native";
import Payment from "../../components/Payment";
import SafeAreaViewAdroid from "../../components/SafeAreaView";
import {
  selectDestination,
  selectOrigin,
  setDestination,
  setOrigin,
} from "../../slices/navSlice";
import { CustomizedAutoCompletePlace } from "../../components/CustomizedAutoCompletePlace";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";

const MapScreens = () => {
  //trip information
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);

  //input ref
  const originInput = useRef(null);
  const destinationInput = useRef(null);

  //screen
  const stack = createNativeStackNavigator();
  const dispatch = useDispatch();

  //collapse
  const [isCollapsed, setIsCollapsed] = useState(false);

  //function
  const handleChangeDestination = (destination) => {
    let action = setDestination({
      ...destination,
    });
    dispatch(action);
  };
  const handleChangeOrigin = (origin) => {
    let action = setOrigin({
      ...origin,
    });
    dispatch(action);
  };
  const navigator = useNavigation();

  useEffect(() => {
    origin && originInput?.current?.setInputText(origin?.description);
    destination &&
      destinationInput?.current?.setInputText(destination?.description);
  }, [origin, destination, isCollapsed]);

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <SafeAreaViewAdroid>
        <View style={tw`z-50 w-full`}>
          <View
            style={{
              paddingHorizontal: 5,
              width: "100%",
              backgroundColor: "white",
              position: "absolute",
            }}
          >
            {!isCollapsed && (
              <View style = {{paddingVertical: 20}}>
                <CustomizedAutoCompletePlace
                  placeholder={"Pick origin..."}
                  handleLocationChange={handleChangeOrigin}
                  ref={originInput}
                />
                <CustomizedAutoCompletePlace
                  placeholder={"Pick destination..."}
                  handleLocationChange={handleChangeDestination}
                  ref={destinationInput}
                />
              </View>
            )}

            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                backgroundColor: "transaparent",
              }}
              onPress={() => {
                setIsCollapsed(!isCollapsed);
              }}
            >
              {isCollapsed ? (
                <TouchableOpacity
                  style={{
                    backgroundColor: "white",
                    padding: 0,
                    height: 30,
                    width: 50,
                    borderRadius: 20,
                    position: "absolute",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onPress={() => {
                    setIsCollapsed(!isCollapsed);
                  }}
                >
                  <FontAwesomeIcon icon={faAngleDown} size={20} />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={{
                    backgroundColor: "white",

                    width: 50,
                    height: 30,
                    borderRadius: 20,
                    position: "absolute",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onPress={() => {
                    setIsCollapsed(!isCollapsed);
                  }}
                >
                  <FontAwesomeIcon icon={faAngleUp} size={20} />
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
        <View style={tw`h-2/3 w-full bg-red-100`}>
          <View style={tw`absolute z-50 px-1 w-full rounded-full mt-2`}>
            <View
              style={tw`flex-row items-center w-full
            `}
            >
              <TouchableOpacity
                style={tw`px-5 py-4 bg-gray-500 mr-2 rounded-lg flex items-center justify-center opacity-50 h-10 `}
                onPress={() => {
                  navigator.navigate("HomeScreen");
                }}
              >
                <FontAwesomeIcon icon={faArrowLeft} />
              </TouchableOpacity>
            </View>
          </View>
          <Map />
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
