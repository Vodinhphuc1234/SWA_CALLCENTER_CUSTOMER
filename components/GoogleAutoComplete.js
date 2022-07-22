import { StyleSheet } from "react-native";
import React from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAP_API } from "@env";
import { forwardRef } from "react/cjs/react.development";

const GoogleAutoComplete = (props, ref) => {
  return (
    <GooglePlacesAutocomplete
      ref={ref}
      placeholder="Search"
      debounce={400}
      nearbyPlacesAPI="GooglePlacesSearch"
      fetchDetails={true}
      query={{
        key: GOOGLE_MAP_API,
        language: "en",
      }}
      {...props}
      onPress={props.onPress}
    />
  );
};

export default forwardRef(GoogleAutoComplete);

const styles = StyleSheet.create({});
