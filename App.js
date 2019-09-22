import React from "react";
import Navigator from "./navigator";

import locationTask from "./geofence/locationTask";

export default function App() {
  return <Navigator />;
}

locationTask();
