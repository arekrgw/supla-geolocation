import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import * as TaskManager from "expo-task-manager";

const startStopLocation = async option => {
  if (option) {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status === "granted") {
      await Location.startLocationUpdatesAsync("SUPLAGEOLOCATION", {
        accuracy: Location.Accuracy.Highest,
        timeInterval: 2000,
        foregroundService: {
          notificationTitle: "SUPLA GEOLOCATION",
          notificationBody: "Śledzenie twojej lokalizacji jest włączone",
          notificationColor: "#388e3c"
        }
      });
    }
  } else {
    const registerStatus = await TaskManager.isTaskRegisteredAsync(
      "SUPLAGEOLOCATION"
    );
    if (registerStatus) Location.stopLocationUpdatesAsync("SUPLAGEOLOCATION");
  }
};

export default startStopLocation;
