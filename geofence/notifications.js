import { Notifications } from "expo";
import * as Permissions from "expo-permissions";

export const zoneNotification = async title => {
  const ID = await Notifications.presentLocalNotificationAsync({
    title,
    android: {
      channelId: "zoneChannel"
    }
  });
  return ID;
};

export const initNotifications = async () => {
  const status = Permissions.askAsync(Permissions.NOTIFICATIONS);
  if (status) {
    Notifications.dismissAllNotificationsAsync();
    Notifications.createChannelAndroidAsync("zoneChannel", {
      name: "SUPLA-GEO zoneChannel",
      sound: true,
      vibrate: [0, 250, 250, 250],
      badge: true,
      priority: "max"
    });
  }
};
