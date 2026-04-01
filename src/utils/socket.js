import { io } from "socket.io-client";

export const socket = io("http://localhost:3000", {
  // TO DO
  transports: ["websocket"],
});
