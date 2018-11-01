import React, { Component } from 'react'
import axios from 'axios';
import Swal from 'sweetalert2';
import cookie from 'react-cookies';
import HeaderOwner from './HeaderOwner';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import {Redirect} from 'react-router'; 

class OwnerDashboard extends Component {
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
        <Redirect to="/ownerlogin" />
        
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
        console.log("user email id fetched from store..",id)
        console.log("OWNER DASHBOARD PAGE ID" + id)
        if (id != null) {
            axios.get("http://localhost:3001/ownersListedProperty?email=" + id)
                .then(function (response) {
                    console.log("response",response)
                    if (response.data.updatedList.rows != null) {
                        console.log("response from backedn",response.data.updatedList.rows);
                        self.setState({
                            data: response.data.updatedList.rows
                        })
                    }
                    if (response.data.updatedList.status === 204) {
                        console.log("hey data is not present");
                        console.log("data" + response.data.updatedList.status)
                        return
                    }
                })
        }
    }
    render() {
        console.log("this.state.data---> ",this.state.data.length)
        let propertytList;
        propertytList = this.state.data.map(property => {
            return (
                <div>

                  
                    <div className="container-fluid" style={{
                        borderRadius: "5px",
                        marginBottom: "20px",
                        width: "90%",
                        backgroundColor: "white",
                       
                        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"

                    }}>
                        <div className="row">
                      
                        
                            <div className="col-sm-2" >
                                {/* <img src={require(`../Components/uploads/${property.images}`)} height="100px" /> */}
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


        if (this.state.data.length>0) {
            return (
                <div>
                    <div className="main-property-div" style={{ backgroundColor: '#f7f7f8' }}>
                   
                        <HeaderOwner />
                        <div className="container-fluid" style={{marginLeft: "50px"}}>
                        <input type="text" name="search" style={{width:"400px"}} placeholder="Search property by name" />
                        <button  class="btn btn-primary">Search</button>
                        </div>
                      
                                
                        <p></p> <p></p>
                        {propertytList}
                    </div>
                </div >
            )
        }
        else{
            return (
                <div>
                     <HeaderOwner />
                    <div className="col-md-10 form-group" style={{ textAlign: "center", margin: "100px" }}>
                        <h2> You Haven't listed anything, Start listing your property.
                                <br></br>
                            <a href="/listYourProperty">Here</a></h2>
                    </div>
                </div >
            )
        }
    }
}


const mapStateToProps = state =>{
    console.log("State auth", state)
    console.log("State user", state.userinfo)
    return {
        authFlag : state.authFlag,
        userinfo : state.user

    }
}

export default connect(mapStateToProps)(OwnerDashboard);