import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import DropdownButton from 'react-dropdown'
import 'react-dropdown/style.css';
import SideNav, { Nav, NavIcon, NavText } from 'react-sidenav';
import cookie from 'react-cookies';
import { Link } from "react-router-dom";


class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: ""
    }
  }

  handleSignOut(e) {
    // localStorage.clear();
    axios.get('http://localhost:3001/destroySession', { withCredentials: true })
      .then((response) => {
      })
    window.location.href = "http://localhost:3000/";
  }

  // componentWillMount() {
  //   console.log("my auth",this.props.authFlag)
  // }

  renderHeader() {
    if (this.props.authFlag) {
      let details = this.props.userinfo.map(info => {
        if(info!=null)
        return(
            <span>{info.firstName}</span>
      )})
  
      return (
        <li class="dropdown" >
          <a class="dropdown-toggle" data-toggle="dropdown" href="#" style={{ color: "white" }}>
            {details} <span class="caret"></span>
           
          </a>
          <ul class="dropdown-menu">
          <li>
                            <button class="btn navbar-btm">
                            <Link  to="/">
                                <span>Home</span>
                            </Link>
                            </button>
                        </li>
                        <li>
                            <button class="btn navbar-btm">
                            <Link  to="/userprofile">
                            My Profile
                            </Link>
                            </button>
                        </li>
                        <li>
                            <button class="btn navbar-btm">
                            <Link  to="/travelerInbox">
                            Inbox
                            </Link>
                            </button>
                        </li>
                        <li>
                            <button class="btn navbar-btm">
                                <Link  to="/travelerTrips">
                                <span>My Trips</span>
                            </Link>
                            </button>
                        </li>
            <li>
              <button class="btn navbar-btm">
                <a onClick={this.handleSignOut} >
                  <span>Logout</span>
                </a>
              </button>
            </li>
          </ul>
        </li>
      )
      //})
    }

    else {
      return (
        <li class="dropdown" >
          <a class="dropdown-toggle" data-toggle="dropdown" href="#" style={{ color: "white" }}>
            Login <span class="caret"></span>
          </a>
          <ul class="dropdown-menu">
            <li>
              <button class="btn navbar-btm">
                <a href="/travelerlogin" >
                  <span>Traveler Login</span>
                </a>
              </button>
            </li>
            <li>
              <button class="btn navbar-btm">
                <a href="/ownerlogin" >
                  <span>Owner Login</span>
                </a>
              </button>
            </li>
          </ul>
        </li>
      )
    }
  }



  render(props) {

    return (
      <React.Fragment>

        <nav class="navbar navbar-light">
          <div class="container-fluid">
            <div class="navbar-header">
              <a class="navbar-brand" href="www.homeaway.com" style={{ marginLeft: '20px' }}>
                <img src={require('../img/homeaway.svg')} /></a>
            </div>
            <ul class="nav navbar-nav navbar-right"  >
              <div><input type="hidden" name="type" value="Traveler" /></div>
              {this.renderHeader()}
           
              <li><a class="logo" href="">
                <img src={require('../img/iconmain.svg')}></img>
              </a></li>
            </ul>
          </div>
        </nav>

      </React.Fragment>
    )
  }
}

const mapStateToProps = state =>{
  console.log("State header user", state.user)
  return {
      authFlag : state.authFlag,
      userinfo : state.user

  }
}
export default connect(mapStateToProps)(Header);

