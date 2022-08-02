import { faCar } from "@fortawesome/free-solid-svg-icons";
import { faLocationCrosshairs } from "@fortawesome/free-solid-svg-icons/faLocationCrosshairs";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import { useDispatch, useSelector } from "react-redux";
import tw from "tailwind-react-native-classnames";
import {
  selectDestination,
  selectOrigin,
  setDestination,
  setOrigin,
  setTripInformation
} from "../slices/navSlice";
import getCurrentLocation from "../Utils/getCurrentLocation";
import getDistanceAndDuration from "../Utils/getDistanceAndDuration";
import getGeometies from "../Utils/getGeometries";
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

  const [geometries, setGeometries] = useState([]);

  useEffect(() => {
    if (origin && destination) {
      mapRef.current.fitToSuppliedMarkers(["origin", "destination"], {
        edgePadding: DEFAULT_PADDING,
        animated: true,
      });

      const asyncFunc = async () => {
        let summary = await getDistanceAndDuration(origin, destination);
        const action = setTripInformation({
          distance: `${(summary.length / 1000).toFixed(2)} km`,
          duration: `${(summary.duration / 60).toFixed(2)} minutes`,
        });
        dispatch(action);

        let coordinates = await getGeometies(origin, destination);
        setGeometries([...coordinates]);
      };

      asyncFunc();
    }
  }, [origin, destination]);

  const onMapLoaded = () => {
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
    }
  };

  const mapRef = useRef();
  return (
    <>
      <MapView
        style={tw`h-full`}
        initialRegion={{
          latitude: 10.8091391,
          longitude: 106.7035455,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
          zoom: 3,
        }}
        ref={mapRef}
        showsUserLocation={true}
        onMapLoaded={onMapLoaded}
      >
        {origin && (
          <Marker
            name={"origin"}
            coordinate={{ latitude: origin.lat, longitude: origin.lng }}
            description={origin.description}
            draggable
            onDragEnd={handleDragEndOrigin}
            identifier="origin"
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
            identifier="destination"
          ></Marker>
        )}

        {origin && destination && (
          <Polyline
            coordinates={[...geometries]}
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
