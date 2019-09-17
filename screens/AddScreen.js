import React, { Component } from "react";
import { View, StyleSheet, ScrollView, AsyncStorage } from "react-native";
import { ScreenOrientation } from "expo";
import shortid from "shortid";
import Toast from "react-native-root-toast";

import LinkInput from "../components/LinkInput";
import MapArea from "../components/MapArea";

export default class AddScreen extends Component {
  state = {
    area: {
      id: null,
      title: "",
      latitude: 0,
      longitude: 0,
      deadRadius: 0,
      radius: 0,
      linkIn: "",
      linkOut: "",
      active: false
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
      headerTitle: "Dodaj strefę",
      headerRight: false
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

  saveArea = async () => {
    if (
      this.state.area.latitude &&
      this.state.area.radius &&
      this.state.area.deadRadius &&
      this.state.area.title
    ) {
      try {
        let areas = await AsyncStorage.getItem("AREAS");
        areas = JSON.parse(areas);
        if (!this.state.area.id) {
          await this.setState({
            area: { ...this.state.area, id: shortid.generate() }
          });
        }
        if (areas) {
          const newArea = {
            ...areas,
            [this.state.area.id]: { ...this.state.area }
          };
          await AsyncStorage.setItem("AREAS", JSON.stringify(newArea));
        } else {
          const newArea = { [this.state.area.id]: { ...this.state.area } };
          await AsyncStorage.setItem("AREAS", JSON.stringify(newArea));
        }
        Toast.show("Strefa dodana!", { duration: Toast.durations.LONG });
        this.props.navigation.navigate("Home", { update: true });
      } catch (er) {
        console.log(er);
      }
    } else {
      //TOAST
      Toast.show("Uzupełnij wszystkie dane przed zapisem", {
        duration: Toast.durations.LONG
      });
    }
  };

  render() {
    return (
      <ScrollView>
        <View
          style={{
            flex: 1,
            flexDirection: this.state.orientHorizontal ? "row" : "column"
          }}
        >
          <MapArea
            height={this.state.orientHorizontal ? false : 400}
            tapHandler={this.handleInputsData}
            position={this.state.position}
            dataArea={this.state.area}
          />
          <View style={styles.container}>
            <LinkInput
              saveButton={this.saveArea}
              inputData={this.state.area}
              handleInputsData={this.handleInputsData}
            />
          </View>
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
