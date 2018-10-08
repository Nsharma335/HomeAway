import React, { Component } from 'react'
import axios from 'axios';

import HeaderBlue from './HeaderBlue';
import Search from './Search';

import swal from 'sweetalert2';
import cookie from 'react-cookies';

export default class BookProperty extends Component {
    constructor(props) {
        super(props)
        this.state = {
            propertyId: "",
            title: "",
            location: "",
            bedroom: "",
            sleeps: "",
            bathroom: "",
            description: "",
            propertyType: "",
            currency: "",
            baseprice: "",
            owner: "",
            checkin: "",
            checkout: "",
            totalPrice: "",
            travelerEmail: "",
            availableFrom: "",
            availableTo: ""

        }
        this.loadPropertyDetailsFromServer = this.loadPropertyDetailsFromServer.bind(this);
        this.bookingProperty = this.bookingProperty.bind(this);

    }

    componentWillMount() {
        var self = this;
        if (cookie.load("cookieName")) {
            console.log("id is" + id);
            var cookievalue = cookie.load("cookieName");
            var jsonobject = cookievalue.substring(2);
            var parsedObject = JSON.parse(jsonobject);
            var id = parsedObject.user_email;
            self.setState({ travelerEmail: id })
            this.setState({ checkin: localStorage.getItem("checkin") });
            console.log("state checkin" + this.state.checkin)
            this.setState({ checkout: localStorage.getItem("checkout") });
            console.log("state checkout" + this.state.checkout)
        }

        if (!cookie.load("cookieName"))
            window.location.href = "http://localhost:3000/";
    }

    CalculateDays(date1, date2) {
        //Get 1 day in milliseconds
        var one_day = 1000 * 60 * 60 * 24;

        // Convert both dates to milliseconds
        var date1_ms = date1.getTime();
        var date2_ms = date2.getTime();

        // Calculate the difference in milliseconds
        var difference_ms = date2_ms - date1_ms;

        // Convert back to days and return
        return Math.round(difference_ms / one_day);
    }
    componentDidMount() {
        var self = this
        let id = localStorage.getItem("property_id");
        if (id != null) {
            this.loadPropertyDetailsFromServer(id);
        }
        console.log(id);
    }
    loadPropertyDetailsFromServer(id) {
        var self = this
        axios.get("http://localhost:3001/getProperty?id=" + id)
            .then(function (response) {
                if (response.data.rows != null) {
                    let property_detail = response.data.rows;
                    console.log("response data email->" + response.data.rows.id);
                    console.log("email from user_detail->" + property_detail.email);
                    console.log("response data bathroom->" + response.data.rows.bathroom);
                    console.log("email from accomodates->" + response.data.rows.accomodates);
                    console.log("response data amenities->" + response.data.rows.amenities);
                    console.log("email from type->" + response.data.rows.propertyType);
                    console.log("response data bathroom->" + property_detail.bathroom);
                    console.log("email from accomodates->" + property_detail.accomodates);
                    console.log("response data amenities->" + property_detail.amenities);
                    self.setState({
                        propertyId: property_detail.propertyId,
                        title: property_detail.headline,
                        location: property_detail.address,
                        bedroom: property_detail.bedroom,
                        sleeps: property_detail.accomodates,
                        bathroom: property_detail.bathroom,
                        description: property_detail.description,
                        propertyType: property_detail.propertyType,
                        currency: property_detail.currency,
                        baseprice: property_detail.baseRate,
                        owner: property_detail.owner,
                        amenities: property_detail.amenities,
                        availableFrom: property_detail.availableFrom,
                        availableTo: property_detail.availableTo
                    })
                    return;
                }
                return;
            })
    }

    bookingProperty(e) {
        e.preventDefault();
        const data = {
            propertyId: this.state.propertyId,
            travelerEmail: this.state.travelerEmail,
            checkin: this.state.checkin,
            checkout: this.state.checkout,

        }

        axios.post('http://localhost:3001/bookingProperty', data)
            .then((response) => {
                // window.location.href = "http://localhost:3000/dashboard";
                if (response.status === 201) {
                    swal('Booked Successfully.!', "Your Booking is done.", 'success');

                } else {
                    this.setState({
                        isLoggeedIn: false
                    })
                }
            });
    }



    render() {
        var total = "";
        var checkin = new Date(localStorage.getItem("checkin"));
        var checkout = new Date(localStorage.getItem("checkout"));
        var noOfdays = this.CalculateDays(checkin, checkout);
        total = this.state.baseprice * noOfdays;
        var showTotal;
        console.log("state price" + this.state.totalPrice)
        console.log("total" + total)
        if (isNaN(total)) { showTotal = 0 }
        else {
            showTotal = total;
        }
        console.log("checkin value" + this.state.checkin)
        console.log("checkin value" + this.state.checkout)
        console.log("checkin->" + this.state.availableFrom)
        console.log("checkin->" + this.state.availableTo)
        console.log("checkin->" + localStorage.getItem("checkin"))
        console.log("checkin->" + localStorage.getItem("checkout"))
        return (
            <div>
                <HeaderBlue />
                <Search />
                <div className="container-fluid" style={{ marginTop: "-100px" }}  >


                    <div className="col-md-8" style={{ border: "2px solid grey" }}>

                        <div>
                            <img src={require('../images/beachhouse5.jpg')} height="100px" />&nbsp;
                            <img src={require('../images/beach4.jpg')} height="100px" />&nbsp;
                            <img src={require('../images/beachhouse2.jpg')} height="100px" />
                        </div>

                        <hr></hr>
                        <div><h1>Overview</h1></div>

                        <div className="displayRow">
                            <div id="below">{this.state.title}</div>
                            <div className="belowTitleView"><strong>{this.state.location}</strong></div>
                        </div>
                        <br></br>
                        <div className="displayRow">
                            <div className="belowTitleView" style={{ marginRight: "50px" }}>Bedrooms</div>
                            <div className="belowTitleView" style={{ marginRight: "50px" }}>Bathroom</div>

                        </div>
                        <div className="displayRow">
                            <div className="belowTitleView" style={{ marginRight: "60px" }}><strong>{this.state.bedroom}</strong></div>
                            <div className="belowTitleView" style={{ marginRight: "60px" }}><strong>{this.state.accomodates}</strong></div>
                            <div className="belowTitleView" style={{ marginRight: "60px" }}><strong>{this.state.bathroom}</strong></div>
                        </div>

                        <div>{this.state.description}</div>
                        <br>
                        </br>
                        <div style={{ marginBottom: "50px" }}>
                            <strong>Amenities: </strong> {this.state.amenities}
                        </div>
                    </div>
                    <div className="col-md-1"></div>
                    <form className="form-inline">

                        <div className="col-md-3" style={{ border: "2px solid grey", backgroundColor: "#eee", }}>
                            <strong style={{ fontSize: "20px" }}> {this.state.currency}&nbsp;{this.state.baseprice}</strong> <span style={{ fontSize: "12px" }}>per night</span>

                            <p></p>
                            <div>
                                Check In
                        </div>
                            <div>
                                <input type="date" name="checkin" value={localStorage.getItem("checkin")} onChange={this.checkInDateHandler} ></input>
                            </div>
                            <p></p>
                            <div>
                                Check Out
                        </div>
                            <div>
                                <input type="date" name="checkout" value={localStorage.getItem("checkout")} onChange={this.checkOutDateHandler}></input>
                            </div>
                            <p></p>
                            <div>
                                <span></span>
                                Total: {showTotal} {this.state.currency}
                            </div>
                            <p></p>
                            <div style={{ marginBottom: "50px" }}>
                                <button type="submit" className="btn" onClick={this.bookingProperty} >Book Now </button>
                            </div>
                        </div>
                    </form>
                </div>

            </div >
        );
    }
}
