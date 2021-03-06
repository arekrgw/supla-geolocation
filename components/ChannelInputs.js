import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity
} from "react-native";
import { CustomPicker } from "react-native-custom-picker";
import { AntDesign } from "@expo/vector-icons";

const ChannelInputs = props => {
  const keysTranslation = {
    on: "Włączenie po wejściu w strefę",
    off: "Wyłączenie po wyjściu ze strefy",
    toggle: "Link bezpośredni bezwzględny",
    read: "Odczyt stanu kanału z cloud.supla.org",
    time: "Podaj czas jaki brama potrzebuje na otwarcie/zamknięcie (sekundy)"
  };
  const renderField = ({ selectedItem, defaultText }) => {
    return (
      <View style={styles.pickerContainer}>
        <Text style={styles.pickerContainerText}>
          {selectedItem ? selectedItem.label : defaultText}
        </Text>
      </View>
    );
  };
  const renderHeader = () => (
    <View
      style={{
        paddingVertical: 10,
        alignItems: "center",
        backgroundColor: "#eee"
      }}
    >
      <Text style={{ fontWeight: "bold", fontSize: 20 }}>
        Wybór typu kanału
      </Text>
    </View>
  );
  const renderOptions = ({ item, getLabel }) => {
    return (
      <View style={styles.pickerOptionsContainer}>
        <Text style={styles.pickerOptionsText}>{getLabel(item)}</Text>
      </View>
    );
  };
  const separator = {
    paddingBottom: 20,
    borderBottomColor: "#eeeeee",
    borderBottomWidth: 1,
    marginBottom: 20
  };
  const options = [
    { label: "GATE", value: "gate" },
    { label: "SWITCH", value: "switch" },
    { label: "GATETIME", value: "gateontime" },
    { label: "FRACZ", value: "fracz" }
  ];
  return (
    <View
      style={
        props.separator &&
        props.channel.channelType !== "" &&
        props.index !== props.lastIndex &&
        separator
      }
    >
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          marginBottom: 10,
          alignItems: "center"
        }}
      >
        <View style={{ flexGrow: 1 }}>
          <CustomPicker
            value={options.find(val => val.value === props.channel.channelType)}
            options={options}
            headerTemplate={renderHeader}
            fieldTemplate={renderField}
            optionTemplate={renderOptions}
            getLabel={selectedValue => selectedValue.label}
            placeholder="Wybierz typ kanału"
            onValueChange={val =>
              props.changeChannelType(props.index, val.value)
            }
          />
        </View>
        <View style={{ width: 40 }}>
          <TouchableOpacity
            style={{
              borderRadius: 3,
              borderColor: "#f44336",
              borderWidth: 1.5,
              paddingVertical: 5,
              marginLeft: 5
            }}
            onPress={() => {
              props.removeChannel(props.index);
            }}
          >
            <AntDesign
              name="delete"
              style={{ color: "#f44336", fontSize: 20, textAlign: "center" }}
            />
          </TouchableOpacity>
        </View>
      </View>
      {Object.keys(props.channel).map(key => {
        return (
          key !== "channelType" && (
            <View style={styles.inpContainer} key={`${props.index}+${key}`}>
              <Text style={styles.inpText}>{`${keysTranslation[key]}:`}</Text>
              <TextInput
                value={props.channel[key]}
                onChangeText={text =>
                  props.handleInputsData(text, key, props.index, true)
                }
                keyboardType={key === "time" ? "decimal-pad" : "default"}
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
  },
  pickerContainer: {
    borderBottomColor: "#263238",
    borderBottomWidth: 2,
    flex: 1,
    marginRight: 5
  },
  pickerContainerText: {
    fontSize: 20,
    paddingVertical: 5,
    textAlign: "center"
  },
  pickerOptionsContainer: {
    padding: 10,
    flex: 1,
    alignItems: "center"
  },
  pickerOptionsText: {
    fontSize: 18,
    color: "#000"
  }
});
export default ChannelInputs;
