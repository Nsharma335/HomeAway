import React, { Component } from 'react';
import axios from 'axios';
import Home from './Home';
import Header from './Header';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


class Layout extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}

export default Layout

