import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Button, Card, Divider, Icon } from "@rneui/themed";
import tw from "tailwind-react-native-classnames";
import { useSelector } from "react-redux";
import { selectTravelTimeInfromation } from "../../slices/navSlice";
import { faCircleQuestion } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation } from "@react-navigation/native";
import SafeAreaViewAdroid from "../../components/SafeAreaView";

const ProcessingScreen = () => {
  const navigator = useNavigation();
  const tripInfo = useSelector(selectTravelTimeInfromation);
  return (
    <SafeAreaViewAdroid>
      <View style={tw`h-full bg-white`}>
        <View style={tw`h-2/5`}>
          <Card>
            <Card.Title style={tw`text-lg`}>TRIP INFORMATION</Card.Title>
            <Card.Divider />
            <View style={tw`h-full`}>
              <Image
                style={tw`h-1/3 w-full`}
                source={{
                  uri: "https://www.pngall.com/wp-content/uploads/5/Vehicle-Red-Car.png",
                }}
              />
              <View style={tw`flex-row px-10 items-center`}>
                <Text style={tw`text-lg font-bold`}>DISTANCE: </Text>
                <Text style={tw`text-sm font-medium ml-10`}>
                  {tripInfo.distance}
                </Text>
              </View>
              <View style={tw`flex-row px-10 items-center`}>
                <Text style={tw`text-lg font-bold`}>DURATION: </Text>
                <Text style={tw`text-sm font-medium ml-10`}>
                  {tripInfo.duration} km/h
                </Text>
              </View>
              <View style={tw`flex-row px-10 items-center`}>
                <Text style={tw`text-lg font-bold`}>PRICE: </Text>
                <Text style={tw`text-sm font-medium ml-10`}>
                  {tripInfo.tripDetails.price} VND
                </Text>
              </View>
            </View>
          </Card>
        </View>
        <View style={tw`h-2/5 mt-2`}>
          <Card>
            <Card.Title style={tw`text-lg`}>DRIVER INFORMATION</Card.Title>
            <Card.Divider />

            <View style={tw`h-2/3 flex-row`}>
              <Image
                style={tw`h-full w-1/3`}
                source={{
                  uri: "https://w7.pngwing.com/pngs/798/518/png-transparent-computer-icons-social-media-user-driving-taxi-driver-face-hand-boy.png",
                }}
              />
              <View>
                <View style={tw`flex-row px-5 items-center`}>
                  <Text style={tw`text-lg font-bold`}>NAME: </Text>
                  <Text style={tw`text-sm font-medium ml-2`}>Vo Dinh Phuc</Text>
                </View>
                <View style={tw`flex-row px-5 items-center`}>
                  <Text style={tw`text-lg font-bold`}>PHONE: </Text>
                  <Text style={tw`text-sm font-medium ml-2`}>0123456</Text>
                </View>
                <View style={tw`flex-row px-5 items-center`}>
                  <Text style={tw`text-lg font-bold`}>PLATE: </Text>
                  <Text style={tw`text-sm font-medium ml-2`}>76C-12345</Text>
                </View>
              </View>
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
              navigator.navigate("RatingScreen");
            }}
          >
            Help
            <FontAwesomeIcon
              icon={faCircleQuestion}
              style={tw`ml-2`}
              color="white"
            />
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
            onPress={() => {
              navigator.navigate("MapScreen");
            }}
          >
            Back
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
          >
            Cancle
          </Button>
        </View>
      </View>
    </SafeAreaViewAdroid>
  );
};

export default ProcessingScreen;

const styles = StyleSheet.create({});
