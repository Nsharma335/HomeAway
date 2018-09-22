import React, { Component } from 'react'


export default class Dashboard extends Component {
    render() {
        return (
            <div>

                <div class="container">
                    <p></p>
                    <div id="wrapper" style={{ padding: '10%' }}>

                        <div id="sidebar-wrapper">
                            <ul class="sidebar-nav">
                                <li class="sidebar-brand nav-container">
                                    <a className="btn btn-primary" href="/dashboard" ><b>Dashboard</b></a>

                                </li>
                                <li>
                                    <a className="btn btn-secondary" href="#">Shortcuts</a>
                                </li>
                                <li>
                                    <a className="btn btn-secondary" href="#">Overview</a>
                                </li>
                                <li>
                                    <a className="btn btn-secondary" href="#">Events</a>
                                </li>
                                <li>
                                    <a className="btn btn-secondary" href="#">About</a>
                                </li>
                                <li>
                                    <a className="btn btn-secondary" href="#">Services</a>
                                </li>
                            </ul>
                        </div>
                    </div >

                    <div class="container">
                        <p></p>
                        <div align="center">Log in to HomeAway</div>
                        <p align="center">Need an account?<a href="/signup" style={{ color: '#007bff' }}>&nbsp;&nbsp;&nbsp;Sign Up</a></p>
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
            </div>

        )
    }
}
