import React, { Component } from "react";
import MapView, { Marker, Circle } from "react-native-maps";
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
    console.log(this.props.dataArea);
    return (
      <MapView
        ref={component => (this._map = component)}
        style={{ flex: 1, height: 400 }}
        initialRegion={this.props.position}
        mapType="hybrid"
        onPress={ev =>
          this.props.tapHandler(ev.nativeEvent.coordinate, "coords")
        }
      >
        {this.props.dataArea.longitude ? (
          <Marker
            draggable
            coordinate={{
              longitude: this.props.dataArea.longitude,
              latitude: this.props.dataArea.latitude
            }}
            onDrag={ev =>
              this.props.tapHandler(ev.nativeEvent.coordinate, "coords")
            }
          />
        ) : null}
        {this.props.dataArea.radius && this.props.dataArea.longitude ? (
          <Circle
            center={{
              longitude: this.props.dataArea.longitude,
              latitude: this.props.dataArea.latitude
            }}
            radius={parseInt(this.props.dataArea.radius)}
            strokeColor="#00ff00"
            fillColor="rgba(0,255,0,0.5)"
            zIndex={1}
          />
        ) : null}
        {this.props.dataArea.deadRadius && this.props.dataArea.longitude ? (
          <Circle
            center={{
              longitude: this.props.dataArea.longitude,
              latitude: this.props.dataArea.latitude
            }}
            radius={parseInt(this.props.dataArea.deadRadius)}
            strokeColor="#ff0000"
            fillColor="rgba(255,0,0,0.5)"
            zIndex={2}
          />
        ) : null}
      </MapView>
    );
  }
}
