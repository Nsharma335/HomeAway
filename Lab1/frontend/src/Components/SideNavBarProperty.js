import React, { Component } from 'react'
import HeaderBlue from './HeaderBlue';

export default class SideNavBarProperty extends Component {

    render() {

        return (
            <div>

                <div id="mySidenav" class="sidenav">
                    <a href="/location" id="location">Location</a>
                    <a href="/propertydetails" id="details">Property Details</a>
                    <a href="/pricing" id="availability">Availability</a>
                </div>
            </div >
        )
    }
}