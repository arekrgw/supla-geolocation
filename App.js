import React from "react";
import Navigator from "./navigator";

import locationMainTask from "./geofence/locationMainTask";

export default function App() {
  return <Navigator />;
}

locationMainTask();
