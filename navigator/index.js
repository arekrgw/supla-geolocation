import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import Home from "../screens/Home";
import AddScreen from "../screens/AddScreen";
import React from "react";
import { Image, View, Text } from "react-native";
import LocationSwitch from "../components/LocationSwitch";

const Header = (
  <View
    style={{
      flexDirection: "row",
      flex: 1,
      marginHorizontal: 15,
      alignItems: "center"
    }}
  >
    <Image
      source={require("../assets/supla-logo.png")}
      style={{ width: 31.3, height: 35.83 }}
    />
    <Text
      style={{
        fontWeight: "bold",
        marginLeft: 10,
        fontSize: 20,
        color: "#fff"
      }}
    >
      Supla Geolocation
    </Text>
  </View>
);

const MainStack = createStackNavigator(
  {
    Home: Home,
    Add: AddScreen
  },
  {
    defaultNavigationOptions: {
      headerMode: "float",
      headerTitle: Header,
      headerStyle: {
        backgroundColor: "#388e3c",
        elevation: 5
      },
      headerTitleStyle: {
        fontWeight: "bold",
        color: "#ffffff"
      },
      headerRight: <LocationSwitch />,
      gesturesEnabled: false
    }
  }
);

export default createAppContainer(MainStack);
