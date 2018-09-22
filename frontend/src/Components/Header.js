import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import DropdownButton from 'react-dropdown'
import 'react-dropdown/style.css';
import SideNav, { Nav, NavIcon, NavText } from 'react-sidenav';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = { sessionPresent: false }
  }

  render(props) {
    let isLoggedIn = localStorage.getItem("isLoggedIn");
    let travelerLogin = null;
    travelerLogin = <a className="link-style nav-link btn-light  " href="/travelerlogin"  >Traveler Login</a>

    return (
      <div id="header-main-div">
        <nav className="navbar navbar-light bg-light static-top">

          <div className="container">
            <a href="https://www.homeaway.com/" id="homeaway-img" target="_blank" className="nav navbar-nav navbar-right" title="Home"><img height='60' width='100' src={require('../img/HomeAway-logo.png')} /></a>
            <a className="link-style nav-link btn-light " href="/tripBoards">Trip Boards</a>
            {travelerLogin}
            <a className="link-style nav-link btn-light " href="/help" >Help</a>
            <a className="link-style nav-link btn-light " href="/listProperty" >List your property</a>
          </div>
        </nav>
      </div>
    )
  }
}


export default Header

