import axios from "axios";

const pushNotification = async (token, title, content, data) => {
  const message = {
    to: token,
    sound: "default",
    title: title,
    body: content,
    data: { ...data },
  };

  await axios.post(
    "https://exp.host/--/api/v2/push/send",
    {
      ...message,
    },
    {
      headers: {
        Accept: "application/json",
        "Accept-encoding": "gzip, deflate",
        "Content-Type": "application/json",
      },
    }
  );
};

export default pushNotification;
