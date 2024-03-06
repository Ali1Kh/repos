import React from "react";
import { socket } from "./socket";
import { useEffect, useState } from "react";
export default function Notifications() {
    
  useEffect(() => {
    socket.on("helloFromNode", (data) => {
      console.log(data);
    });
  });

  return <div>Notifications</div>;
}
