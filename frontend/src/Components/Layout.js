import React, { Component } from 'react';
import axios from 'axios';
import Home from './Home';
import Header from './Header';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import '../css/bootstrap.min.css';
import '../css/landing-page.min.css'

class Layout extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    var header = null;
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}

export default Layout

