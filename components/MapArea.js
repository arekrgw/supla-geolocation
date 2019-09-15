import React, { Component } from "react";
import MapView from "react-native-maps";
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";

export default class MapArea extends Component {
  async componentDidMount() {
    const status = await Permissions.askAsync(Permissions.LOCATION);
    if (status) {
      const position = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.HIGH
      });
      this._map.animateCamera({
        center: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        },
        zoom: 15
      });
    }
  }

  render() {
    return (
      <MapView
        ref={component => (this._map = component)}
        style={{ flex: 1, height: 400 }}
        initialRegion={this.props.position}
        mapType="hybrid"
      />
    );
  }
}
