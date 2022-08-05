import React from "react";
import { io } from "socket.io-client";

export const socket = io("ws://swa-socket.herokuapp.com");
export const SocketContext = React.createContext();
