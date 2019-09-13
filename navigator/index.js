import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import Home from "../screens/Home";

const MainStack = createStackNavigator(
  {
    Home: Home
  },
  {
    defaultNavigationOptions: {
      headerTitle: "Supla Geolocation",
      headerStyle: {
        backgroundColor: "#388e3c"
      },
      headerTitleStyle: {
        fontWeight: "bold",
        color: "#ffffff"
      }
    }
  }
);

export default createAppContainer(MainStack);
