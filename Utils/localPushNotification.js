import * as Notifications from "expo-notifications";

async function pushLocalNotification(title, body) {
  console.log("noti");
  await Notifications.scheduleNotificationAsync({
    content: {
      title: title,
      body: body,
      data: null,
      sound: true,
    },
    trigger: null,
  });
}

export default pushLocalNotification;
