import { faCar, faPerson } from "@fortawesome/free-solid-svg-icons";
import { faLocationCrosshairs } from "@fortawesome/free-solid-svg-icons/faLocationCrosshairs";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import { ActivityIndicator, StyleSheet, TouchableOpacity } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import { useDispatch, useSelector } from "react-redux";
import tw from "tailwind-react-native-classnames";
import {
  selectDestination,
  selectDriverInfomation,
  selectOrigin,
  setDestination,
  setOrigin,
  setTripInformation,
} from "../slices/navSlice";
import getCurrentLocation from "../Utils/getCurrentLocation";
import getDistanceAndDuration from "../Utils/getDistanceAndDuration";
import getGeometies from "../Utils/getGeometries";
import getLocationName from "../Utils/getLocationName";
import getTripCash from "../Utils/trip/getTripCash";

const Map = () => {
  //state
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [geometries, setGeometries] = useState([]);

  //redux
  let origin = useSelector(selectOrigin);
  let destination = useSelector(selectDestination);
  let driverInfo = useSelector(selectDriverInfomation);

  console.log(driverInfo);

  //delaretion
  const DEFAULT_PADDING = { top: 40, right: 40, bottom: 40, left: 40 };
  const dispatch = useDispatch();

  //handler
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
      mapRef.current.fitToSuppliedMarkers(["origin", "destination"], {
        edgePadding: DEFAULT_PADDING,
        animated: true,
      });

      const asyncFunc = async () => {
        let summary = await getDistanceAndDuration(origin, destination);
        let price = await getTripCash(summary.length);
        const action = setTripInformation({
          distance: `${(summary.length / 1000).toFixed(2)} km`,
          duration: `${(summary.duration / 60).toFixed(2)} minutes`,
          price: price,
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
        showsMyLocationButton={false}
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
            <FontAwesomeIcon icon={faPerson} color="green" />
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

        {driverInfo?.coordinates?.lat && driverInfo?.coordinates?.lng && (
          <Marker
            name={"driver"}
            coordinate={{
              latitude: driverInfo.coordinates.lat,
              longitude: driverInfo.coordinates.lng,
            }}
            description="driver location"
            identifier="driver"
          >
            <FontAwesomeIcon icon={faCar} color="blue" />
          </Marker>
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
          setLoadingLocation(true);
          let currentPosition = await getCurrentLocation();

          mapRef.current.animateToRegion({
            latitude: currentPosition.coords.latitude,
            longitude: currentPosition.coords.longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          });

          setLoadingLocation(false);
        }}
      >
        {loadingLocation ? (
          <ActivityIndicator />
        ) : (
          <FontAwesomeIcon icon={faLocationCrosshairs} size={25} color="gray" />
        )}
      </TouchableOpacity>
    </>
  );
};

export default Map;

const styles = StyleSheet.create({});
