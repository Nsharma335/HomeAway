import React, { Component } from 'react'


export default class ListProperty extends Component {
    render() {
        return (
            <div>

                <div id="wrapper" style={{ padding: '10%' }}>
                    <div id="sidebar-wrapper">
                        <ul class="sidebar-nav">
                            <li class="sidebar-brand nav-container">
                                <a className="btn btn-secondary" href="#" >Location</a>
                            </li>
                            <li>
                                <a className="btn btn-secondary" href="#">Deatils</a>
                            </li>
                            <li>
                                <a className="btn btn-secondary" href="#">Booking Options</a>
                            </li>
                            <li>
                                <a className="btn btn-secondary" href="#">Photos</a>
                            </li>
                            <li>
                                <a className="btn btn-secondary" href="#">Pricing</a>
                            </li>

                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}