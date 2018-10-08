import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import DropdownButton from 'react-dropdown'
import 'react-dropdown/style.css';
import SideNav, { Nav, NavIcon, NavText } from 'react-sidenav';
import cookie from 'react-cookies';


class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: ""
    }

    this.loadUserDetails = this.loadUserDetails.bind(this);
  }

  handleSignOut(e) {
    localStorage.clear();
    axios.get('http://localhost:3001/destroySession', { withCredentials: true })
      .then((response) => {
      })
    window.location.href = "http://localhost:3000/";
  }

  componentWillMount() {
    if (cookie.load("cookieName"))
      this.loadUserDetails();
  }

  loadUserDetails() {
    var self = this;

    var cookievalue = cookie.load("cookieName");
    var jsonobject = cookievalue.substring(2);
    var parsedObject = JSON.parse(jsonobject);
    var id = parsedObject.user_email;
    if (id != null) {
      console.log("id is" + id);
      const data = { email: id };
      console.log("my data" + data);
      axios.get("http://localhost:3001/getUserDetails?email=" + id)
        .then(function (response) {
          if (response.data.rows != null) {
            console.log("if row returned from get user , come here")
            let user_detail = response.data.rows;
            console.log("response data email->" + response.data.rows.email);
            console.log("email from user_detail->" + user_detail.email);
            self.setState({
              firstName: user_detail.firstName,
            })
            return;
          }
          return;
        })
    }
  }


  renderHeader() {
    if (cookie.load('cookieName')) {
      return (
        <li class="dropdown" >
          <a class="dropdown-toggle" data-toggle="dropdown" href="#" style={{ color: "white" }}>
            {this.state.firstName} <span class="caret"></span>
          </a>
          <ul class="dropdown-menu">
            <li>
              <button class="btn navbar-btm">
                <a href="/userprofile" >
                  <span>My Profile</span>
                </a>
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


export default Header

