import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";

import FloatingAddButton from "../components/FloatingAddButton";

class Home extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text> Home </Text>
        <FloatingAddButton />
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
