import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation } from "@react-navigation/native";
import { Button, Card } from "@rneui/themed";
import React, { useState } from "react";
import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import tw from "tailwind-react-native-classnames";
import SafeAreaViewAdroid from "../../components/SafeAreaView";
import {
  resetTrip,
  selectDriverInfomation,
  selectTripInformation,
} from "../../slices/navSlice";
import CancleTrip from "../../Utils/trip/cancleTrip";

const ProcessingScreen = () => {
  const navigator = useNavigation();
  const tripInfo = useSelector(selectTripInformation);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  let driverInfomation = useSelector(selectDriverInfomation);
  return (
    <SafeAreaViewAdroid>
      <View style={tw`h-full bg-white`}>
        <View style={tw`h-2/5`}>
          <Card>
            <Card.Title style={tw`text-lg`}>TRIP INFORMATION</Card.Title>
            <Card.Divider />
            {tripInfo && (
              <View style={tw`h-full`}>
                <Image
                  style={tw`h-1/3 w-full`}
                  source={{
                    uri: "https://www.pngall.com/wp-content/uploads/5/Vehicle-Red-Car.png",
                  }}
                />
                <View
                  style={{
                    backgroundColor: "lightgray",
                    padding: 10,
                    display: "flex",
                    justifyContent: "center",
                    borderRadius: 10,
                    borderStyle: "dashed",
                    borderWidth: 1,
                  }}
                >
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <Text
                      style={{ flexGrow: 1, fontSize: 16, fontWeight: "600" }}
                    >
                      Distance
                    </Text>
                    <Text style={{ flexGrow: 1 }}>{tripInfo.distance}</Text>
                  </View>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <Text
                      style={{ flexGrow: 1, fontSize: 16, fontWeight: "600" }}
                    >
                      Duration
                    </Text>
                    <Text style={{ flexGrow: 1 }}>{tripInfo.duration}</Text>
                  </View>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <Text
                      style={{ flexGrow: 1, fontSize: 16, fontWeight: "600" }}
                    >
                      Price:{" "}
                    </Text>
                    <Text style={{ flexGrow: 1 }}>{tripInfo.price}</Text>
                  </View>
                </View>
              </View>
            )}
          </Card>
        </View>
        <View style={tw`h-2/5 mt-2`}>
          <Card>
            <Card.Title style={tw`text-lg`}>DRIVER INFORMATION</Card.Title>
            <Card.Divider />

            <View style={tw`h-2/3 flex-row`}>
              {!driverInfomation && (
                <View style={tw`h-full w-full justify-center items-center `}>
                  <ActivityIndicator size="large" />
                </View>
              )}
              {driverInfomation && (
                <>
                  <Image
                    style={tw`h-full w-1/3`}
                    source={{
                      uri: "https://w7.pngwing.com/pngs/798/518/png-transparent-computer-icons-social-media-user-driving-taxi-driver-face-hand-boy.png",
                    }}
                  />
                  <View>
                    <View style={tw`flex-row px-5 items-center`}>
                      <Text style={tw`text-lg font-bold`}>NAME: </Text>
                      <Text style={tw`text-sm font-medium ml-2`}>
                        {driverInfomation.name}
                      </Text>
                    </View>
                    <View style={tw`flex-row px-5 items-center`}>
                      <Text style={tw`text-lg font-bold`}>PHONE: </Text>
                      <Text style={tw`text-sm font-medium ml-2`}>
                        {driverInfomation.phoneNumber}
                      </Text>
                    </View>
                    <View style={tw`flex-row px-5 items-center`}>
                      <Text style={tw`text-lg font-bold`}>PLATE: </Text>
                      <Text style={tw`text-sm font-medium ml-2`}>
                        {driverInfomation.plate}
                      </Text>
                    </View>
                  </View>
                </>
              )}
            </View>
          </Card>
        </View>

        <View style={tw`h-1/5 justify-evenly px-10`}>
          <Button
            buttonStyle={{
              backgroundColor: "black",
              borderRadius: 10,
              marginLeft: 0,
              marginRight: 0,
              marginBottom: 0,
            }}
            onPress={() => {
              navigator.navigate("MapScreen");
            }}
          >
            Track Your Trip
            <FontAwesomeIcon icon={faSearch} style={tw`ml-2`} color="white" />
          </Button>
          <Button
            buttonStyle={{
              backgroundColor: "white",
              borderRadius: 10,
              borderWidth: 2,
              borderColor: "black",
              marginLeft: 0,
              marginRight: 0,
              marginBottom: 0,
            }}
            titleStyle={{
              color: "black",
            }}
            disabled={
              tripInfo?.status !== "assigned" &&
              tripInfo?.status !== "processing" &&
              tripInfo?.status !== "canceled_by_driver"
            }
            onPress={async () => {
              setLoading(true);

              const data = await CancleTrip(tripInfo.self);

              setLoading(false);
            }}
          >
            {loading ? (
              <ActivityIndicator />
            ) : (
              <Text style={{ fontSize: 16, fontWeight: "500" }}>
                Cancle Trip
              </Text>
            )}
          </Button>
        </View>
      </View>
    </SafeAreaViewAdroid>
  );
};

export default ProcessingScreen;

const styles = StyleSheet.create({});
