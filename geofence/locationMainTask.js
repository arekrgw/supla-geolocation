import * as TaskManager from "expo-task-manager";
import { AsyncStorage } from "react-native";
import _ from "lodash";
import { getDistance } from "geolib";
export default () => {
  let lastPosition = false;
  let minimalSpeed = 5;

  TaskManager.defineTask("SUPLAGEOLOCATION", async ({ data }) => {
    console.log("GEO");
    // const { coords } = data.locations[0];
    // if (!lastPosition) lastPosition = coords;
    // const areas = await AsyncStorage.getItem("AREAS");
    // // GEO ITERATE
    // _.mapKeys(JSON.parse(areas), async key => {
    //   if (key.active) {
    //     console.log("active");
    //     const distanceCenter = getDistance(
    //       { longitude: key.longitude, latitude: key.latitude },
    //       { latitude: coords.latitude, longitude: coords.longitude },
    //       0.1
    //     );

    //     if (key.deadRadius < distanceCenter) {
    //       console.log("NOT IN DEAD");
    //       const lastDistanceCenter = getDistance(
    //         { longitude: key.longitude, latitude: key.latitude },
    //         {
    //           latitude: lastPosition.latitude,
    //           longitude: lastPosition.longitude
    //         },
    //         0.1
    //       );

    //       if (distanceCenter <= key.radius ) {
    //         console.log("OPEN THE GATES");

    //         fetch(key.linkIn, { method: "GET" });
    //       } else if (distanceCenter > key.radius) {
    //         fetch(key.linkOut, { method: "GET" });

    //         console.log("CLOSE GATES");
    //       }
    //     }
    //   }
    // });
    // // ------------------------- !GEO ITERATE
    // lastPosition = coords;
  });
};
