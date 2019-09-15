import React, { Component } from "react";
import { Text, View, StyleSheet, StatusBar } from "react-native";

import FloatingAddButton from "../components/FloatingAddButton";

class Home extends Component {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#2e7d32" />
        <Text onPress={() => this.props.navigation.navigate("Add")}>
          {" "}
          Home{" "}
        </Text>
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
  }
});

export default Home;
