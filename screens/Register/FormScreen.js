import {
  faArrowRight,
  faCircleCheck,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Input } from "@rneui/themed";
import React, { useState } from "react";
import { Controller, set, useForm } from "react-hook-form";
import {
  ActivityIndicator,
  Alert,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import tw from "tailwind-react-native-classnames";
import { selectPingAuth, setPingAuth } from "../../slices/navSlice";
import login from "../../Utils/auth/login";
import register from "../../Utils/auth/register";

const FormScreen = () => {
  const dispatch = useDispatch();
  const pingAuth = useSelector(selectPingAuth);
  const {
    handleSubmit,
    control,
    formState: { errors },
    getValues,
  } = useForm({ mode: "onChange" });

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    var phone_number;
    var password;

    setLoading(true);
    const dataRegister = await register({
      ...data,
      phone_number: data.phone_number.replace("0", "+84"),
    });
    setLoading(false);
    if (dataRegister?.data?.message) {
      Alert.alert("Registration Error", dataRegister.data.message);
      return;
    } else {
      phone_number = dataRegister.phone_number;
      password = dataRegister.password;
    }

    console.log("After register: ", phone_number, password);

    setLoading(true);
    const dataLogin = await login(phone_number, password);
    setLoading(false);
    if (dataLogin?.data?.message) {
      Alert.alert("Login Error", dataLogin.data.message);
    } else {
      AsyncStorage.setItem("token", dataLogin.token);
      dispatch(setPingAuth(!pingAuth));
    }
  };

  return (
    <>
      <View style={tw`h-full`}>
        <Text style={tw`text-xl font-bold mb-5`}>Register</Text>
        <Text style={tw` font-medium mb-5`}>
          Enter your information below to register
        </Text>

        <View style={{ display: "flex", flexDirection: "row" }}>
          <View style={{ flexGrow: 1 }}>
            <Text style={tw`text-xs`}>First name:</Text>

            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  placeholder="First Name"
                  rightIcon={
                    <FontAwesomeIcon
                      icon={
                        errors["first_name"] ? faTimesCircle : faCircleCheck
                      }
                      color={errors["first_name"] ? "darkred" : "green"}
                    />
                  }
                  onBlur={onBlur}
                  onChangeText={(value) => onChange(value)}
                  value={value}
                />
              )}
              name="first_name"
              rules={{
                required: {
                  value: true,
                  message: "First name is required",
                },
              }}
            />
          </View>

          <View style={{ flexGrow: 1 }}>
            <Text style={tw`text-xs`}>Last name:</Text>

            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  placeholder="Last Name"
                  rightIcon={
                    <FontAwesomeIcon
                      icon={errors["last_name"] ? faTimesCircle : faCircleCheck}
                      color={errors["last_name"] ? "darkred" : "green"}
                    />
                  }
                  onBlur={onBlur}
                  onChangeText={(value) => onChange(value)}
                  value={value}
                />
              )}
              name="last_name"
              rules={{
                required: {
                  value: true,
                  message: "Last name is required",
                },
              }}
            />
          </View>
        </View>

        <Text style={tw`text-xs`}>Email:</Text>

        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              placeholder="Email"
              rightIcon={
                <FontAwesomeIcon
                  icon={errors["email"] ? faTimesCircle : faCircleCheck}
                  color={errors["email"] ? "darkred" : "green"}
                />
              }
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
              rightIcon={
                <FontAwesomeIcon
                  icon={errors["phone_number"] ? faTimesCircle : faCircleCheck}
                  color={errors["phone_number"] ? "darkred" : "green"}
                />
              }
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
              minLength={10}
              maxLength={10}
            />
          )}
          name="phone_number"
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

        <View style={{ display: "flex", flexDirection: "row" }}>
          <View style={{ flexGrow: 1 }}>
            <Text style={tw`text-xs`}>Password:</Text>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  keyboardType="numeric"
                  placeholder="Password"
                  rightIcon={
                    <FontAwesomeIcon
                      icon={errors["password"] ? faTimesCircle : faCircleCheck}
                      color={errors["password"] ? "darkred" : "green"}
                    />
                  }
                  onBlur={onBlur}
                  onChangeText={(value) => onChange(value)}
                  value={value}
                  minLength={10}
                  maxLength={10}
                />
              )}
              name="password"
              rules={{
                required: {
                  value: true,
                  message: "Password is required",
                },
                maxLength: {
                  value: 8,
                  message: "Password's length must be 8 characters",
                },
                minLength: {
                  value: 8,
                  message: "Password's length must be 8 characters",
                },
              }}
            />
          </View>

          <View style={{ flexGrow: 1 }}>
            <Text style={tw`text-xs`}>Confirm:</Text>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  keyboardType="numeric"
                  placeholder="Confirm"
                  rightIcon={
                    <FontAwesomeIcon
                      icon={errors["confirmed"] ? faTimesCircle : faCircleCheck}
                      color={errors["confirmed"] ? "darkred" : "green"}
                    />
                  }
                  onBlur={onBlur}
                  onChangeText={(value) => onChange(value)}
                  value={value}
                  minLength={10}
                  maxLength={10}
                />
              )}
              name="confirmed"
              rules={{
                required: {
                  value: true,
                  message: "confirmed is required",
                },
                maxLength: {
                  value: 8,
                  message: "confirmed's length must be 8 characters",
                },
                minLength: {
                  value: 8,
                  message: "confirmed's length must be 8 characters",
                },
                validate: (value) => {
                  const { password } = getValues();
                  return password === value || "Passwords should match!";
                },
              }}
            />
          </View>
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
      <TouchableOpacity
        style={tw`absolute p-4 bg-black bottom-5 right-5 rounded-full z-50`}
        onPress={handleSubmit(onSubmit)}
      >
        {loading ? (
          <ActivityIndicator />
        ) : (
          <FontAwesomeIcon icon={faArrowRight} color="white" size={20} />
        )}
      </TouchableOpacity>
    </>
  );
};

export default FormScreen;
