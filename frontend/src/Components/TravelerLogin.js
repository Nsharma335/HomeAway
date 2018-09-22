import React, { Component } from 'react'
import Header from './Header';
import '../App.css';
import axios from 'axios';

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
        // e.target.value == "" ? document.getElementById("email-error").innerHTML = "Please enter your email" :
        //     document.getElementById("email-error").innerHTML = "";
    }
    passwordChangeHandler(e) {
        this.setState({ password: e.target.value });
        // e.target.value == "" ? document.getElementById("password-error").innerHTML = "Please enter your password" :
        //     document.getElementById("password-error").innerHTML = "";
    }


    submitLogin = e => {
        var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        console.log("inside submit login from client side..")
        const data = {
            email: this.state.email,
            password: this.state.password
        };
        console.log("user " + data.email + " pwd " + data.password)
        console.log("with credentials true")
        //make a post request with the user data
        axios.post('http://localhost:3001/travelerlogin', data, { withCredentials: true })
            .then(response => {
                console.log("Status Code : ", response.status);
                if (response.status === 200) {
                    this.setState({
                        authFlag: true
                    });
                    this.props.history.push('/');
                } else {
                    this.setState({
                        authFlag: false
                    })
                }
            });
    }


    render() {
        return (
            <div>

                <div class="container">
                    <p></p>
                    <div align="center">Log in to HomeAway</div>
                    <p align="center">Need an account?<a href="/register" style={{ color: '#007bff' }}>&nbsp;&nbsp;&nbsp;Sign Up</a></p>
                    <div class="login-form">
                        <div class="main-div">

                            <div class="panel" align="left">
                                <p>Account Login</p>
                            </div>

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
            </div>
        )
    }
}
export default TravelerLogin;