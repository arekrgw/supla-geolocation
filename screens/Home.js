import React, { Component } from "react";
import {
  Text,
  ScrollView,
  View,
  StyleSheet,
  StatusBar,
  AsyncStorage
} from "react-native";
import Menu, { MenuItem, MenuDivider } from "react-native-material-menu";
import { FontAwesome, Entypo } from "@expo/vector-icons";

import FloatingAddButton from "../components/FloatingAddButton";

class Home extends Component {
  state = {
    areas: {}
  };
  getAreas = async () => {
    const areas = await AsyncStorage.getItem("AREAS");
    this.setState({ areas: JSON.parse(areas) });
  };
  removeAreas = async () => {
    AsyncStorage.removeItem("AREAS");
  };
  componentDidMount() {
    this.getAreas();
    // this.removeAreas();
  }
  componentDidUpdate() {
    this.getAreas();
  }
  editClick = id => {
    this[id].hide();
  };
  deleteClick = id => {
    this[id].hide();
  };
  renderAreas = () => {
    if (this.state.areas) {
      return Object.keys(this.state.areas).map(index => {
        return (
          <View
            key={index}
            style={[
              styles.areasContainer,
              {
                backgroundColor: this.state.areas[index].active
                  ? "#8bc34a"
                  : "#eeeeee"
              }
            ]}
          >
            <View style={styles.areasDetails}>
              <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                {this.state.areas[index].title}
              </Text>
              <Text style={{ fontSize: 11 }}>
                Promień: {this.state.areas[index].radius}m; Martwe pole:{" "}
                {this.state.areas[index].deadRadius}m
              </Text>
            </View>
            <View style={styles.areasActionButtons}>
              <FontAwesome
                style={{ color: "#01579b", fontSize: 35, marginRight: 15 }}
                name="power-off"
              />
              <Menu
                ref={ref => (this[this.state.areas[index].id] = ref)}
                button={
                  <Entypo
                    onPress={() => this[this.state.areas[index].id].show()}
                    style={{ fontSize: 25, color: "#bdbdbd" }}
                    name="dots-three-vertical"
                  />
                }
              >
                <MenuItem
                  onPress={() => this.editClick(this.state.areas[index].id)}
                >
                  <Text>Edytuj</Text>
                </MenuItem>
                <MenuDivider />
                <MenuItem
                  onPress={() => this.deleteClick(this.state.areas[index].id)}
                >
                  <Text style={{ color: "#d50000" }}>Usuń</Text>
                </MenuItem>
              </Menu>
            </View>
          </View>
        );
      });
    } else return <Text>Pusto tu coś</Text>;
  };
  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#2e7d32" />
        <ScrollView>{this.renderAreas()}</ScrollView>
        <FloatingAddButton
          handlePress={() => this.props.navigation.navigate("Add")}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  areasActionButtons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  areasContainer: {
    flexDirection: "row",
    flex: 1,
    padding: 15,
    margin: 5,
    borderRadius: 5
  },
  areasDetails: {
    flex: 4,
    color: "white"
  }
});

export default Home;
