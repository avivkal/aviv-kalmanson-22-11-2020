import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Navbar, Nav, Button } from 'react-bootstrap';
import { HOME_PATH, LOGIN_PATH, REGISTER_PATH, MESSAGES_PATH } from '../../Constants/const'

class NavigationBar extends Component {


    render() {
        return (

            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" >
                <Navbar.Brand as={Link} to={HOME_PATH}>Herolo Messaging Task</Navbar.Brand>

                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ml-auto">
                        <Nav.Link as={Link} to={HOME_PATH}>Home</Nav.Link>
                        <Nav.Link as={Link} to={MESSAGES_PATH}>
                            New Message </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}


export default NavigationBar;

