import AsyncStorage from "@react-native-async-storage/async-storage";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useContext, useEffect } from "react";
import { StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { SocketContext } from "../context/socketContext";
import { addMessages, selectUser, setUser } from "../slices/navSlice";
import HomeScreen from "./HomeScreen";
import LoginScreen from "./Login/LoginScreen";
import ProfileEditScreen from "./Profile/ProfileEditScreen";
import ProfileScreen from "./Profile/ProfileScreen";
import RegisterScreen from "./Register/RegisterScreen";
import MapScreens from "./Trip/MapScreens";
import ProcessingScreen from "./Trip/ProcessingScreen";
import RatingScreen from "./Trip/RatingScreen";
import WellcomeScreen from "./WellcomeScreen";

const NavigationScreen = () => {
  const Stack = createNativeStackNavigator();

  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const socket = useContext(SocketContext);

  const handleAddMessages = (tempMessages) => {
    const sendedMessages = [];
    tempMessages.forEach((message) => {
      sendedMessages.push({
        ...message,
        createdAt: `${message.createdAt}`,
      });
    });
    console.log(sendedMessages);
    const action = addMessages(sendedMessages);
    dispatch(action);
  };

  useEffect(() => {
    // send a message to the server
    socket.emit("onJoin", "customer", "trip");

    // receive a message from the server
    socket.on("sendMessage", (message) => {
      console.log("receive");
      const { text, createdAt, from } = message;

      var messages = [];
      messages.push({
        _id: Math.random() * 10,
        text: text,
        createdAt: createdAt,
        user: {
          _id: 2,
          name: "React Native",
          avatar: "https://placeimg.com/140/140/any",
        },
      });
      handleAddMessages(messages);
      console.log(text, createdAt, from);
    });
  }, []);

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
  // const notificationListener = useRef();

  //effect for reaceive notification
  // useEffect(() => {
  // let token;
  // const asyncGetToken = async () => {
  //   token = await requestNotificationPermisson(Notifications);
  //   notificationListener.current =
  //     Notifications.addNotificationReceivedListener((notification) => {
  //       console.log(notification.request.content.data);
  //     });
  //   console.log(token);
  // };
  // asyncGetToken();

  // return () => {
  //   Notifications.removeNotificationSubscription(
  //     notificationListener.current
  //   );
  // };
  // const socket = io("ws://swa-socket.herokuapp.com");
  // const action = setSocket(socket);
  // dispatch(action);
  // }, []);

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
