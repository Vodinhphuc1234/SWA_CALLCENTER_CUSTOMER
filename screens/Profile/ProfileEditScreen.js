import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import SafeAreaViewAdroid from "../../components/SafeAreaView";
import tw from "tailwind-react-native-classnames";
import {
  faArrowLeft,
  faCamera,
  faCircleCheck,
  faDriversLicense,
  faPencil,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation } from "@react-navigation/native";
import { Avatar, Input } from "@rneui/themed";
import { Button, Divider } from "@rneui/base";
import { Controller, useForm } from "react-hook-form";

const ProfileEditScreen = () => {
  const navigator = useNavigation();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    navigator.navigate("ProfileScreen");
  };
  return (
    <SafeAreaViewAdroid>
      <View style={tw`h-full p-8 bg-white`}>
        <View style={tw`flex-row items-center`}>
          <TouchableOpacity
            onPress={() => {
              navigator.navigate("ProfileScreen");
            }}
          >
            <FontAwesomeIcon icon={faArrowLeft} size={20} />
          </TouchableOpacity>
          <Text style={tw`text-xl font-bold ml-5 flex-grow`}>Edit Profile</Text>

          <Button
            buttonStyle={tw`bg-black rounded-full py-1`}
            onPress={handleSubmit(onSubmit)}
          >
            Save
          </Button>
        </View>
        <View style={tw`mt-8 flex-row justify-between`}>
          <View style={tw`flex items-center`}>
            <Avatar
              size={50}
              rounded
              source={{
                uri: "https://cdn.pixabay.com/photo/2019/11/03/20/11/portrait-4599553__340.jpg",
              }}
            />

            <TouchableOpacity style={tw`mt-2`}>
              <FontAwesomeIcon icon={faCamera} size={18} color="gray" />
            </TouchableOpacity>
          </View>
          <View style={tw`flex-grow ml-2 pr-2`}>
            <Text style={tw``}>
              Choose a beautiful Avatar, this make you better
            </Text>
          </View>
        </View>

        <View>
          <View style={tw`h-4/6`}>
            <Text style={tw`text-lg font-bold mt-10`}>Account</Text>

            <Text style={tw` font-medium mb-5`}>
              Enter your information below to edit
            </Text>
            <Text style={tw`text-xs`}>Full name:</Text>

            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  placeholder="Full Name"
                  rightIcon={<FontAwesomeIcon icon={faCircleCheck} />}
                  onBlur={onBlur}
                  onChangeText={(value) => onChange(value)}
                  value={value}
                />
              )}
              name="fullName"
              rules={{
                required: {
                  value: true,
                  message: "Full name is required",
                },
              }}
            />

            <Text style={tw`text-xs`}>Email:</Text>

            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  placeholder="Email"
                  rightIcon={<FontAwesomeIcon icon={faCircleCheck} />}
                  onBlur={onBlur}
                  onChangeText={(value) => onChange(value)}
                  value={value}
                />
              )}
              name="email"
              rules={{
                required: {
                  value: true,
                  message: "Email is required",
                },
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "invalid email address",
                },
              }}
            />
            <Text style={tw`text-xs`}>Phone number:</Text>

            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  keyboardType="numeric"
                  placeholder="Phone number"
                  rightIcon={<FontAwesomeIcon icon={faCircleCheck} />}
                  onBlur={onBlur}
                  onChangeText={(value) => onChange(value)}
                  value={value}
                  minLength={10}
                  maxLength={10}
                />
              )}
              name="phoneNumber"
              rules={{
                required: {
                  value: true,
                  message: "Phone number is required",
                },
                maxLength: {
                  value: 10,
                  message: "Phone number must be at most 10 characters",
                },
                minLength: {
                  value: 10,
                  message: "Phone number must be at least 10 characters",
                },
              }}
            />
          </View>

          {Object.keys(errors).length > 0 && (
            <View style={tw`px-5 pb-2 rounded-lg bg-red-100`}>
              {Object.keys(errors).map((key, i) => (
                <Text style={tw`text-red-500 font-medium mt-2`} key={i}>
                  {errors[key].message}
                </Text>
              ))}
            </View>
          )}
        </View>
      </View>
    </SafeAreaViewAdroid>
  );
};

export default ProfileEditScreen;

const styles = StyleSheet.create({});
