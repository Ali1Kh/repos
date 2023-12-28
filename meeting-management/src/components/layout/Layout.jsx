import "./Layout.css";
import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./../sidebar/Sidebar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
// import Navbar from "../Navbar/NavbarSmall";

export default function Layout() {
  return (
    <>
      <Row className="p-0 m-0">
        {/* <Navbar/> */}
        <Col sm={2} className="p-0 m-0">
          <Sidebar />
        </Col>
        <Col sm={10} className="p-0 m-0">
          <Outlet />
        </Col>
      </Row>
    </>
  );
}
