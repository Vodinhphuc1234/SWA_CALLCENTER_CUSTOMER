import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./HomeScreen";
import MapScreens from "./Trip/MapScreens";
import ProcessingScreen from "./Trip/ProcessingScreen";
import RatingScreen from "./Trip/RatingScreen";
import WellcomeScreen from "./WellcomeScreen";
import LoginScreen from "./Login/LoginScreen";
import RegisterScreen from "./Register/RegisterScreen";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { selectUser, setUser } from "../slices/navSlice";
import ProfileScreen from "./Profile/ProfileScreen";
import ProfileEditScreen from "./Profile/ProfileEditScreen";
import * as Notifications from "expo-notifications";
import requestNotificationPermisson from "../Utils/requestNotificationPermisson";
import { useRef } from "react";

const NavigationScreen = () => {
  const Stack = createNativeStackNavigator();

  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const asyncUser = async () => {
      let userToken = null;

      try {
        userToken = await AsyncStorage.getItem("USER_TOKEN");
      } catch (e) {
        console.log(e);
      }

      dispatch(setUser({ userToken: userToken }));
    };

    asyncUser();
  }, []);

  //useRef for hold current of notification and timeout
  const notificationListener = useRef();

  //effect for reaceive notification
  useEffect(() => {
    let token;
    const asyncGetToken = async () => {
      token = await requestNotificationPermisson(Notifications);
      notificationListener.current =
        Notifications.addNotificationReceivedListener((notification) => {
          console.log(notification.request.content.data);
        });
      console.log(token);
    };
    asyncGetToken();

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
    };
  }, []);

  return user && user.userToken ? (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProfileEditScreen"
        component={ProfileEditScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MapScreen"
        component={MapScreens}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProcessingScreen"
        component={ProcessingScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RatingScreen"
        component={RatingScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  ) : (
    <Stack.Navigator>
      <Stack.Screen
        name="WellcomeScreen"
        component={WellcomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default NavigationScreen;

const styles = StyleSheet.create({});
