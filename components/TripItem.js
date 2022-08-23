import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Text, View } from "react-native";

const TripItem = ({ customerName, originName, destinationName, price }) => {
  return (
    <View
      style={{
        width: "100%",
        marginBottom: 5,
        borderRadius: 10,
        borderWidth: 1,
      }}
    >
      <View
        style={{
          margin: 5,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ fontSize: 11, color: "gray" }}>{customerName}</Text>
        <Text style={{ fontSize: 11, color: "gray" }}>{price}</Text>
      </View>
      <View
        style={{
          margin: 5,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <FontAwesomeIcon icon={faLocationDot} color={"darkblue"} />
        <Text style={{ fontSize: 12, marginLeft: 5 }}>{originName}</Text>
      </View>
      <View
        style={{
          margin: 5,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <FontAwesomeIcon icon={faLocationDot} color={"darkred"} />
        <Text style={{ fontSize: 12, marginLeft: 5 }}>{destinationName}</Text>
      </View>
    </View>
  );
};

export default TripItem;
