import { StyleSheet, Text, View } from "react-native";
import React from "react";
import * as Location from "expo-location";

const getCurrentLocation = async () => {
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status === "granted") {
    let location = await Location.getCurrentPositionAsync({});
    return location;
  } else {
    Alert("No permission to access");
    return null;
  }
};

export default getCurrentLocation;
