import * as Notifications from "expo-notifications";

async function pushLocalNotification(title, body, data) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: title,
      body: body,
      data: data,
    },
    trigger: null,
  });
}

export default pushLocalNotification;
