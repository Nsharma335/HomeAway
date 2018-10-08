import React, { Component } from 'react'
import axios from 'axios';
import Swal from 'sweetalert2';

import HeaderBlue from './HeaderBlue';
import Search from './Search';
import { BrowserRouter as Router } from 'react-router-dom';




export default class ViewProperty extends Component {
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

    async componentDidMount() {
        var self = this;
        const data = {
            location: localStorage.getItem("location"), checkin: localStorage.getItem("checkin"),
            checkout: localStorage.getItem("checkout"), guests: localStorage.getItem("guests")
        };
        console.log("sending data" + JSON.stringify(data));
        axios.post("http://localhost:3001/searchProperty", data)
            .then(async (response) => {
                var imagesnames = response.data;
                for (var i = 0; i < imagesnames; i++) {
                    var images = imagesnames[i];

                    var splitImage = images.split(',');
                    console.log("splited" + splitImage);
                    var joinimage = [];
                    joinimage.length = 0;
                    for (var j = 0; j < splitImage.length; j++) {
                        await axios.post('http://localhost:3001/download/' + splitImage)
                            .then(async (response) => {

                                var imagePreview = 'data:image/jpeg;base64, ' + response.data;
                                joinimage.push(imagePreview);
                                images = imagePreview
                                this.setState({ imagesPreview: images })
                                console.log(joinimage)
                            });
                    }
                    imagesnames[i].images = images
                }

                console.log("array of files" + imagesnames);
                if (response.data.rows != null) {
                    console.log(response);
                    self.setState({
                        data: response.data.rows
                    })
                }
                if (response.status === 204) {
                    console.log("hey data is not present");
                    console.log(response)
                    Swal('No Results Found', response.data.message, 'error');

                }
            })

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