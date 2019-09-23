import React from "react";
import { View, Text, Picker, StyleSheet, TextInput } from "react-native";

const ChannelInputs = props => {
  return (
    <View>
      <View
        style={{ flex: 1, borderBottomColor: "black", borderBottomWidth: 2 }}
      >
        <Picker
          selectedValue={props.channel.channelType}
          onValueChange={val => props.changeChannelType(props.index, val)}
        >
          <Picker.Item label="Wybierz" value="" />
          <Picker.Item label="GATE" value="gate" />
          <Picker.Item label="SWITCH" value="switch" />
        </Picker>
      </View>
      {Object.keys(props.channel).map(key => {
        return (
          key !== "channelType" && (
            <View style={styles.inpContainer} key={`${props.index}+${key}`}>
              <Text style={styles.inpText}>{`${key}:`}</Text>
              <TextInput
                value={props.channel[key]}
                onChangeText={text =>
                  props.handleInputsData(text, key, props.index)
                }
                style={styles.input}
              />
            </View>
          )
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderBottomWidth: 2,
    borderBottomColor: "#263238",
    paddingVertical: 5,
    fontSize: 20,
    marginBottom: 10
  },
  radiusContainer: {
    flexDirection: "row",
    alignItems: "baseline"
  },
  radius: {
    flex: 1
  },
  inpText: {
    fontSize: 12,
    marginBottom: 3
  }
});
export default ChannelInputs;
