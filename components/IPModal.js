import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button, Divider, Text } from "@rneui/base";
import { Input } from "@rneui/themed";
import { useState } from "react";
import { ActivityIndicator, View } from "react-native";
import Modal from "react-native-modal";
import { useDispatch, useSelector } from "react-redux";
import { selectIP, setIP } from "../slices/navSlice";
const IPModal = ({ visible, setVisibleNetworkModal }) => {
  const IP = useSelector(selectIP);
  const [value, setValue] = useState(IP || "");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  return (
    <Modal
      isVisible={visible}
      style={{
        position: "relative",
        padding: 10,
      }}
      animationIn="zoomIn"
      animationOut="zoomOut"
    >
      <View
        style={{ backgroundColor: "lightgray", borderRadius: 5, padding: 10 }}
      >
        <Text style={{ fontSize: 16, fontWeight: "bold", textAlign: "center" }}>
          Enter your hosted server IP to connect
        </Text>

        <Divider width={1.5} style={{ marginVertical: 10 }} />

        <Input
          onChangeText={(value) => {
            setValue(value);
          }}
          value={value}
          placeholder="Enter your IP"
          style={{ fontSize: 16 }}
        />

        <Button
          title="Confirm"
          disabled={loading || value.length === 0}
          onPress={async () => {
            setLoading(true);
            await AsyncStorage.setItem("IP", value);
            setLoading(false);
            dispatch(setIP(value));
            setVisibleNetworkModal(false);
          }}
        >
          {loading ? <ActivityIndicator /> : "Confirm"}
        </Button>
      </View>
    </Modal>
  );
};

export default IPModal;
