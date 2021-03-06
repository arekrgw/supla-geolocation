import React from "react";
import { View, Text, TextInput, StyleSheet, Button } from "react-native";

const LinkInput = props => {
  return (
    <View>
      <View style={styles.inpContainer}>
        <Text style={styles.inpText}>Nazwa strefy:</Text>
        <TextInput
          value={props.inputData.title}
          onChangeText={text => props.handleInputsData(text, "title")}
          style={styles.input}
        />
      </View>
      <View style={styles.radiusContainer}>
        <View style={[styles.radius, { marginRight: 5 }]}>
          <Text style={styles.inpText}>Promień strefy(m):</Text>
          <TextInput
            value={props.inputData.radius ? props.inputData.radius : ""}
            onChangeText={text => props.handleInputsData(text, "radius")}
            style={styles.input}
            keyboardType="decimal-pad"
          />
        </View>
        <View style={[styles.radius, { marginLeft: 5 }]}>
          <Text style={styles.inpText}>
            Promień martwego pola w centrum strefy(m):
          </Text>
          <TextInput
            value={props.inputData.deadRadius ? props.inputData.deadRadius : ""}
            keyboardType="decimal-pad"
            onChangeText={text => props.handleInputsData(text, "deadRadius")}
            style={styles.input}
          />
        </View>
      </View>
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
export default LinkInput;
