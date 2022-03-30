import React from 'react'
import { Nav, Navbar } from 'rsuite'
import MetamaskConnection from './MetamaskConnection/MetamaskConnection'
import styles from './Header.module.css';
import { Link } from 'react-router-dom';

const Header = () => {

    const NavLink = props => <Nav.Item as={Link} {...props} />

    return (
        <Navbar>
            <Navbar.Brand as={Link} to="/">
                Tree Buddy
            </Navbar.Brand>
            <Nav>
                <NavLink to="/transports">Transports</NavLink>
                <NavLink to="/cuts">Cuts</NavLink>
                <NavLink to="/cutters">Cutters</NavLink>
            </Nav>
            <Nav pullRight className={styles.wallet}>
                <MetamaskConnection />
            </Nav>
        </Navbar>
    )
}

export default Header