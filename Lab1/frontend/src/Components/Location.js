import React, { Component } from 'react'
import axios from 'axios';

export default class Location extends Component {
    constructor() {
        super();
        this.state = {
            address: "",
            selectedFiles: [],
        }
        this.saveAndContinue = this.saveAndContinue.bind(this);
        this.handleAddressStateChange = this.handleAddressStateChange.bind(this);
        this.onFileStateChange = this.onFileStateChange.bind(this);
        this.uploadToServer = this.uploadToServer.bind(this);
    }

    onFileStateChange(e) {
        var self = this;
        var selected = self.state.selectedFiles;
        if (e.target.name == 'selectedFile') {
            console.log("selected files are..." + e.target.files)
            var combineFiles = selected.concat(...e.target.files);
            console.log(combineFiles)
            self.setState({ selectedFiles: combineFiles });
        }
        else {
            this.setState({ [e.target.name]: e.target.value });
        }
        console.log("After combination of file array")
        console.log(this.state.selectedFiles.length)

    }

    handleAddressStateChange(e) {
        this.setState({ address: e.target.value });
        e.target.value == "" ? document.getElementById("address-error").innerHTML = "Please enter the address" :
            document.getElementById("address-error").innerHTML = "";
    }

    saveAndContinue(e) {
        e.preventDefault()
        console.log("My files states")
        console.log(this.state.selectedFiles)
        var data = {
            address: this.state.address,
        }
        console.log("data is " + JSON.stringify(data));
        console.log("field");
        this.props.saveFields(data);
        this.props.nextStep();
        var files = this.state.selectedFiles

    }


    uploadToServer(e) {
        e.preventDefault();
        const { selectedFiles } = this.state;
        console.log("inside uplaod" + this.state.selectedFiles)
        let formData = new FormData();
        formData.append('first', this.state.selectedFiles[0]);
        formData.append("second", this.state.selectedFiles[1]);
        formData.append("third", this.state.selectedFiles[2]);
        formData.append("forth", this.state.selectedFiles[3]);
        formData.append("fifth", this.state.selectedFiles[4]);
        console.log("formData", formData);

        axios.post('http://localhost:3001/multipleImage', formData)
            .then((response) => {
                console.log("here is the response body")
                console.log(response.body)
                console.log("here is the response data")
                console.log(response.data)
            });
    }


    render() {
        return (
            <div>
                <div class="container" style={{ backgroundColor: "#eee" }}>

                    <div>
                        <div class="main-div" >
                            <h1 style={{ fontSize: "20px" }}>Address</h1>
                            <input onChange={this.handleAddressStateChange} type="text" class="form-control" name="address"
                                placeholder="Address" required="true" required="true" />
                            <div id="address-error" class="error"></div>
                            <p></p>
                            <p></p>
                            <p></p>
                            <hr></hr>
                            <p></p>
                            <h1 style={{ fontSize: "20px" }}>Property photos</h1>

                            <form onSubmit={this.uploadToServer}>

                                <input
                                    type="file"
                                    enctype="multipart/form-data"
                                    name="selectedFile"
                                    onChange={this.onFileStateChange}
                                    multiple
                                />
                                <p></p>
                                <button type="submit">Upload property photos</button>
                            </form>

                            <p></p>
                            <button className="btn-primary form-group" onClick={this.saveAndContinue}>Next</button>
                        </div>


                    </div>
                </div>
            </div>
        )
    }
}
