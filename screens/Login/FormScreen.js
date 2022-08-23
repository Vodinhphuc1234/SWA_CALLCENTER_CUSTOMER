import {
  faArrowRight,
  faCircleCheck,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Input } from "@rneui/themed";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
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

const FormScreen = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const pingAuth = useSelector(selectPingAuth);

  const onSubmit = async (data) => {
    setLoading(true);
    const ret = await login(data.username.replace("0", "+84"), data.password);
    if (ret?.data?.message) {
      Alert.alert("Authentication Error", ret.data.message);
    } else {
      AsyncStorage.setItem("token", ret.token);
      dispatch(setPingAuth(!pingAuth));
    }
    setLoading(false);
  };

  return (
    <>
      <View style={tw`h-5/6`}>
        <Text style={tw`text-xl font-bold mb-5`}>Login</Text>
        <Text style={tw` font-medium mb-5`}>
          Enter your phone number or email and your password to login{" "}
        </Text>
        <Text style={tw`text-xs`}>Phone number:</Text>

        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              placeholder="Email or phone number"
              rightIcon={
                <FontAwesomeIcon
                  icon={errors.username ? faTimesCircle : faCircleCheck}
                  color={errors.username ? "darkred" : "green"}
                />
              }
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
              keyboardType="numeric"
            />
          )}
          name="username"
          rules={{
            required: {
              value: true,
              message: "Username is required",
            },
          }}
        />
        <Text style={tw`text-xs`}>Password:</Text>

        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              placeholder="Your password"
              rightIcon={
                <FontAwesomeIcon
                  icon={errors.password ? faTimesCircle : faCircleCheck}
                  color={errors.password ? "darkred" : "green"}
                />
              }
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
              secureTextEntry={true}
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
              message: "Length of password is 8",
            },
            minLength: {
              value: 8,
              message: "Length of password is 8",
            },
          }}
        />
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
        style={tw`absolute p-4 bg-black bottom-5 right-5 rounded-full`}
        disabled={Object.keys(errors).length != 0 || loading}
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
