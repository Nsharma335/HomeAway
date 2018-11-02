import React, { Component } from 'react'
import SideNavBarProperty from './SideNavBarProperty';

export default class Confirmation extends Component {
    render() {

        return (
            <div>
                <div class="container" style={{ backgroundColor: "#eee" }}>
                    <div class="main-div" style={{   boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}>
                        <h1 style={{ fontSize: "20px" }}>Confirmation</h1>
                        <div class="form-group">
                            <h1 style={{ fontSize: "20px" }}>Please confirm your details :</h1>
                        </div>
                        <div className="row">Location : {this.props.fieldValues.address}</div>
                        <div className="row">Description : {this.props.fieldValues.description}</div>
                        <div className="row">Bedroom : {this.props.fieldValues.bedroom}</div>
                        <div className="row">Bathroom: {this.props.fieldValues.bathroom}</div>
                        <div className="row">Accomodates : {this.props.fieldValues.accomodates}</div>
                        <div className="row">Amenities : {this.props.fieldValues.amenities}</div>
                        <div className="row">Available From: {this.props.fieldValues.availableFrom}</div>
                        <div className="row">Available To : {this.props.fieldValues.availableTo}</div>
                        <div className="row">Property Type : {this.props.fieldValues.propertyType}</div>
                        <div className="row">Currency: {this.props.fieldValues.currency}</div>
                        <div className="row">Nightly Base Rate: {this.props.fieldValues.baseRate}</div>

                        <p></p>
                        <button className="btn-primary form-control" style={{ width: "200px" }} onClick={this.props.submitProperty}>Confirm</button>
                    </div>
                </div></div >

        )
    }
}
