import React, { Component } from 'react'
import axios from 'axios';
import HeaderBlue from './HeaderBlue';
import Search from './Search';
import swal from 'sweetalert2';
import cookie from 'react-cookies';
import { connect } from 'react-redux';
import moment from 'react-moment';

class BookProperty extends Component {
    constructor(props) {
        super(props)
        this.state = {
            property: this.props.location.state.property,
            checkin: "",
            checkout: "",
            totalPrice: "",
            travelerEmail: "",
            availableFrom: "",
            availableTo: ""

        };
     this.bookingProperty = this.bookingProperty.bind(this);
     this.checkInDateHandler=this.checkInDateHandler.bind(this);
     this.checkOutDateHandler=this.checkOutDateHandler.bind(this)

    }

    checkInDateHandler(e){
        this.setState({
            checkin: e.target.value
        })
    }

    checkOutDateHandler(e){
        this.setState({
            checkout: e.target.value
        })
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

    bookingProperty(e) {
        e.preventDefault();
        const data = {
           // propertyId: this.state.propertyId,
         //   travelerEmail: this.state.travelerEmail,
          //  checkin: this.state.checkin,
            //checkout: this.state.checkout,

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

componentDidMount(){
    console.log("local stoage checkin",this.state.property.checkin)
this.setState({checkin : localStorage.getItem("checkin")})
this.setState({checkout : localStorage.getItem("checkout")})
}



render() {

console.log("property fetched" , this.state.property);

var total = "";
var checkin = new Date(this.state.checkin);
var checkout = new Date(this.state.checkout);
var noOfdays = this.CalculateDays(checkin, checkout);
console.log("no of days",noOfdays)

total = this.state.property.baseRate * noOfdays;
var showTotal;
console.log("state price total" + this.state.totalPrice)
console.log("total calculated" + total)
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
               
             <HeaderBlue></HeaderBlue>
                <div className="container-fluid" style={{ marginTop: "-100px" }}  >


                    <div className="col-md-8 bookclass" >

                        <div style={{ marginTop: "9%"}}>
                            <img src={require('../images/beachhouse5.jpg')} height="100px" />&nbsp;
                            <img src={require('../images/beach4.jpg')} height="100px" />&nbsp;
                            <img src={require('../images/beachhouse2.jpg')} height="100px" />
                        </div>

                        <hr></hr>
                        <div><h1>Overview</h1></div>

                        <div className="displayRow">
                            <div id="below">{this.state.property.headline}</div>
                            <div className="belowTitleView"><strong>{this.state.property.location}</strong></div>
                        </div>
                        <br></br>
                        <div className="displayRow">
                            <div className="belowTitleView" style={{ marginRight: "50px" }}>Bedrooms</div>
                            <div className="belowTitleView" style={{ marginRight: "50px" }}>Bathroom</div>

                        </div>
                        <div className="displayRow">
                            <div className="belowTitleView" style={{ marginRight: "60px" }}><strong>{this.state.property.bedroom}</strong></div>
                            <div className="belowTitleView" style={{ marginRight: "60px" }}><strong>{this.state.property.accomodates}</strong></div>
                            <div className="belowTitleView" style={{ marginRight: "60px" }}><strong>{this.state.property.bathroom}</strong></div>
                        </div>

                        <div>{this.state.property.description}</div>
                        <br>
                        </br>
                        <div style={{ marginBottom: "50px" }}>
                            <strong>Amenities: </strong> {this.state.property.amenities}
                        </div>
                    </div>
                    <div className="col-md-1"></div>
                    <form className="form-inline">

                        <div className="col-md-3 sidebarbook" >
                            <strong style={{ fontSize: "20px" }}> {this.state.property.currency}&nbsp;{this.state.property.baseRate}</strong> <span style={{ fontSize: "12px" }}>per night</span>

                            <p></p>
                            <div>
                                Check In
                        </div>
                            <div>
                                <input type="date" name="checkin"  value={this.state.checkin} onChange={this.checkInDateHandler} ></input>
                            </div>
                            <p></p>
                            <div>
                                Check Out
                        </div>
                            <div>
                                <input type="date" name="checkout" value={this.state.checkout} onChange={this.checkOutDateHandler}></input>
                            </div>
                            <p></p>
                            <div>
                                <span></span>
                                Total: {showTotal} {this.state.property.currency}
                            </div>
                            <p></p>
                            <div style={{ marginBottom: "50px" }}>
                                <button type="submit" className="" onClick={this.checkAvailability} >Check Availability</button>
                            </div>
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




const mapStateToProps = state =>{
    //console.log("State", state)
    console.log("State bookproperty data 1...", state.checkin)
    console.log("State bookproperty data 2...", state.checkout)
    return {
        checkin:state.checkin,
        checkout: state.checkout,
    }
}
    // const mapDispatchStateToProps = dispatch => {
    //     return {
    //         onSubmitHandle : (data) => {
    //             axios.post('http://localhost:3001/searchProperty', data,{ withCredentials: true })
    //                 .then((response) => {
    //                         console.log("response fetched ROWS..", response.data.rows)
    //                         dispatch({type: 'SEARCH_RESULTS',payload :response.data.rows, statusCode : response.status})
    //                         console.log("dataaa", data)
    //                         dispatch({type: "SEARCH_PARAMETER", searchData : data})
    //             })
    //         }
    //     }
    // }


export default connect(mapStateToProps,null)(BookProperty);