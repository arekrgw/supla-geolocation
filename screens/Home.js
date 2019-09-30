import React, { Component } from "react";
import {
  Text,
  ScrollView,
  View,
  StyleSheet,
  StatusBar,
  AsyncStorage
} from "react-native";
import { ScreenOrientation } from "expo";

import _ from "lodash";
import Toast from "react-native-root-toast";

import Menu, { MenuItem, MenuDivider } from "react-native-material-menu";
import { FontAwesome, Entypo } from "@expo/vector-icons";

import FloatingAddButton from "../components/FloatingAddButton";

class Home extends Component {
  state = {
    areas: {},
    orientHorizontal: false
  };
  getAreas = async () => {
    const areas = await AsyncStorage.getItem("AREAS");
    if (areas) {
      this.setState({ areas: JSON.parse(areas) });
    } else {
      this.setState({ areas: {} });
    }
  };
  removeAreas = async () => {
    AsyncStorage.removeItem("AREAS");
  };
  async componentDidMount() {
    this.getAreas();
    const orientation = await ScreenOrientation.getOrientationAsync();
    this.orientationListener(orientation);
    ScreenOrientation.addOrientationChangeListener(or =>
      this.orientationListener(or.orientationInfo)
    );
    // this.removeAreas();
  }

  orientationListener = ({ orientation }) => {
    if (orientation === "LANDSCAPE_LEFT" || orientation === "LANDSCAPE_RIGHT") {
      this.setState({ orientHorizontal: true });
    } else {
      this.setState({ orientHorizontal: false });
    }
  };

  componentWillUnmount() {
    ScreenOrientation.removeOrientationChangeListeners();
  }
  editClick = id => {
    this[id].hide();
    this.props.navigation.navigate("Add", {
      area: this.state.areas[id],
      update: this.getAreas
    });
  };
  deleteClick = async id => {
    this[id].hide();
    let areas = this.state.areas;
    const title = areas[id].title;
    areas = _.omit(areas, id);
    await AsyncStorage.setItem("AREAS", JSON.stringify(areas));
    this[id] = undefined;
    this.getAreas();
    Toast.show(`Strefa: ${title} została usunięta`, {
      duration: Toast.durations.LONG
    });
  };
  changeActivity = async index => {
    let areas = this.state.areas;
    areas[index].active = !areas[index].active;
    await AsyncStorage.setItem("AREAS", JSON.stringify(areas));
    this.getAreas();
  };
  renderAreas = () => {
    const Empty = (
      <View style={styles.emptyTextContainer}>
        <Text
          style={[
            styles.emptyText,
            {
              transform: [
                { rotate: this.state.orientHorizontal ? "0deg" : "-90deg" }
              ]
            }
          ]}
        >
          Pusto tu coś
        </Text>
      </View>
    );
    if (typeof this.state.areas === "object") {
      if (Object.keys(this.state.areas).length > 0) {
        return (
          <ScrollView>
            {Object.keys(this.state.areas).map(index => {
              return (
                <View
                  key={index}
                  style={[
                    styles.areasContainer,
                    {
                      backgroundColor: this.state.areas[index].active
                        ? "#c8e6c9"
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
                      {this.state.areas[index].deadRadius}m; Ilość kanałów:{" "}
                      {this.state.areas[index].channels.length}
                    </Text>
                  </View>
                  <View style={styles.areasActionButtons}>
                    <FontAwesome
                      onPress={() => this.changeActivity(index)}
                      style={{
                        color: "#01579b",
                        fontSize: 35,
                        marginRight: 15
                      }}
                      name="power-off"
                    />
                    <Menu
                      ref={ref => (this[index] = ref)}
                      button={
                        <Entypo
                          onPress={() =>
                            this[this.state.areas[index].id].show()
                          }
                          style={{ fontSize: 25, color: "#9e9e9e" }}
                          name="dots-three-vertical"
                        />
                      }
                    >
                      <MenuItem onPress={() => this.editClick(index)}>
                        <Text>Edytuj</Text>
                      </MenuItem>
                      <MenuDivider />
                      <MenuItem onPress={() => this.deleteClick(index)}>
                        <Text style={{ color: "#d50000" }}>Usuń</Text>
                      </MenuItem>
                    </Menu>
                  </View>
                </View>
              );
            })}
          </ScrollView>
        );
      } else return Empty;
    } else return Empty;
  };
  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#2e7d32" />
        {this.renderAreas()}
        <FloatingAddButton
          handlePress={() =>
            this.props.navigation.navigate("Add", { update: this.getAreas })
          }
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
  },
  emptyTextContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  emptyText: {
    fontWeight: "900",
    fontSize: 60,
    textAlign: "center",
    color: "#ddd"
  }
});

export default Home;
