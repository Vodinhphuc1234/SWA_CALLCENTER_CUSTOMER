import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import SafeAreaViewAdroid from "../../components/SafeAreaView";
import tw from "tailwind-react-native-classnames";
import {
  faArrowLeft,
  faDriversLicense,
  faPencil,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation } from "@react-navigation/native";
import { Avatar } from "@rneui/themed";
import { Divider } from "@rneui/base";
import { useSelector } from "react-redux";
import { selectUser } from "../../slices/navSlice";

const ProfileScreen = () => {
  const navigator = useNavigation();
  const user = useSelector(selectUser);
  return (
    <SafeAreaViewAdroid>
      <View style={tw`h-full p-8 bg-white`}>
        <View style={tw`flex-row items-center`}>
          <TouchableOpacity
            onPress={() => {
              navigator.navigate("HomeScreen");
            }}
          >
            <FontAwesomeIcon icon={faArrowLeft} size={20} />
          </TouchableOpacity>
          <Text style={tw`text-xl font-bold ml-5`}>Profile</Text>
        </View>
        <View style={tw`mt-8 flex-row justify-between`}>
          <View>
            <Avatar
              size={40}
              rounded
              source={{
                uri: "https://cdn.pixabay.com/photo/2019/11/03/20/11/portrait-4599553__340.jpg",
              }}
            />
          </View>
          <View style={tw`flex-grow ml-5`}>
            <Text style={tw`font-bold text-lg mb-3`}>
              {user.firstName} {user.lastName}
            </Text>
            <Text style={tw`font-medium`}>{user.phoneNumber}</Text>
            <Text style={tw`font-medium`}>{user.email}</Text>
          </View>
          <View>
            <TouchableOpacity
              style={tw`flex items-center justify-center px-2 py-1 rounded-full`}
              onPress={() => {
                navigator.navigate("ProfileEditScreen");
              }}
            >
              <FontAwesomeIcon icon={faPencil} size={20} />
            </TouchableOpacity>
          </View>
        </View>

        <Text style={tw`text-lg font-bold mt-10`}>Account</Text>

        <View>
          <Divider />
          <TouchableOpacity
            style={tw`flex-row items-center px-5 py-3`}
            onPress={() => {
              navigator.navigate("HistoryScreen");
            }}
          >
            <FontAwesomeIcon icon={faDriversLicense} />
            <Text style={tw`font-bold ml-5`}>Ride history</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaViewAdroid>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
