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
            <Col sm={3} ><Sidebar/></Col>
            <Col sm={9} >2 of 2</Col>
        </Row>
      
      <Outlet />
      
    </div>
  )
}
