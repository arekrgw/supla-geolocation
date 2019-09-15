import React, { Component } from "react";
import { Dimensions, View, StyleSheet, ScrollView } from "react-native";
import { ScreenOrientation, C } from "expo";

import LinkInput from "../components/LinkInput";
import MapArea from "../components/MapArea";

export default class AddScreen extends Component {
  state = {
    position: {
      latitude: 52.04563,
      longitude: 19.395569,
      latitudeDelta: 5,
      longitudeDelta: 12.5
    },
    circle: {},
    orientHorizontal: false
  };
  async componentDidMount() {
    const orientation = await ScreenOrientation.getOrientationAsync();
    this.orientationListener(orientation);
    ScreenOrientation.addOrientationChangeListener(or =>
      this.orientationListener(or.orientationInfo)
    );
  }
  componentWillUnmount() {
    ScreenOrientation.removeOrientationChangeListeners();
  }
  orientationListener = ({ orientation }) => {
    if (orientation === "LANDSCAPE_LEFT" || orientation === "LANDSCAPE_RIGHT") {
      this.setState({ orientHorizontal: true });
    } else {
      this.setState({ orientHorizontal: false });
    }
  };

  static navigationOptions = () => {
    return {
      headerTitle: "Dodaj strefę"
    };
  };

  render() {
    return (
      <ScrollView
        contentContainerStyle={{
          flex: 1,
          flexDirection: this.state.orientHorizontal ? "row" : "column"
        }}
      >
        <View style={{ flex: 1 }}>
          <MapArea position={this.state.position} />
        </View>
        <View style={styles.container}>
          <LinkInput />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15
  }
});
