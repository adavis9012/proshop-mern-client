import React from 'react';
import {LinkContainer} from "react-router-bootstrap";
import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {UserLoginState} from "../reducers/userReducers";
import {logout} from "../actions/userActions";

interface UserLoginSelector {
    userLogin: UserLoginState
}

const Header = () => {
    const dispatch = useDispatch();
    const userLogin: UserLoginState = useSelector((state: UserLoginSelector) => state.userLogin);
    const userInfo = userLogin?.userInfo;

    function render() {
        return (
            <header>
                <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
                    <Container>
                        <LinkContainer to="/">
                            <Navbar.Brand>ProShop</Navbar.Brand>
                        </LinkContainer>
                        <Navbar.Toggle aria-controls="basic-navbar-nav"></Navbar.Toggle>
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="ml-auto">
                                <LinkContainer to="/cart">
                                    <Nav.Link>
                                        <i className="fas fa-shopping-cart"/>
                                        Cart
                                    </Nav.Link>
                                </LinkContainer>
                                {userInfo ? renderUserInformation() : renderSignIn()}
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </header>
        )
    }

    function renderUserInformation() {
        return (
            <NavDropdown id="userName" title={userInfo?.name}>
                <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                </NavDropdown.Item>
            </NavDropdown>
        );
    }

    function renderSignIn() {
        return (
            <LinkContainer to="/login">
                <Nav.Link>
                    <i className="fas fa-user"/>
                    Sign In
                </Nav.Link>
            </LinkContainer>
        );
    }

    function logoutHandler(event: React.MouseEvent) {
        dispatch(logout());
    }

    return render();
}

export default Header;