import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useState } from "react";
import { CheckBox, Dialog } from "@rneui/themed";
import { useDispatch } from "react-redux";
import { setTripInformation } from "../slices/navSlice";

const paymentOptions = [
  {
    id: 0,
    method: "Cash",
  },
  {
    id: 1,
    method: "Momo",
  },
  {
    id: 2,
    method: "Bank",
  },
];
const PaymentMethodOptionsDialog = ({ isVisible, setVisible }) => {
  const [checked, setChecked] = useState(0);
  const dispatch = useDispatch();
  return (
    <Dialog
      isVisible={isVisible}
      onBackdropPress={() => {
        setVisible(false);
      }}
    >
      <Dialog.Title title="Select Payment Method" />
      {paymentOptions.map((item) => (
        <CheckBox
          key={item.id}
          title={item.method}
          containerStyle={{ backgroundColor: "white", borderWidth: 0 }}
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          checked={checked === item.id}
          onPress={() => setChecked(item.id)}
        />
      ))}

      <Dialog.Actions>
        <Dialog.Button
          title="CONFIRM"
          onPress={() => {
            const paymentMethod = paymentOptions.filter(
              (item) => item.id === checked
            )[0];

            let action = setTripInformation({
              paymentMethod,
            });
            dispatch(action);

            setVisible(false);
          }}
        />
        <Dialog.Button
          title="CANCEL"
          onPress={() => {
            setVisible(false);
          }}
        />
      </Dialog.Actions>
    </Dialog>
  );
};

export default PaymentMethodOptionsDialog;

const styles = StyleSheet.create({});
