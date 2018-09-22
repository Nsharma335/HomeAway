import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import ShowCase1 from '../img/bg-showcase-1.jpg';
import ShowCase2 from '../img/bg-showcase-2.jpg';
import ShowCase3 from '../img/bg-showcase-3.jpg';
import axios from 'axios';
import { Link } from 'react-router-dom';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import { bindActionCreators } from 'redux';
import Header from './Header';
import Search from './Search.js';

class Home extends Component {
    constructor(props) {
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
    }
    //handle logout to destroy the cookie
    handleLogout = () => {
        cookie.remove('cookie', { path: '/' })
    }
    handleButton(e) {
        e.preventDefault();
        this.props.history.push("/signup")
    }

    render() {

        return (
            <div>
                <div id="test">
                    <Header></Header>
                    <header className="masthead text-white text-center">
                        <div className="overlay"></div>
                        <div className="container">
                            <div className="row">
                                <div className="col-xl-9 mx-auto">
                                    <div className="col-xl-9 mx-auto">
                                        <h1 className="mb-5">Book beach houses, cabins, condos and more, worldwide</h1>
                                    </div>
                                    <Search></Search>
                                </div>
                                <div className="col-md-10 col-lg-8 col-xl-7 mx-auto">
                                    <div className="form-row">
                                        <div className="col-12 col-md-3 center">
                                            {/* <button type="submit" className="btn btn-block btn-lg btn-primary" onClick={this.handleButton.bind(this)}>Sign up Now!</button> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </header>
                </div>
            </div>
        )
    }
}



export default Home;