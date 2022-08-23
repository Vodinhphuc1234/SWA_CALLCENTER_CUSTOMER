import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as Notifications from "expo-notifications";
import React, { useEffect, useRef } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  resetTrip,
  selectDriverInfomation,
  selectIP,
  selectSocketLink,
  selectTripInformation,
  setDestination,
  setDriverInformation,
  setOrigin,
  setSocketLink,
  setTripInformation,
  updateDriverInformation,
} from "../slices/navSlice";
import convertTripInformation from "../Utils/adapter/convertReceiveTrip";
import requestNotificationPermisson from "../Utils/requestNotificationPermisson";
import getListTrips from "../Utils/trip/getListTrips";
import HomeScreen from "./HomeScreen";
import HistoryScreen from "./Profile/History";
import ProfileEditScreen from "./Profile/ProfileEditScreen";
import ProfileScreen from "./Profile/ProfileScreen";
import MapScreens from "./Trip/MapScreens";
import ProcessingScreen from "./Trip/ProcessingScreen";
import RatingScreen from "./Trip/RatingScreen";
import localPushNotification from "../Utils/localPushNotification";

const AuthenticatedScreen = () => {
  const Stack = createNativeStackNavigator();
  const socketLink = useSelector(selectSocketLink);
  const dispatch = useDispatch();
  var ws = useRef();
  var intervalId = useRef();
  const navigator = useNavigation();
  const IP = useSelector(selectIP);
  const driverInfo = useSelector(selectDriverInfomation);

  const tripInfo = useSelector(selectTripInformation);
  //use effect for socket
  useEffect(() => {
    if (socketLink) {
      console.log(socketLink);
      ws.current = new WebSocket(socketLink);
      ws.current.onopen = () => {
        console.log("Connected to the server");
      };
      ws.current.onclose = (e) => {
        navigator.navigate("HomeScreen");

        if (
          tripInfo?.status === "assigned" ||
          tripInfo?.status === "processing"
        )
          localPushNotification(
            "Notification about your trip",
            "Your trip is cancled."
          );
        else {
          localPushNotification(
            "Notification about your trip",
            "Your trip is complete. Thanks for using our service"
          );
        }
        dispatch(resetTrip());
      };
      ws.current.onerror = (e) => {
        console.log(e.message);
      };
      ws.current.onmessage = (e) => {
        console.log(e.data);
        const data = JSON.parse(e.data);

        dispatch(setTripInformation({ status: data.status }));

        if (data.status == "assigned" && !driverInfo) {
          localPushNotification(
            "Notification about your trip",
            "Driver getted trip."
          );
          dispatch(
            setDriverInformation({
              email: data.data.driver_email,
              name: data.data.driver_name,
              phoneNumber: data.data.driver_phone_number,
            })
          );
        }

        if (data.status == "pick_up" && tripInfo.status != "pick_up") {
          localPushNotification(
            "Notification about your trip",
            "Driver arrive origin."
          );
        }

        if (
          data.status == "canceled_by_driver" &&
          tripInfo.status != "canceled_by_driver"
        ) {
          localPushNotification(
            "Notification about your trip",
            "Driver cancled trip."
          );
          dispatch(setDriverInformation(null));
        }

        if (data?.data?.coordinates) {
          dispatch(
            updateDriverInformation({
              coordinates: {
                lat: data?.data?.coordinates.latitude,
                lng: data?.data?.coordinates.longitude,
              },
            })
          );
        }
      };

      intervalId.current = setInterval(() => {
        ws.current.send("Ping");
      }, 4000);
    }
    return () => {
      clearInterval(intervalId.current);
    };
  }, [socketLink, tripInfo, driverInfo]);

  //effect for get trip

  useEffect(() => {
    const asyncFunc = async () => {
      const data = await getListTrips(500, 0);

      console.log(data);

      if (!data.message) {
        data.results.forEach((item) => {
          if (
            item.status === "assigned" ||
            item.status === "processing" ||
            item.status == "pick_up"
          ) {
            const trip = convertTripInformation(item, IP);
            dispatch(
              setOrigin({
                ...trip.origin,
              })
            );

            dispatch(
              setDestination({
                ...trip.destination,
              })
            );

            dispatch(
              setTripInformation({
                ...trip.tripInformation,
              })
            );

            if (trip.driverInformation)
              dispatch(
                setDriverInformation({
                  ...trip.driverInformation,
                })
              );

            dispatch(setSocketLink(trip.socketLink));
          }
        });
      }
    };

    asyncFunc();
  }, [IP]);

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

  return (
    <>
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
          name="HistoryScreen"
          component={HistoryScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="RatingScreen"
          component={RatingScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>

      {tripInfo?.status && (
        <View>
          <TouchableOpacity
            style={{
              margin: 10,
              backgroundColor: "green",
              borderRadius: 5,
              padding: 10,
            }}
            onPress={() => {
              navigator.navigate("ProcessingScreen");
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  backgroundColor: "yellow",
                  width: 90,
                  fontWeight: "600",
                  fontSize: 12,
                  color: "gray",
                  textAlign: "center",
                  borderRadius: 10,
                  padding: 3,
                  marginBottom: 5,
                }}
              >
                {tripInfo.status}
              </Text>
              <Text
                style={{ color: "white", fontSize: 16, fontWeight: "bold" }}
              >
                Price: {tripInfo.price}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

export default AuthenticatedScreen;
