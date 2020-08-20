import React, { useContext} from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

import { Navbar, Nav } from 'react-bootstrap';
import './component.css';

export default function Login(props) {
  
    const logout=()=>{
   
    localStorage.removeItem("jwt");
    window.location='/';
    
    };

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className="nav-bar">
            
            <Navbar.Brand href={props.isAuthenticated? "/app":"/"}>Finance</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">

                <Nav className="mr-auto">
                   {!props.isAuthenticated&& <Link to="/login" className="nav-link">Sign in</Link>}
                   {!props.isAuthenticated&&<Link to="/register" className="nav-link">Register</Link>}
                    {props.isAuthenticated&& <Link to="/" className="nav-link" onClick={logout}>Sign Out</Link>}
                </Nav>
            </Navbar.Collapse>
        </Navbar>


    );

   
}
