import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// import Constants from "expo-constants";

// const { manifest } = Constants;

// const uri = `http://${manifest.debuggerHost.split(":").shift()}:8000`;

const getInstance = async () => {
  const IP = await AsyncStorage.getItem("IP");
  const uri = `http://${IP}:8000`;
  const token = await AsyncStorage.getItem("token");
  const instance = axios.create({
    baseURL: uri,
    timeout: 10000,
    headers: {
      Authorization: `JWT ${token}`,
    },
  });
  return instance;
};

export default getInstance;
