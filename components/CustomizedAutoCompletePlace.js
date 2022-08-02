import React, { forwardRef, memo, useCallback, useState } from "react";
import { Dimensions, Text, View, Platform } from "react-native";
import { AutocompleteDropdown } from "react-native-autocomplete-dropdown";

import Feather from "react-native-vector-icons/Feather";
import { getAddressFromLocationId } from "../Utils/getAddressFromLocationId";
import { getPlaceSuggests } from "../Utils/getPlaceSuggestions";
Feather.loadFont();

export const CustomizedAutoCompletePlace = memo(
  forwardRef(({ handleLocationChange, placeholder, ...rest }, ref) => {
    const [loading, setLoading] = useState(false);
    const [suggestionsList, setSuggestionsList] = useState(null);

    const getSuggestions = useCallback(async (q) => {
      setLoading(true);
      const data = await getPlaceSuggests(q);

      let suggestions = [];
      data?.suggestions?.forEach((suggestion) => {
        suggestions.push({
          id: suggestion.locationId,
          title: `${
            suggestion.address.houseNumber
              ? suggestion.address.houseNumber + " "
              : ""
          }${
            suggestion.address.street ? suggestion.address.street + ", " : ""
          }${
            suggestion.address.district
              ? suggestion.address.district + ", "
              : ""
          }${
            suggestion.address.county ? suggestion.address.county + ", " : ""
          }${suggestion.address.country}`,
          locationId: suggestion.locationId,
        });
      });
      setSuggestionsList(suggestions);
      setLoading(false);
    }, []);

    const onClearPress = useCallback(() => {
      setSuggestionsList(null);
    }, []);

    return (
      <View
        style={[
          {
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
          },
          Platform.select({ ios: { zIndex: 1 } }),
        ]}
      >
        <AutocompleteDropdown
          controller={(controller) => {
            if (ref) {
              ref.current = controller;
            }
          }}
          direction={Platform.select({ ios: "down" })}
          dataSet={suggestionsList}
          onChangeText={getSuggestions}
          onSelectItem={(item) => {
            const asyncFunc = async (item) => {
              let details = await getAddressFromLocationId(item.locationId);
              handleLocationChange({
                description: item.title,
                lat: details.latitude,
                lng: details.longitude,
              });
            };
            item && asyncFunc(item);
          }}
          debounce={600}
          suggestionsListMaxHeight={Dimensions.get("window").height * 0.4}
          onClear={onClearPress}
          loading={loading}
          textInputProps={{
            placeholder: "Choose origin location ...",
            autoCorrect: false,
            style: {
              borderRadius: 25,
              color: "#383b42",
              paddingLeft: 18,
              fontSize: 12,
            },
            placeholder: placeholder,
          }}
          inputContainerStyle={{
            backgroundColor: "#fff",
            borderRadius: 25,
            borderWidth: 1,
            borderColor: "lightgray",
          }}
          containerStyle={{ flexGrow: 1, flexShrink: 1 }}
          renderItem={(item, text) => {
            return (
              <Text style={{ padding: 15, fontSize: 12 }} key={item.locationId}>
                {item.title}
              </Text>
            );
          }}
          ChevronIconComponent={<Feather name="chevron-down" size={20} />}
          ClearIconComponent={<Feather name="x-circle" size={18} />}
          inputHeight={40}
          showChevron={false}
          closeOnBlur={true}
          clearOnFocus={false}
          {...rest}
        />
      </View>
    );
  })
);
