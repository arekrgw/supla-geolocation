import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import Home from "../screens/Home";
import React from "react";
import LocationSwitch from "../components/LocationSwitch";

const MainStack = createStackNavigator(
  {
    Home: Home
  },
  {
    defaultNavigationOptions: {
      headerTitle: "Supla Geolocation",
      headerStyle: {
        backgroundColor: "#388e3c",
        elevation: 5
      },
      headerTitleStyle: {
        fontWeight: "bold",
        color: "#ffffff"
      },
      headerRight: <LocationSwitch />
    }
  }
);

export default createAppContainer(MainStack);
