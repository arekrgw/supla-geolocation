import React from "react";
import Navigator from "./navigator";

import locationMainTask from "./geofence/locationMainTask";
import { initNotifications } from "./geofence/notifications";

export default function App() {
  return <Navigator />;
}
initNotifications();
locationMainTask();
