import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Redirect} from 'react-router'; 
import { connect } from 'react-redux';
import axios from 'axios';
import Swal from 'sweetalert2'
import { stat } from 'fs';
import swal from 'sweetalert2'

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            location: "",
            checkin: "",
            checkout: "",
            guests: "",
            data: [],
        };
        this.saveFormData = this.saveFormData.bind(this);
        this.locationChangeHandler = this.locationChangeHandler.bind(this);
        this.checkInHandler = this.checkInHandler.bind(this);
        this.checkOutHandler = this.checkOutHandler.bind(this);
        this.guestHandler = this.guestHandler.bind(this);
    }
    componentDidMount() {
        // Remember state for the next mount
     this.setState({location : localStorage.getItem("location")})
     this.setState({checkin : localStorage.getItem("checkin")})
     this.setState({checkout : localStorage.getItem("checkout")})
     this.setState({guests : localStorage.getItem("guests")})
    //console.log("here the location is ",this.state.location)
      }
    

    locationChangeHandler(e) {
        console.log("state location")
        this.setState({
            location: e.target.value
        })
        console.log("location" + this.state.location)
    }

    checkInHandler(e) {
        console.log("state location")
        this.setState({
            checkin: e.target.value
        })
        console.log("location" + this.state.checkin)
    }
    checkOutHandler(e) {
        console.log("state location")
        this.setState({
            checkout: e.target.value
        })
        console.log("location" + this.state.checkout)
    }
    guestHandler(e) {
        console.log("state location")
        this.setState({
            guests: e.target.value
        })
        console.log("location" + this.state.guests)
    }

    saveFormData(e) {
        e.preventDefault();
        var data= {
            location : this.state.location,
            checkin :this.state.checkin,
            checkout : this.state.checkout,
            guests : this.state.guests
        }
        this.props.onSubmitHandle(data)
        localStorage.setItem("checkin",this.state.checkin)
        localStorage.setItem("checkout",this.state.checkout)
        localStorage.setItem("location",this.state.location)
        localStorage.setItem("guests",this.state.guests )
    }


    render() {
        let redirect=null;
        if(this.props.searchedProperty)
        {
            redirect = <Redirect to="/viewProperty" />
        }
        return (
            <div>
                {redirect}
                <form className="form-inline" style={{ marginBottom: "200px" }}>
                    <div className="form-group form-group-lg">
                        <input type="text" onChange={this.locationChangeHandler} className="form-control" value={this.state.location} name="location" placeholder="Where do you want to go?" style={{ width: "350px" }}></input>
                    </div>
                    <div className="form-group form-group-lg">
                        <input type="date" onChange={this.checkInHandler} className="form-control" value={this.state.checkin} name="checkin" placeholder="Arrive" style={{ width: "195px" }}></input>
                    </div>
                    <div className="form-group form-group-lg">
                        <input type="date" onChange={this.checkOutHandler} className="form-control" value={this.state.checkout} name="checkout" placeholder="Depart" style={{ width: "195px" }}></input>
                    </div>
                    <div className="form-group form-group-lg">
                        <input type="text" onChange={this.guestHandler} className="form-control" value={this.state.guests} name="guests" placeholder="Guests" style={{ width: "100px", }}></input>
                    </div>
                    <button type="submit" className="btn btn-lg" onClick={this.saveFormData}>Search </button>
                
                </form>
            </div>
        )
    }
}


const mapStateToProps = state =>{
    //console.log("State", state)
    console.log("State serachdetails data 1...", state.searched)
    console.log("State serachdetails data 2...", state.location)
    return {
        searchedProperty : state.searched,
        location: state.location,
        checkin:state.checkin,
        checkout: state.checkout,
        guests: state.checkout
    }
}
    const mapDispatchStateToProps = dispatch => {
        return {
            onSubmitHandle : (data) => {
               let self=this;
                axios.post('http://localhost:3001/searchProperty', data,{ withCredentials: true })
                    .then((response) => {
                            console.log("response fetched ROWS..", response.data.updatedList)
                            if(response.data.updatedList.status==204)
                            {
                                swal('There is no property with this criteria.', "No results", 'error');
                            }
                           //self.setState({data: response.data.updatedList.rows })
                           console.log("rows",response.data.updatedList.rows)

                            dispatch({type: 'SEARCH_RESULTS',payload :response.data.updatedList.rows, statusCode : response.data.updatedList.status})
                            console.log("dataaa", data)
                            dispatch({type: "SEARCH_PARAMETER", searchData : data})
                })
            }
        }
    }


export default connect(mapStateToProps,mapDispatchStateToProps)(Search);
