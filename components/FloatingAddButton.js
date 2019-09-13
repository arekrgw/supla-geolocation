import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

class FloatingAddButton extends Component {
  render() {
    return (
      <View onPress={() => this.props.handlePress()} style={styles.container}>
        <Ionicons style={styles.icon} name="md-add" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    width: 60,
    height: 60,
    backgroundColor: "#01579b",
    position: "absolute",
    bottom: 25,
    right: 25,
    elevation: 5
  },
  icon: {
    color: "#ffffff",
    fontSize: 32
  }
});

export default FloatingAddButton;
