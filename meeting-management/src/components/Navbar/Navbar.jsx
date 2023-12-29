import React from 'react'
import logo from "../../image/Logo.png";
import './navbar.css'

export default function Navbar() {
    return <>
        <nav class="navbar navbar-expand-lg">
            <div class="container-fluid nav-main">
                <a class="navbar-brand " href="#">
                    <img className='nav-logo' src={logo}></img>
                </a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="#">Home</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Calendar</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Notification</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Meetings</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Create Meeting</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Create Meeting</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </>
}
