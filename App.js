import React from "react";
import Navigator from "./navigator";
import * as TaskManager from "expo-task-manager";

export default function App() {
  return <Navigator />;
}

TaskManager.defineTask("SUPLAGEOLOCATION", ({ data }) => {
  console.log("GEO");
  const { coords } = data.locations[0];
  console.log(coords.latitude);
  console.log(coords.longitude);
});
