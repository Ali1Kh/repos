import "./Layout.css";
import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./../sidebar/Sidebar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Navbar from "../Navbar/Navbar";

export default function Layout() {
  return (
    <>
      <Row className="p-0 m-0">
        <Navbar/>
        <Col className="col-sm-2 sidebar-col p-0 m-0">
          <Sidebar />
        </Col>
        <Col className="col-sm-10 p-0 m-0">
          <Outlet />
        </Col>
      </Row>
    </>
  );
}
