import * as TaskManager from "expo-task-manager";
import { AsyncStorage } from "react-native";
import _ from "lodash";
import { getDistance } from "geolib";

import gateCH from "./channels/gate";
import switchCH from "./channels/switch";
import fraczCH from "./channels/fracz";
import gateTime from "./channels/gate_time";

import { zoneNotification } from "./notifications";
import { Notifications } from "expo";

export default () => {
  let lastArea = {}; // in, out, dead
  let lastID = {};
  let timeFlag = true;
  const timeoutGate = time => {
    timeFlag = false;
    setTimeout(() => {
      timeFlag = true;
    }, time * 1000);
  };

  const dismissNotification = async areaID => {
    if (lastID[areaID]) Notifications.dismissNotificationAsync(lastID[areaID]);
  };

  TaskManager.defineTask("SUPLAGEOLOCATION", async ({ data }) => {
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
          //NOTIFICATIONS
          if (lastArea[key.id] !== "in" && inGreenZone) {
            dismissNotification(key.id);
            lastID[key.id] = await zoneNotification(
              `Jesteś w strefie: ${key.title}`
            );
            lastArea[key.id] = "in";
          } else if (
            lastArea[key.id] !== "out" &&
            !inGreenZone &&
            distanceCenter < parseInt(key.radius) + 200
          ) {
            dismissNotification(key.id);
            lastID[key.id] = await zoneNotification(
              `Jesteś poza strefą: ${key.title}`
            );
            lastArea[key.id] = "out";
          }

          key.channels.map(channel => {
            if (channel.channelType === "gate") {
              gateCH(channel, inGreenZone, key.title);
            } else if (channel.channelType === "switch") {
              switchCH(channel, inGreenZone);
            } else if (channel.channelType === "fracz") {
              fraczCH(channel, inGreenZone);
            } else if (channel.channelType === "gateontime") {
              gateTime(channel, inGreenZone, timeoutGate, timeFlag);
            }
          });
        } else {
          if (lastArea[key.id] !== "dead") {
            dismissNotification(key.id);
            lastID[key.id] = await zoneNotification(
              `Jesteś w martwym polu strefy: ${key.title}`
            );
            lastArea[key.id] = "dead";
          }
        }
      }
    });
    // // ------------------------- !GEO ITERATE
    // lastPosition = coords;
  });
};
