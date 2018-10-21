import React, { Component } from 'react'
import axios from 'axios';
import Swal from 'sweetalert2';
import cookie from 'react-cookies';
import HeaderBlue from './HeaderBlue';
import Moment from 'react-moment';


export default class TravelerTrips extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
            message: ""
        };
    }
    componentDidMount() {
        if (cookie.load("cookieName"))
            this.loadOwnerPropertyDetails();
        else
            window.location.href = "http://localhost:3000/travelerlogin";
    }

    loadOwnerPropertyDetails() {
        var self = this;
        console.log("loading property cookie")
        var cookievalue = cookie.load("cookieName");
        console.log(cookievalue);
        var jsonobject = cookievalue.substring(2);
        console.log(jsonobject);
        var parsedObject = JSON.parse(jsonobject);
        var id = parsedObject.user_email;
        console.log("OWNER DASHBOARD PAGE ID" + id)
        if (id != null) {
            axios.get("http://localhost:3001/travelerBookings?email=" + id)
                .then(function (response) {
                    if (response.data.rows != null) {
                        console.log(response);
                        self.setState({
                            data: response.data.rows
                        })
                    }
                    if (response.status === 204) {
                        console.log("no booking " + response.status)
                        console.log("data" + response.data.status)
                        return
                    }
                })
        }
    }
    render() {

        let propertytList;
        propertytList = this.state.data.map(property => {
            return (
                <div>
                    <div className="container-fluid" style={{
                        borderRadius: "5px",
                        marginBottom: "20px",
                        width: "90%",
                        backgroundColor: "white",
                        boxShadow: "0px 1px 3px rgba(0,0,0,.1)"
                    }}>
                        <div className="row">

                            <div className="col-sm-10 nameview">

                                <div>
                                    <h2> Booking Id : {property.bookingId} </h2>
                                </div>

                                <div ><strong>Address: {property.headline} located in {property.address}</strong> </div>
                                <div ><strong>Contact Owner:{property.owner}</strong></div>
                                <div>Its a {property.bedroom} bedroom, {property.bathroom} bathroom {property.propertyType}</div>
                                <div> Your arrival date is : <Moment format="MM/DD/YYYY">{property.checkin}</Moment></div>
                                <div> Your Checkout date is : <Moment format="MM/DD/YYYY">{property.checkout}</Moment></div>
                                <strong> Please note down your "Booking Id" for future reference.</strong>
                            </div>
                        </div>
                    </div>
                </div >

            );
        });
        if (this.state.data != undefined) {
            console.log("data" + this.state.data)
            return (

                <div>
                    <div className="main-property-div" style={{ backgroundColor: '#f7f7f8' }}>
                        <HeaderBlue />
                        {propertytList}
                    </div>
                </div >
            )
        }

        else {

            console.log("inside undefined block")
            return (
                <div>
                    <HeaderBlue />
                    <div className="col-md-10 form-group" style={{ textAlign: "center", margin: "100px" }}>

                        <h2> You don't have any past or upcoming trips.</h2>

                    </div>
                </div>
            )
        }
    }
}
