import React, { Component } from 'react'
import Header from './Header';
import '../App.css';
import axios from 'axios';
import swal from 'sweetalert2'
import cookie from 'react-cookies';

class TravelerLogin extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
        };
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
        this.emailChangeHandler = this.emailChangeHandler.bind(this);
        this.submitLogin = this.submitLogin.bind(this);
    }
    emailChangeHandler(e) {

        this.setState({ email: e.target.value });
        console.log("email change handlet" + this.state.email)
        e.target.value == "" ? document.getElementById("email-error").innerHTML = "Please enter your email" :
            document.getElementById("email-error").innerHTML = "";
    }
    passwordChangeHandler(e) {
        this.setState({ password: e.target.value });
        e.target.value == "" ? document.getElementById("password-error").innerHTML = "Please enter your password" :
            document.getElementById("password-error").innerHTML = "";
    }

    submitLogin = e => {
        //prevent page from refresh
        e.preventDefault();
        console.log("inside submit login from client side..")
        const data = {
            email: this.state.email,
            password: this.state.password
        };
        console.log("user " + data.email + " pwd " + data.password)
        console.log("with credentials true")

        axios.post('http://localhost:3001/login', data, { withCredentials: true })
            .then(response => {

                console.log("Status Code : ", response.status);
                if (response.data.success) {
                    console.log("success")
                    this.setState({
                        authFlag: true,
                    });
                    window.location.href = "http://localhost:3000/";
                }
                if (response.status === 401) {
                    console.log("Incorrect Credentials")
                    swal('Incorrect Password!', "Incorrect Credentials", 'error');
                }
                if (response.status === 204) {
                    console.log("User Not found")
                    swal('Email not registered!', "Please register to login.", 'error');
                }

            });
    }


    render() {

        return (
            <div>
                <nav class="navbar navbar-light">
                    <div class="container-fluid">
                        <div class="navbar-header">
                            <a class="navbar-brand" href="www.homeaway.com">
                                <img src={require('../img/Homeblue.svg')} /></a>
                        </div>
                        <ul class="nav navbar-nav navbar-right"  >
                            <li><a class="logo" href="">
                                <img src={require('../img/iconblue.svg')}></img>
                            </a></li>
                        </ul>
                    </div>
                </nav>

                <form method="post">
                    <div class="container">
                        <p></p>
                        <div align="center" style={{ fontSize: '30px' }}>Log in to HomeAway</div>
                        <p align="center">Need an account?<a href="/register" style={{ color: '#007bff' }}>&nbsp;&nbsp;&nbsp;Sign Up</a></p>
                        <div class="login-form">
                            <div class="main-div">

                                <div class="panel" align="left">
                                    <p>Account Login</p>
                                </div>
                                <div><input type="hidden" name="type" value="Traveler" /></div>
                                <div class="form-group">
                                    <input onChange={this.emailChangeHandler} type="text" class="form-control" name="email"
                                        placeholder="Email address" required="true" />
                                </div>
                                <div id="email-error" class="error"></div>
                                <div class="form-group">
                                    <input onChange={this.passwordChangeHandler} type="password" class="form-control" name="password" placeholder="Password" required="true" />
                                </div>
                                <div id="password-error" class="error"></div>
                                <button onClick={this.submitLogin} class="btn btn-primary">Log In</button>
                            </div>
                        </div>
                    </div>
                </form>

            </div>
        )
    }
}
export default TravelerLogin;