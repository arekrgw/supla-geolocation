import React, { Component } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { ScreenOrientation } from "expo";

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
    area: {
      latitude: 0,
      longitude: 0,
      deadRadius: 0,
      radius: 0,
      linkIn: "",
      linkOut: ""
    },
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

  handleInputsData = (text, type) => {
    if (type === "coords") {
      this.setState({
        area: {
          ...this.state.area,
          latitude: text.latitude,
          longitude: text.longitude
        }
      });
    } else this.setState({ area: { ...this.state.area, [type]: text } });
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
          <MapArea
            tapHandler={this.handleInputsData}
            position={this.state.position}
            dataArea={this.state.area}
          />
        </View>
        <View style={styles.container}>
          <LinkInput
            inputData={this.state.area}
            handleInputsData={this.handleInputsData}
          />
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
