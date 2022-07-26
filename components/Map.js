import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import tw from "tailwind-react-native-classnames";
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { GOOGLE_MAP_API } from "@env";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react/cjs/react.development";
import { useRef } from "react/cjs/react.development";
import {
  selectDestination,
  selectOrigin,
  setDestination,
  setOrigin,
  setTripInformation,
} from "../slices/navSlice";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faLocationCrosshairs } from "@fortawesome/free-solid-svg-icons/faLocationCrosshairs";
import getCurrentLocation from "../Utils/getCurrentLocation";
import { faCar, faMapPin } from "@fortawesome/free-solid-svg-icons";
import getDistanceAndDuration from "../Utils/getDistanceAndDuration";
import getLocationName from "../Utils/getLocationName";

const Map = () => {
  let origin = useSelector(selectOrigin);
  let destination = useSelector(selectDestination);
  const DEFAULT_PADDING = { top: 40, right: 40, bottom: 40, left: 40 };
  const dispatch = useDispatch();

  const handleChangeOrigin = (origin) => {
    const action = setOrigin({
      ...origin,
    });
    dispatch(action);
  };
  const handleChangeDestination = (destination) => {
    const action = setDestination({
      ...destination,
    });
    dispatch(action);
  };

  const handleDragEndOrigin = async (e) => {
    const coordinate = e.nativeEvent.coordinate;
    let originAddress = await getLocationName(coordinate);

    handleChangeOrigin({
      description: originAddress,
      lat: coordinate.latitude,
      lng: coordinate.longitude,
    });
  };
  const handleDragEndDestination = async (e) => {
    const coordinate = e.nativeEvent.coordinate;
    let destinationAddress = await getLocationName(coordinate);

    handleChangeDestination({
      description: destinationAddress,
      lat: coordinate.latitude,
      lng: coordinate.longitude,
    });
  };

  useEffect(() => {
    if (origin && destination) {
      mapRef.current.fitToCoordinates(
        [
          { latitude: origin.lat, longitude: origin.lng },
          { latitude: destination.lat, longitude: destination.lng },
        ],
        {
          edgePadding: DEFAULT_PADDING,
          animated: true,
        }
      );

      const getTralvelInfo = async () => {
        let summary = await getDistanceAndDuration(origin, destination);
        const action = setTripInformation({
          distance: `${(summary.length / 1000).toFixed(2)} km`,
          duration: `${(summary.duration / 60).toFixed(2)} minutes`,
        });
        dispatch(action);
      };

      getTralvelInfo();
    }
  }, [origin, destination]);

  const mapRef = useRef();
  return (
    <>
      <MapView
        style={tw`h-full`}
        initialRegion={{
          latitude: origin.lat,
          longitude: origin.lng,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
          zoom: 3,
        }}
        ref={mapRef}
        showsUserLocation={true}
        // onPress={(point) => {
        //   const coordinate = point.nativeEvent.coordinate;
        //   mapRef.current.addressForCoordinate(coordinate).then((address) => {
        //     const location = `${address.subThoroughfare} ${address.thoroughfare}, ${address.subAdministrativeArea}, ${address.administrativeArea}`;
        //     const action = setDestination({
        //       lat: coordinate.latitude,
        //       lng: coordinate.longitude,
        //       description: location,
        //     });

        //     autocompleteInput?.current.setInputText(location);

        //     dispatch(action);
        //   });
        // }}
      >
        {origin && (
          <Marker
            name={"origin"}
            coordinate={{ latitude: origin.lat, longitude: origin.lng }}
            description={origin.description}
            draggable
            onDragEnd={handleDragEndOrigin}
          >
            <FontAwesomeIcon icon={faCar} color="blue" />
          </Marker>
        )}

        {destination && (
          <Marker
            name={"destination"}
            coordinate={{
              latitude: destination.lat,
              longitude: destination.lng,
            }}
            description={destination.description}
            draggable
            onDragEnd={handleDragEndDestination}
          ></Marker>
        )}

        {origin && destination && (
          <MapViewDirections
            origin={{
              latitude: origin.lat,
              longitude: origin.lng,
            }}
            destination={{
              latitude: destination.lat,
              longitude: destination.lng,
            }}
            apikey={GOOGLE_MAP_API}
            strokeWidth={3}
            strokeColor="red"
          />
        )}
      </MapView>

      <TouchableOpacity
        style={tw`absolute p-2 bg-white rounded-full opacity-90 right-5 bottom-5`}
        onPress={async () => {
          let currentPosition = await getCurrentLocation();

          mapRef.current.animateToRegion({
            latitude: currentPosition.coords.latitude,
            longitude: currentPosition.coords.longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          });
        }}
      >
        <FontAwesomeIcon icon={faLocationCrosshairs} size={25} color="gray" />
      </TouchableOpacity>
    </>
  );
};

export default Map;

const styles = StyleSheet.create({});
