import React, { Component } from 'react'
import axios from 'axios';
import Swal from 'sweetalert2';
import cookie from 'react-cookies';
import HeaderOwner from './HeaderOwner';
import Moment from 'react-moment';


export default class OwnerDashboard extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
            message: ""
        };
    }
    componentWillMount() {

    }

    componentDidMount() {
        if (cookie.load("cookieName"))
            this.loadOwnerPropertyDetails();
        else
            window.location.href = "http://localhost:3000/ownerlogin";
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
            axios.get("http://localhost:3001/ownersListedProperty?email=" + id)
                .then(function (response) {
                    if (response.data.rows != null) {
                        console.log(response);
                        self.setState({
                            data: response.data.rows
                        })
                    }
                    if (response.status === 204) {
                        console.log("hey data is not present");
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
                            <div className="col-sm-2" >
                                <img src={require(`../Components/uploads/${property.images}`)} height="100px" />
                            </div>
                            <div className="col-sm-10 nameview">
                                <div>
                                    <a href="#" onClick={this.handleOnClickProperty} data-id={property.propertyId}> {property.propertyId} </a>
                                </div>
                                <div className="displayRow">
                                    <div id="below">{property.headline}</div>
                                    <div className="belowTitleView"><strong>{property.bedroom}</strong> BHK accomodates by </div>
                                    <div className="belowTitleView"><strong>{property.accomodates}</strong> people</div>
                                </div>


                                <div className="priceview">
                                    <span>{property.baseRate}&nbsp;{property.currency}</span> Per night
                         </div>
                                <div>
                                    Avialable from : <Moment format="MM/DD/YYYY">{property.availableFrom}</Moment>
                                </div>
                                <div>
                                    Avialable To : <Moment format="MM/DD/YYYY">{property.availableTo}</Moment>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            );
        });


        if (this.state.data != null) {
            return (

                <div>
                    <div className="main-property-div" style={{ backgroundColor: '#f7f7f8' }}>
                        <HeaderOwner />
                        {propertytList}
                    </div>
                </div >
            )


        }

        else {
            console.log("inside undefined block")
            return (
                <div>
                    <HeaderOwner />
                    <div className="col-md-10 form-group" style={{ textAlign: "center", margin: "100px" }}>
                        <h2> You Haven't listed anything, Start listing your property.
                                <br></br>
                            <a href="/listYourProperty">Here</a></h2>

                    </div>
                </div>
            )
        }
    }
}
