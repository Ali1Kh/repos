import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../../image/Logo-small.png';

export default function NavbarSmall() {
    return <>
        <Navbar bg="dark" data-bs-theme="dark">
            <Container>
                <Navbar.Brand href="#home"><img src={logo} alt="Logo" /></Navbar.Brand>
                <Nav className="ms-auto">
                    <Nav.Link href="#">Home</Nav.Link>
                    <Nav.Link href="#">Calendar</Nav.Link>
                    <Nav.Link href="#">Notification</Nav.Link>
                    <Nav.Link href="#">create meeting</Nav.Link>
                    <Nav.Link href="#">meetings</Nav.Link>
                    <Nav.Link href="#"><i className="fa-solid fa-gear"></i></Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    </>
}
