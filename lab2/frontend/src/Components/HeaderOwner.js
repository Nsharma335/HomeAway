import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import DropdownButton from 'react-dropdown'
import 'react-dropdown/style.css';
import SideNav, { Nav, NavIcon, NavText } from 'react-sidenav';
import cookie from 'react-cookies';
import { Link } from "react-router-dom";

class HeaderOwner extends Component {
    constructor(props) {
        super(props);
    }

    handleSignOut(e) {
        localStorage.clear();
        axios.get('http://localhost:3001/destroySession', { withCredentials: true })
            .then((response) => {
            })
        window.location.href = "http://localhost:3000/";
    }

    renderHeader() {
        console.log("props" + this.props.email)

        console.log("props" + this.props.email)

        if (this.props.authFlag) {
            let details = this.props.userinfo.map(info => {
                if(info!=null)
                return(
                    <span>{info.firstName}</span>
              )})

            // console.log(arr.map(item => key = { item.label }, label = { item.label }, value = { item.value }));
            return (
                <li class="dropdown" >
                    <a class="dropdown-toggle" data-toggle="dropdown" href="#" style={{ color: "#337ab7" }}>
                    {details} <span class="caret"></span>
                    </a>
                    <ul class="dropdown-menu">
                        <li>
                            <button class="btn navbar-btm">
                                <Link  to="/ownerDashboard">
                                <span>See all properties</span>
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
        }

        else {
            return (

                <li class="dropdown" >
                    <a class="dropdown-toggle" data-toggle="dropdown" href="#" style={{ color: "#337ab7" }}>
                        Login <span class="caret"></span>
                    </a>
                    <ul class="dropdown-menu">
                        <li>
                            <button class="btn navbar-btm">
                                <Link  to="/travelerlogin">
                                Traveler Login
                            </Link>
                            </button>
                        </li>
                        <li>
                            <button class="btn navbar-btm">
                            <Link  to="/ownerlogin">
                                Owner Login
                            </Link>
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
                            <a class="navbar-brand" href="www.homeaway.com">
                                <img src={require('../img/Homeblue.svg')} /></a>
                        </div>
                        <ul class="nav navbar-nav navbar-right blue-navbar"  >

                            {this.renderHeader()}

                            <li><button className="btn navbar-btn">
                            <Link to="/listYourProperty" style={{ textDecoration: "" }}>List Your Property</Link>
                            </button></li>
                            <li><a class="logo" href="">
                                <img src={require('../img/iconblue.svg')}></img>
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
  export default connect(mapStateToProps)(HeaderOwner);
  

