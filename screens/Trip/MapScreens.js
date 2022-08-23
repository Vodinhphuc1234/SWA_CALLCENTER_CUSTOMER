import {
  faAngleDown,
  faAngleUp,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons/faArrowLeft";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Avatar } from "@rneui/base";
import React, { useEffect, useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Collapsible from "react-native-collapsible";
import Modal from "react-native-modal";
import { useDispatch, useSelector } from "react-redux";
import tw from "tailwind-react-native-classnames";
import ChatComponent from "../../components/ChatComponent";
import { CustomizedAutoCompletePlace } from "../../components/CustomizedAutoCompletePlace";
import Map from "../../components/Map";
import Payment from "../../components/Payment";
import SafeAreaViewAdroid from "../../components/SafeAreaView";
import TrackedTrip from "../../components/TrackedTrip";
import TripDetail from "../../components/TripDetail";
import {
  selectDestination,
  selectOrigin,
  selectTripInformation,
  setDestination,
  setOrigin,
} from "../../slices/navSlice";

const MapScreens = () => {
  const [messageModalVisible, setMessageModalVisible] = useState(false);

  //trip information
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);

  const tripInfo = useSelector(selectTripInformation);
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
              position: "absolute",
            }}
          >
            {!isCollapsed && (
              <View style={{ height: 100 }}>
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
        <View style={{ height: `${isCollapsed ? 94 : 65}%` }}>
          <View style={{ position: "absolute", margin: 5, zIndex: 25 }}>
            <View
              style={tw`flex-row items-center
            `}
            >
              <TouchableOpacity
                style={tw`px-5 py-4 bg-gray-500 mr-2 rounded-lg flex items-center justify-center opacity-50 h-10 `}
                onPress={() => {
                  navigator.goBack();
                }}
              >
                <FontAwesomeIcon icon={faArrowLeft} />
              </TouchableOpacity>
            </View>
          </View>
          <Map />
          <TouchableOpacity
            style={{ position: "absolute", bottom: 10, left: 10 }}
            onPress={() => {
              setMessageModalVisible(true);
            }}
          >
            <Avatar
              size={50}
              rounded
              containerStyle={{
                backgroundColor: "blue",
              }}
              icon={{ name: "send", type: "font-awesome" }}
            />
          </TouchableOpacity>
          <Modal
            isVisible={messageModalVisible}
            swipeDirection="up"
            onSwipeComplete={() => setMessageModalVisible(false)}
            animationIn="slideInUp"
          >
            <View
              style={{
                backgroundColor: "white",
                shadowColor: "back",
                width: "100%",
                height: "90%",
                borderRadius: 10,
                padding: 3,
              }}
            >
              <View
                style={{
                  width: "100%",
                  height: 50,
                  display: "flex",
                  backgroundColor: "#f2f3f4",
                  justifyContent: "center",
                  alignItems: "center",
                  position: "relative",
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 16,
                    fontWeight: "700",
                  }}
                >
                  Chat with your customer
                </Text>
                <TouchableOpacity
                  style={{ position: "absolute", right: 20, padding: 10 }}
                  onPress={() => {
                    setMessageModalVisible(false);
                  }}
                >
                  <FontAwesomeIcon icon={faTimesCircle} color="gray" />
                </TouchableOpacity>
              </View>
              <ChatComponent />
            </View>
          </Modal>
        </View>

        <View
          style={{ height: `${isCollapsed ? 6 : 35}%` }}
          onTouchEnd={() => {
            setIsCollapsed(false);
          }}
        >
          {tripInfo?.status == "processing" ||
          tripInfo?.status == "assigned" ||
          tripInfo?.status == "pick_up" ? (
            <TrackedTrip />
          ) : (
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
          )}
        </View>
      </SafeAreaViewAdroid>
    </KeyboardAvoidingView>
  );
};

export default MapScreens;
