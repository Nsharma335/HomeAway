import React, { Component } from 'react'
import axios from 'axios';
import Swal from 'sweetalert2';

import HeaderBlue from './HeaderBlue';
import Search from './Search';
import { BrowserRouter as Router } from 'react-router-dom';
import {Redirect} from 'react-router'; 
import { connect } from 'react-redux';

class ViewProperty extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
            imagesPreview: []

        };
        this.handleOnClickProperty = this.handleOnClickProperty.bind(this);
    }

    handleOnClickProperty(e) {
        localStorage.setItem('property_id', e.target.dataset.id);
        window.location.href = "http://localhost:3000/bookProperty"
    }

    render() {
        let propertytList;


        propertytList = this.props.searchResults.map(property => {

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

                                {/* <img src={require(`../Components/uploads/${property.images}`)} height="100px" /> */}
                                {/* <img src={this.state.imagesPreview} height="100px" /> */}
                            </div>
                            <div className="col-sm-10 nameview">
                                <div>
                                    <a href="#" onClick={this.handleOnClickProperty} data-id={property.propertyId}> Property {property.propertyId} </a>
                                </div>
                                <div className="displayRow">
                                    <div id="below">{property.headline}</div>
                                    <div className="belowTitleView"><strong>{property.bedroom}</strong> BA|</div>
                                    <div className="belowTitleView"><strong>{property.accomodates}</strong> Sleeps|</div>
                                </div>


                                <div className="priceview">
                                    <span>{property.bathroom}</span> Per night
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
                        <HeaderBlue />
                        <Search />
                        {propertytList}
                    </div>
                </div >
            )

        }

    }
}

const mapStateToProps = state =>{
    //console.log("State", state)
  
    console.log("State in view property searchresults..", state.searchResults)
    return {
        searchResults : state.searchResults
    }
}

export default connect(mapStateToProps)(ViewProperty);