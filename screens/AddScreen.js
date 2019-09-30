import React, { Component } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  AsyncStorage,
  Button,
  KeyboardAvoidingView
} from "react-native";
import { ScreenOrientation } from "expo";
import shortid from "shortid";
import Toast from "react-native-root-toast";

import LinkInput from "../components/LinkInput";
import MapArea from "../components/MapArea";
import ChannelInputs from "../components/ChannelInputs";
import { Header } from "react-navigation-stack";

export default class AddScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      area: props.navigation.getParam("area", false)
        ? { ...props.navigation.state.params.area }
        : {
            id: null,
            title: "",
            latitude: "",
            longitude: "",
            deadRadius: 0,
            outerRadius: 0,
            radius: 0,
            channels: [],
            active: false
          },
      orientHorizontal: false
    };
  }

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

  handleInputsData = (text, key, channelIndex, channel = false) => {
    if (key === "coords") {
      this.setState({
        area: {
          ...this.state.area,
          latitude: text.latitude,
          longitude: text.longitude
        }
      });
    } else if (channel) {
      let area = this.state.area;
      let channel = area.channels[channelIndex];
      channel[key] = text;
      area.channels[channelIndex] = channel;
      this.setState({
        area
      });
    } else this.setState({ area: { ...this.state.area, [key]: text } });
  };
  addChannel = () => {
    let area = this.state.area;
    area.channels.push({
      channelType: ""
    });
    this.setState({ area });
  };
  removeChannel = index => {
    let area = this.state.area;
    area.channels.splice(index, 1);
    this.setState({ area });
  };
  saveArea = async () => {
    if (
      this.state.area.latitude &&
      this.state.area.radius &&
      this.state.area.deadRadius &&
      this.state.area.title &&
      this.state.area.channels[0].channelType !== ""
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
        this.props.navigation.navigate("Home");
        this.props.navigation.getParam("update")();
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
  changeChannelType = (index, val) => {
    let area = this.state.area;
    if (val === "gate") {
      area.channels[index] = { channelType: val, toggle: "" };
      this.setState({ area });
    } else if (val === "switch") {
      area.channels[index] = { channelType: val, on: "", off: "" };
      this.setState({ area });
    } else if (val === "fracz") {
      area.channels[index] = { channelType: val, on: "", off: "" };
      this.setState({ area });
    }
  };
  renderChannels = () => {
    return this.state.area.channels.map((value, index) => (
      <ChannelInputs
        handleInputsData={this.handleInputsData}
        channel={value}
        key={index}
        removeChannel={this.removeChannel}
        separator={this.state.area.channels.length > 1 ? true : false}
        lastIndex={this.state.area.channels.length - 1}
        index={index}
        changeChannelType={this.changeChannelType}
      />
    ));
  };
  render() {
    return (
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior="padding"
        keyboardVerticalOffset={Header.HEIGHT + 50}
      >
        <ScrollView
          contentContainerStyle={{
            flexDirection: this.state.orientHorizontal ? "row" : "column"
          }}
        >
          <View
            style={[
              {
                flex: 1,
                position: "relative"
              },
              !this.state.orientHorizontal && { height: 400 }
            ]}
          >
            <MapArea
              tapHandler={this.handleInputsData}
              position={this.state.position}
              dataArea={this.state.area}
            />
          </View>
          <View
            style={{
              flex: 1
            }}
          >
            <View
              style={[
                styles.container,
                {
                  borderBottomColor: "#eeeeee",
                  marginBottom: 15,
                  borderBottomWidth: 1
                }
              ]}
            >
              <LinkInput
                inputData={this.state.area}
                handleInputsData={this.handleInputsData}
              />
            </View>
            <View style={{ flex: 1, paddingHorizontal: 15 }}>
              {this.renderChannels()}
            </View>
            <View
              style={[
                {
                  flexDirection: this.state.orientHorizontal ? "column" : "row",
                  flex: 1,
                  paddingBottom: 30
                },
                styles.container
              ]}
            >
              {this.state.area.channels.length > 0 && (
                <View
                  style={{
                    flex: 1,
                    marginRight: this.state.orientHorizontal ? 0 : 5,
                    marginBottom: this.state.orientHorizontal ? 5 : 0
                  }}
                >
                  <Button
                    onPress={this.saveArea}
                    color="#263238"
                    title="Zapisz strefę"
                  />
                </View>
              )}
              <View
                style={{
                  flex: 1,
                  marginLeft:
                    this.state.area.channels.length > 0
                      ? this.state.orientHorizontal
                        ? 0
                        : 5
                      : 0
                  // paddingBottom: this.state.orientHorizontal ? 100 : 0
                }}
              >
                <Button
                  onPress={this.addChannel}
                  color="#424242"
                  title="Dodaj Kanał"
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15
  }
});
