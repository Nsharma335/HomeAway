import React, { Component } from 'react'
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link } from "react-router-dom";
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
            imagesPreview: [],

        };
       // this.handleOnClickProperty = this.handleOnClickProperty.bind(this);
    }

    // handleOnClickProperty(e) {
    //     localStorage.setItem('property_id', e.target.dataset.id);
    //     var id=e.target.dataset.id;
    //     this.props.onSubmitHandle(id)
    //    // <Redirect to="/bookProperty" />
    //    // window.location.href = "http://localhost:3000/bookProperty"
    // }
  
   
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
                                    {/* <Link to={} data-id={property._id}> Property {property._id} </Link> */}
                                    <Link  to={{
                                        pathname: "/bookProperty",
                                         state: {
                                             property: property
                                             }
                                             }} 
                                             role="button">{property.headline}</Link>
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
        searchResults : state.searchResults,
     
    }
}

// const mapDispatchStateToProps = dispatch => {
//     return {
//         onSubmitHandle : (data) => {
                        
//             dispatch({type: 'USER_INFO',payload :data})
//         }
//     }
// }

export default connect(mapStateToProps,null)(ViewProperty);