import { NavigationContainer } from "@react-navigation/native";
import { Text, View } from "react-native";
import "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ToastProvider } from "react-native-toast-notifications";
import { Provider } from "react-redux";
import tw from "tailwind-react-native-classnames";
import NavigationScreen from "./screens/NavigationScreen";
import store from "./store";
import { SocketContext, socket } from "./context/socketContext";

export default function App() {
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
            borderLeftColor: "gray",
          }}
        >
          <View style={tw`bg-gray-100 w-20 rounded-full`}>
            <Text style={tw`text-center font-medium`}>Call center</Text>
          </View>
          <Text style={tw`mt-3 font-bold text-base`}>
            {toastOptions.data.title}
          </Text>
          <Text>{toastOptions.message}</Text>
        </View>
      )}
    >
      <Provider store={store}>
        <SafeAreaProvider>
          <NavigationContainer>
            <SocketContext.Provider value={socket}>
              <NavigationScreen />
            </SocketContext.Provider>
          </NavigationContainer>
        </SafeAreaProvider>
      </Provider>
    </ToastProvider>
  );
}
