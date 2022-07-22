import { useNavigation } from "@react-navigation/native";

const navigate = (screen) => {
  const navigator = useNavigation();
  navigator.navigate(screen);
};

export default navigate;
