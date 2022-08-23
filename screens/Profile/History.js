import {
  faArrowLeft,
  faArrowUp,
  faCalendarAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { Divider } from "@rneui/base";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Collapsible from "react-native-collapsible";
import { useDispatch } from "react-redux";
import tw from "tailwind-react-native-classnames";
import CustomCalendar from "../../components/Calendar";
import SafeAreaViewAdroid from "../../components/SafeAreaView";
import TripItem from "../../components/TripItem";
import { reset } from "../../slices/navSlice";
import getListTrips from "../../Utils/trip/getListTrips";
const HistoryScreen = () => {
  const navigator = useNavigation();
  const [selected, setSelected] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const dispatch = useDispatch();

  //get trip history
  const [historyTrips, setHistoryTrips] = useState([]);

  const [pingMore, setPingMore] = useState(true);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const asyncFunc = async () => {
      setLoading(true);
      const data = await getListTrips(10, historyTrips.length);
      setLoading(false);

      if (data.status === 403) {
        Alert.alert("Error", data.data.message);
        AsyncStorage.removeItem("token");
        dispatch(reset());
      } else {
        setHistoryTrips((prevState) => [...prevState, ...data.results]);
      }
    };

    asyncFunc();
  }, [pingMore]);

  const [collapsedCalendar, setCollapsedCalendar] = useState(true);

  return (
    <SafeAreaViewAdroid>
      <View style={tw`h-full p-5 bg-white`}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View style={tw`flex-row items-center`}>
            <TouchableOpacity
              onPress={() => {
                navigator.goBack();
              }}
            >
              <FontAwesomeIcon icon={faArrowLeft} size={20} />
            </TouchableOpacity>
            <Text style={tw`text-xl font-bold ml-5`}>History</Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              setCollapsedCalendar(false);
            }}
          >
            <FontAwesomeIcon icon={faCalendarAlt} size={20} />
          </TouchableOpacity>
        </View>

        <Collapsible collapsed={collapsedCalendar}>
          <CustomCalendar
            selected={selected}
            onDayPress={(date) => {
              setSelected(date.dateString);
            }}
          />
          <TouchableOpacity
            style={{
              position: "absolute",
              bottom: 3,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              left: "46%",
              backgroundColor: "gray",
              paddingHorizontal: 10,
              borderRadius: 10,
            }}
            onPress={() => {
              setCollapsedCalendar(true);
            }}
          >
            <FontAwesomeIcon icon={faArrowUp} color={"white"} />
          </TouchableOpacity>
        </Collapsible>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginVertical: 10,
          }}
        >
          <Text style={tw`text-xl font-bold`}>{selected}</Text>
        </View>
        <ScrollView>
          {historyTrips.map((item, i) => (
            <TripItem
              key={i}
              customerName={item.rider_name}
              originName={item["pick_up_address_line"]}
              destinationName={item["drop_off_address_line"]}
              price={item.cash}
            />
          ))}

          {loading && <ActivityIndicator />}
        </ScrollView>
      </View>
    </SafeAreaViewAdroid>
  );
};

export default HistoryScreen;

const styles = StyleSheet.create({});
