import React, { Component } from "react";
import {
  Text,
  ScrollView,
  View,
  StyleSheet,
  StatusBar,
  AsyncStorage,
  TouchableOpacity
} from "react-native";

import FloatingAddButton from "../components/FloatingAddButton";

class Home extends Component {
  state = {
    areas: {}
  };
  getAreas = async () => {
    const areas = await AsyncStorage.getItem("AREAS");
    this.setState({ areas: JSON.parse(areas) });
  };
  componentDidMount() {
    this.getAreas();
  }
  componentDidUpdate() {
    this.getAreas();
  }
  renderAreas = () => {
    if (this.state.areas) {
      return Object.keys(this.state.areas).map(index => {
        return (
          <TouchableOpacity key={index} onPress={() => {}}>
            <View style={{ flex: 1 }}>
              <Text>{this.state.areas[index].id}</Text>
            </View>
          </TouchableOpacity>
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
  }
});

export default Home;
