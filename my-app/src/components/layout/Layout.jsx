import "./Layout.css"
import React from 'react'
import {Outlet} from 'react-router-dom'
import Sidebar from './../sidebar/Sidebar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
export default function Layout() {
  return (
    <div>
        <Row>
            <Col sm={2}><Sidebar/></Col>
            <Col sm={10}>loooloooo</Col>
        </Row>
      
      <Outlet />
      
    </div>
  )
}
