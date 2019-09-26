import React from "react";
import { Switch, View, Text, StyleSheet } from "react-native";
import * as TaskManager from "expo-task-manager";

import setLocationUpdates from "../geofence/startStopLocation";

export default class LocationSwitch extends React.Component {
  state = {
    switch: false
  };
  async componentDidMount() {
    const status = await TaskManager.isTaskRegisteredAsync("SUPLAGEOLOCATION");
    await this.setState({ switch: status ? true : false });
    setLocationUpdates(this.state.switch);
  }
  switchChange = async e => {
    await this.setState({ switch: e });
    setLocationUpdates(this.state.switch);
  };
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.onoff}>On/Off</Text>
        <Switch
          onValueChange={e => this.switchChange(e)}
          value={this.state.switch}
          trackColor={{ false: "#b71c1c", true: "#1b5e20" }}
          thumbColor="#ffffff"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  onoff: {
    color: "#e0e0e0",
    marginRight: 5
  }
});
