import React from "react";
import { socket } from "../../../socket";
import { useEffect, useState } from "react";
import { Popper } from "@mui/base/Popper";
import { styled, css } from "@mui/system";
import Notifier from "react-desktop-notification";

export default function Notifications() {
  const [anchor, setAnchor] = React.useState(null);
  const handleClick = (event) => {
    setAnchor(anchor ? null : event.currentTarget);
  };
  const open = Boolean(anchor);
  const id = open ? "simple-popper" : undefined;

  let [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // socket.disconnect();
    // socket.connect();

    if (!("Notification" in window)) {
      console.log("Browser does not support desktop notification");
    } else {
      Notification.requestPermission();
    }

    socket.emit("updateSocketId", { token: localStorage.getItem("token") });
    socket.emit("getNotifications", { token: localStorage.getItem("token") });
    socket.on("notifications", (data) => {
      setNotifications(data);
    });
    socket.on("newNotification", (data) => {
      Notifier.start(
        "Meeting Management",
        data.message,
        "/home",
        "../../../image/Logo.png"
      );
      notifications.push(data);
      setNotifications(notifications);
    });
  }, []);

  return (
    <>
      <div>
        <Button
          aria-describedby={id}
          type="button"
          onClick={handleClick}
          className="bell-toggler position-relative"
        >
          <i className="fa-regular fa-bell"></i>
          <span
            className="position-absolute  translate-middle badge rounded-pill p-1"
            style={{
              backgroundColor: "red",
              top: "-5px",
              left: "100%",
              fontSize: "12px",
            }}
          >
            {notifications.length}
          </span>
        </Button>

        <Popper
          id={id}
          open={open}
          anchorEl={anchor}
          style={{ zIndex: 9999}}
        >
          <StyledPopperDiv
            className="overflow-y-scroll bg-white"
            style={{ maxHeight: "300px" }}
          >
            {" "}
            <ul className="list-unstyled">
              {notifications.map((notification) => {
                return (
                  <li
                    className="text-black p-2 rounded-1 text-decoration-none mb-2 py-2"
                    style={{ backgroundColor: "#f3f4f6" }}
                  >
                    {notification.message}
                    <div>
                      {new Date(notification.createdAt).toLocaleString()}
                    </div>
                  </li>
                );
              })}
            </ul>
          </StyledPopperDiv>
        </Popper>
      </div>
    </>
  );
}

const StyledPopperDiv = styled("div")(
  ({ theme }) => css`
    background-color: var(--main-color);
    border-radius: 8px;
    border: 1px solid var(--sec-color);
    box-shadow: ${theme.palette.mode === "dark"
      ? `0px 4px 8px rgb(0 0 0 / 0.7)`
      : `0px 4px 8px rgb(0 0 0 / 0.1)`};
    padding: 0.75rem;
    color: var(--sec-color);
    font-size: 0.875rem;
    font-family: "IBM Plex Sans", sans-serif;
    font-weight: 500;
    opacity: 1;
    margin: 0.25rem 0;
    cursor: pointer;
  `
);

const Button = styled("button")(
  ({ theme }) => `
    font-family: 'IBM Plex Sans', sans-serif;
    font-weight: 600;
    font-size: 1.2rem;
    line-height: 1.5;
    background-color: var(--sideBarColor);
    border-radius: 40px;
    color: var(--sec-color);
    transition: all 150ms ease;
    cursor: pointer;
    border: 3px solid var(--sec-color);
    transition: 0.5s ease !important;
  
    &:hover {
      background-color: var(--sec-color);
      color: var(--sideBarColor);
    }
  
    &:active {
      background-color: var(--sec-color)};
      box-shadow: none;
    }
  `
);
