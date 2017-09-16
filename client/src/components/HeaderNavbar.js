import React from 'react';
import { Navbar, NavItem } from 'react-materialize';
import '../styles/HeaderNavbar.css';

const HeaderNavbar = () => (
  <Navbar brand='Fantasy Fitness' className='navbar-brand' right>
    <NavItem className='active'>User</NavItem>
    <NavItem >Team</NavItem>
    <NavItem >League</NavItem>
    <NavItem >Rules</NavItem>
    <NavItem >Preferences</NavItem>
    <NavItem >Sign In</NavItem>
  </Navbar>
)

export default HeaderNavbar