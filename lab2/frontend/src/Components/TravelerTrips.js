import React, { Component } from 'react'
import axios from 'axios';
import Swal from 'sweetalert2';
import cookie from 'react-cookies';
import HeaderBlue from './HeaderBlue';
import Moment from 'react-moment';
import {Redirect} from 'react-router'; 
import { connect } from 'react-redux';


class TravelerTrips extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
            message: ""
        };
    }
    componentDidMount() {
        if (this.props.authFlag)
            this.loadOwnerPropertyDetails();
        else
            window.location.href = "http://localhost:3000/travelerlogin";
    }

    loadOwnerPropertyDetails() {
        var self = this;
        var id=null;
        let details= this.props.userinfo.map(user=> {
            if(user!=null){
            console.log("inside map email",user.email)
            id = user.email
            }
        })
        console.log("OWNER DASHBOARD PAGE ID" + id)
        if (id != null) {
            axios.get("http://localhost:3001/travelerBookings?email=" + id)
                .then(function (response) {
                    console.log("response is",response)
                    if (response.data.updatedList.rows != null) {
                        console.log(response);
                        self.setState({
                            data: response.data.updatedList.rows
                        })
                    }
                    if (response.data.updatedList.status === 204) {
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
                                 {/* <div>
                                    <h2> Here are your booking details  </h2>
                                </div> */}

                            <div className="col-sm-10 nameview">

                                <div ><strong>Address: {property.headline} located in {property.address}</strong> </div>
                                <div ><strong>Contact Owner:{property.owner}</strong></div>
                                <div>Its a {property.bedroom} bedroom, {property.bathroom} bathroom {property.propertyType}</div>
                                <div> Your arrival date is : <Moment format="MM/DD/YYYY">{property.checkin}</Moment></div>
                                <div> Your Checkout date is : <Moment format="MM/DD/YYYY">{property.checkout}</Moment></div>
                                {/* <strong> Please note down your "Booking Id" for future reference.</strong> */}
                            </div>
                        </div>
                    </div>
                </div >

            );
        });
        if (this.state.data.length>0) {
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


const mapStateToProps = state =>{
    console.log("State", state)
    console.log("State user", state.authFlag)
    return {
        authFlag : state.authFlag,
       userinfo: state.user
    }
}

export default connect(mapStateToProps)(TravelerTrips);