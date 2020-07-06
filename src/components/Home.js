import React, { Component } from 'react';
import AccountBalance from './AccountBalance';
import 'bootstrap/dist/css/bootstrap.css';
import {Link} from 'react-router-dom';
import {Button, Form, FormControl, Nav, Navbar} from "react-bootstrap";

class Home extends Component {
    render() {
        return (

            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="#home">Home</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">


                        <Nav.Link>
                            <Link to="/Debits">Debits</Link>
                        </Nav.Link>

                        <Nav.Link href="#link">
                            <Link to="/Credits">Credits</Link>
                        </Nav.Link>

                        <Nav.Link>
                            <Link to="/UserProfile">UserProfile</Link>
                        </Nav.Link>

                        <Nav.Link>
                            Account Balance: {this.props.accountBalance}
                        </Nav.Link>

                    </Nav>

                </Navbar.Collapse>
            </Navbar>

        );
    }
}

export default Home;