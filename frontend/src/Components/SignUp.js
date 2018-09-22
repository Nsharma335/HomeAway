import React, { Component } from 'react'
import '../App.css';
import axios from 'axios';

export default class SignUp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            emailAlreadyPresent: false,
        };
        this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
        this.handleLastNameChange = this.handleLastNameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleRegistration = this.handleRegistration.bind(this);

    }

    handleFirstNameChange(e) {
        this.setState({ firstName: e.target.value });
        e.target.value == "" ? document.getElementById("fname-error").innerHTML = "Please enter your name" :
            document.getElementById("fname-error").innerHTML = "";
    }

    handleLastNameChange(e) {
        this.setState({ lastName: e.target.value });
        e.target.value == "" ? document.getElementById("lname-error").innerHTML = "Please enter your name" :
            document.getElementById("lname-error").innerHTML = "";
    }

    handlePasswordChange(e) {
        this.setState({ password: e.target.value });
        e.target.value == "" ? document.getElementById("email-error").innerHTML = "Please enter your email" :
            document.getElementById("email-error").innerHTML = "";
    }
    handleEmailChange(e) {
        this.setState({ email: e.target.value });
        e.target.value == "" ? document.getElementById("password-error").innerHTML = "Please enter your password" :
            document.getElementById("password-error").innerHTML = "";
    }

    handleRegistration(e) {
        e.preventDefault();
        const data = { firstName: this.state.firstName, lastName: this.state.lastName, email: this.state.email, password: this.state.password };
        debugger;
        axios.post('http://localhost:3001/register', data)
            .then((response) => {
                window.location.href = "http://localhost:3000/dashboard";
                if (response.status === 200) {
                    this.setState({
                        isLoggeedIn: true
                    });
                } else {
                    this.setState({
                        isLoggeedIn: false
                    })
                }
            });
    }

    validateFirstNameFormat(firstName) {
        if (firstName.trim() == "") {
            document.getElementById("name-error").innerHTML = "Please enter your first name";
            return false;
        }
        return true;
    }
    validateLastNameFormat(lastName) {
        if (lastName.trim() == "") {
            document.getElementById("name-error").innerHTML = "Please enter your last name";
            return false;
        }
        return true;
    }

    validateEmailFormat(email) {
        const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (email == "") {
            document.getElementById("email-error").innerHTML = "Please enter your email";
            return false;
        }
        else if (!regex.test(String(email).toLowerCase())) {
            document.getElementById("email-error").innerHTML = "Please enter valid email address";
            return false;
        }
        return true;
    }
    validatePasswordFormat(password) {
        if (password.trim() == "") {
            document.getElementById("password-error").innerHTML = "Please enter your password";
            return false;
        }
        else if (password.trim().length < 8) {
            document.getElementById("password-error").innerHTML = "Password should be of 8 characters or more";
            return false;
        }
        return true;
    }



    render() {
        return (
            <div>
                <div class="container">
                    <p></p>
                    <div align="center">Sign up for HomeAway</div>
                    <p align="center">Already have an account?<a href="/travelerlogin" style={{ color: '#007bff' }}>&nbsp;&nbsp;&nbsp;Log in</a></p>
                    <div class="login-form">
                        <div class="main-div">

                            <div class="form-group">
                                <input onChange={this.handleFirstNameChange} type="text" class="form-control" name="firstName"
                                    placeholder="First Name" required="true" />
                            </div>
                            <div id="fname-error" class="error"></div>
                            <div class="form-group">
                                <input onChange={this.handleLastNameChange} type="text" class="form-control" name="lastName"
                                    placeholder="Last Name" required="true" />
                            </div>
                            <div id="lname-error" class="error"></div>
                            <div class="form-group">
                                <input onChange={this.handleEmailChange} type="text" class="form-control" name="email"
                                    placeholder="Email Address" required="true" />
                            </div>
                            <div id="email-error" class="error"></div>
                            <div class="form-group">
                                <input onChange={this.handlePasswordChange} type="password" class="form-control" name="password" placeholder="Password" required="true" />
                            </div>
                            <div id="password-error" class="error"></div>
                            <button onClick={this.handleRegistration} class="btn btn-primary">Sign Me Up</button>
                        </div>

                    </div>
                </div>

            </div>

        )
    }
}
