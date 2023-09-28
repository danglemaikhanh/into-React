import React from "react";
import { FaBars, FaTimes } from "react-icons/fa"
import '../components/navbar.css';
import Logo from "../images/logo.png"

export default function Navbar() {
    return (
        <nav className="navbar">
            <div className="navbar__logo">
                <img src={Logo} alt="logo" />
            </div>
            <ul className="navbar__list">
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#fqa">FQA</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
            <div className="navbar__hamburger">
                <FaBars size={30} style={{ color: '#65e1e9' }} />
            </div>
        </nav>
    )
}