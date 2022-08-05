import { useCallback, useContext } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import { useDispatch, useSelector } from "react-redux";
import { SocketContext } from "../context/socketContext";
import { addMessages, selectMessages } from "../slices/navSlice";

const ChatComponent = () => {
  const dispatch = useDispatch();
  const handleAddMessages = (tempMessages) => {
    const sendedMessages = [];
    tempMessages.forEach((message) => {
      sendedMessages.push({
        ...message,
        createdAt: `${message.createdAt}`,
      });
    });
    console.log(sendedMessages);
    const action = addMessages(sendedMessages);
    dispatch(action);
  };
  //get messages
  let messages = useSelector(selectMessages);
  //messages list
  const socket = useContext(SocketContext);
  //message modal
  const submitMessage = (message) => {
    socket.emit("sendMessage", { roomId: "trip", message });
  };

  const onSend = useCallback((messages = []) => {
    handleAddMessages(messages);
    const { createdAt, text } = messages[0];
    submitMessage({ createdAt, text, from: "customer" });
  }, []);

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: 1,
      }}
    />
  );
};

export default ChatComponent;
