import React from 'react'
import { NavLink } from 'react-router-dom'
import {
    Container, Nav, Navbar
} from 'react-bootstrap'

const Header = (props) => {
    return(
        <>
            <Navbar bg="dark" variant="dark" expand="xl">
                <Container>
                    <NavLink to={'/'} className="navbar-brand">MoneyCC</NavLink>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav">
                    <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-list" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M2.5 11.5A.5.5 0 0 1 3 11h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 3 7h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 3 3h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
                    </svg>
                    </Navbar.Toggle>
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="d-flex ml-auto justify-content-end">
                            <NavLink className="nav-link" activeClassName="nav-active" exact to={'/'}>Home</NavLink>
                            <NavLink className="nav-link" activeClassName="nav-active" exact to={'/about'}>About</NavLink>
                            <NavLink className="nav-link" activeClassName="nav-active" exact to={'/contact'}>Contact</NavLink>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default Header