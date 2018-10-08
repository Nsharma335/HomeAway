import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
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
    }

    componentDidMount() {
        localStorage.clear();
    }
    render() {

        return (
            <React.Fragment>
                <header className="header">
                    <Header />
                    <div className="bodyheading">
                        <h1 className="text">
                            Book beach houses, cabins,
                        <br />
                            Condos and more, worldwide
                        </h1>
                        <Search></Search>
                        <div class="row" style={{ marginLeft: "60px" }}>
                            <div className="col-md-4"><strong class="item">Your whole vacation starts here</strong>
                                <br />
                                <span>Choose a rental from the world's best selection</span>
                            </div>
                            <div className="col-md-4"><strong class="item">Book and stay with confidence</strong>
                                <br />
                                <span>Secure payments, peace of mind</span>
                            </div>

                            <div className="col-md-4"><strong class="item">Your vacation your way</strong>
                                <br />
                                <span>More space, more privacy, no compromises</span>
                            </div>
                        </div>
                    </div>
                </header>
            </React.Fragment>
        )
    }
}



export default Home;