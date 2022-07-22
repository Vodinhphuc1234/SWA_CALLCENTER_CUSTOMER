import React from "react";
import { Platform, StatusBar, SafeAreaView } from "react-native";
const SafeAreaViewAdroid = ({ children, ...rest }) => {
  return (
    <SafeAreaView
      style={{
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        height: "100%",
      }}
      {...rest}
    >
      {children}
    </SafeAreaView>
  );
};

export default SafeAreaViewAdroid;
