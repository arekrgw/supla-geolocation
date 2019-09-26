import * as TaskManager from "expo-task-manager";
import { AsyncStorage } from "react-native";
import _ from "lodash";
import { getDistance } from "geolib";

import gateCH from "./channels/gate";
// import switchCH from "./channels/switch";
import fraczCH from "./channels/fracz";

export default () => {
  TaskManager.defineTask("SUPLAGEOLOCATION", async ({ data }) => {
    console.log("GEO");
    const { coords } = data.locations[0];
    const areas = await AsyncStorage.getItem("AREAS");
    // // GEO ITERATE
    _.mapKeys(JSON.parse(areas), async key => {
      if (key.active) {
        const distanceCenter = getDistance(
          { longitude: key.longitude, latitude: key.latitude },
          { latitude: coords.latitude, longitude: coords.longitude },
          0.1
        );

        if (
          key.deadRadius < distanceCenter &&
          distanceCenter < key.radius + 200
        ) {
          const inGreenZone = distanceCenter < key.radius ? true : false;

          console.log("NOT IN DEAD");

          key.channels.map(channel => {
            if (channel.channelType === "gate") {
              gateCH(channel, inGreenZone);
            } else if (channel.channelType === "switch") {
            } else if (channel.channelType === "fracz") {
              fraczCH(channel, inGreenZone);
            }
          });
        }
      }
    });
    // // ------------------------- !GEO ITERATE
    // lastPosition = coords;
  });
};
