import { View, Text, TouchableOpacity, FlatList } from "react-native";
import React from "react";
import { Input } from "@rneui/themed";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowRight, faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import tw from "tailwind-react-native-classnames";
import { useNavigation } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";

const FormScreen = () => {
  const navigator = useNavigation();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    navigator.navigate("OTPScreenRegister");
  };

  console.log(errors);

  return (
    <>
      <View style={tw`h-4/6`}>
        <Text style={tw`text-xl font-bold mb-5`}>Register</Text>
        <Text style={tw` font-medium mb-5`}>
          Enter your information below to register
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
      <TouchableOpacity
        style={tw`absolute p-4 bg-black bottom-5 right-5 rounded-full z-50`}
        onPress={handleSubmit(onSubmit)}
      >
        <FontAwesomeIcon icon={faArrowRight} color="white" size={20} />
      </TouchableOpacity>

      {Object.keys(errors).length > 0 && (
        <View style={tw`px-5 pb-2 rounded-lg bg-red-100`}>
          {Object.keys(errors).map((key, i) => (
            <Text style={tw`text-red-500 font-medium mt-2`} key={i}>
              {errors[key].message}
            </Text>
          ))}
        </View>
      )}
    </>
  );
};

export default FormScreen;
