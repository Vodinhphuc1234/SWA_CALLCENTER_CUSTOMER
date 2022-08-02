import { faSignOut } from "@fortawesome/free-solid-svg-icons";
import { faLocationCrosshairs } from "@fortawesome/free-solid-svg-icons/faLocationCrosshairs";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { Avatar } from "@rneui/themed";
import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch } from "react-redux";
import { useRef } from "react";
import tw from "tailwind-react-native-classnames";
import { CustomizedAutoCompletePlace } from "../components/CustomizedAutoCompletePlace";
import NavOptions from "../components/NavOptions";
import { setOrigin, setUser } from "../slices/navSlice";
import getCurrentLocation from "../Utils/getCurrentLocation";
import getLocationName from "../Utils/getLocationName";

const HomeScreen = () => {
  const navigator = useNavigation();
  const dispatch = useDispatch();
  const logout = async () => {
    await AsyncStorage.removeItem("USER_TOKEN");
    dispatch(setUser(null));
  };

  const inputRef = useRef();

  const handleSelectLocation = ({ description, lat, lng }) => {
    let action = setOrigin({
      description,
      lat,
      lng,
    });
    dispatch(action);
  };
  return (
    <SafeAreaView>
      <View style={[tw`relative p-8 bg-white h-full mt-7`]}>
        <View style={tw`flex-row justify-center`}>
          <Text
            style={tw`text-3xl flex-grow font-bold bg-gray-100 p-3 rounded-full text-center mb-10 mr-2`}
          >
            CALL CENTER
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigator.navigate("ProfileScreen");
            }}
          >
            <Avatar
              size={55}
              rounded
              source={{
                uri: "https://cdn.pixabay.com/photo/2019/11/03/20/11/portrait-4599553__340.jpg",
              }}
            />
          </TouchableOpacity>
        </View>

        <View style={tw`h-20  z-50`}>
          <View style={tw`absolute w-full flex-row items-center`}>
            <CustomizedAutoCompletePlace
              ref={inputRef}
              handleLocationChange={handleSelectLocation}
              placeholder="Choose origin location ..."
            />
            <TouchableOpacity
              style={tw`ml-1 bg-gray-100 px-4 rounded-full flex items-center justify-center h-12`}
              onPress={async () => {
                let location = await getCurrentLocation();

                if (!location) return;

                let address = await getLocationName(location.coords);
                inputRef?.current.setInputText("Your location is choosen");

                let action = setOrigin({
                  description: address,
                  lat: location.coords.latitude,
                  lng: location.coords.longitude,
                });
                dispatch(action);
              }}
            >
              <FontAwesomeIcon icon={faLocationCrosshairs} size={20} />
            </TouchableOpacity>
          </View>
        </View>

        <NavOptions />

        <TouchableOpacity
          style={tw`absolute bottom-20 right-5 bg-gray-500 h-10 w-10 rounded-full flex items-center justify-center`}
          onPress={async () => {
            await AsyncStorage.removeItem("USER_TOKEN");
            dispatch(setUser(null));
          }}
        >
          <FontAwesomeIcon icon={faSignOut} color="white" size={20} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
