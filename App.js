import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import store from "./store";
import { NavigationContainer } from "@react-navigation/native";
import "react-native-gesture-handler";
import NavigationScreen from "./screens/NavigationScreen";
import { useEffect, useRef } from "react";
import { AppState, Text, View } from "react-native";
import { ToastProvider } from "react-native-toast-notifications";
import tw from "tailwind-react-native-classnames";
import { registerRootComponent } from 'expo';

export default function App() {
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      console.log(nextAppState);
      appState.current = nextAppState;

      if (nextAppState == "background") {
        //fetch api
      }
    });
    return () => {
      subscription.remove();
    };
  }, []);
  return (
    <ToastProvider
      duration={20000}
      placement="top"
      offset={50}
      animationType="slide-in"
      renderToast={(toastOptions) => (
        <View
          style={{
            paddingVertical: 7,
            paddingHorizontal: 15,
            backgroundColor: "white",
            width: "85%",
            borderRadius: 10,
            borderColor: "lightgray",
            borderWidth: 1,
            borderLeftWidth: 5,
            borderLeftColor: "gray"
          }}
        >
          <View style = {tw`bg-gray-100 w-20 rounded-full`}>
            <Text style={tw`text-center font-medium`}>
              Call center
            </Text>
          </View>
          <Text style={tw`mt-3 font-bold text-base`}>{toastOptions.data.title}</Text>
          <Text>{toastOptions.message}</Text>
        </View>
      )}
    >
      <Provider store={store}>
        <SafeAreaProvider>
          <NavigationContainer>
            <NavigationScreen />
          </NavigationContainer>
        </SafeAreaProvider>
      </Provider>
    </ToastProvider>
  );
}
registerRootComponent(App);
