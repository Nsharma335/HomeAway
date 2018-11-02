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
     console.log("file selected..",e.target.files)
     this.setState({selectedFiles: e.target.files})
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
            selectedFiles:this.state.selectedFiles
        }
        console.log("data is " + JSON.stringify(data));
        console.log("field");
        this.props.saveFields(data);
        let validateAddressError = !this.validateAddress(this.state.address) ? true : false;
        validateAddressError ? "" : this.props.nextStep();
    }


    uploadToServer(e) {
        e.preventDefault();
        const { selectedFiles } = this.state;
        console.log("inside uplaod" , this.state.selectedFiles)
        let formData = new FormData();
       const files=this.state.selectedFiles;
       for(var i=0;i<files.length;i++){
           formData.append("files",files[i]);
       }
        console.log("formData", formData);

        axios.post('http://localhost:3001/upload', formData)
            .then((response) => {
                console.log("here is the response body")
                console.log(response.body)
                console.log("here is the response data")
                console.log(response.data)
            });
    }

    validateAddress(address){
        if (address.trim() == "") {
            document.getElementById("address-error").innerHTML = "Please enter the address";
            return false;
        }
        return true;
    }

    render() {
        return (
            <div>
                <div class="container" style={{ backgroundColor: "#eee" }}>

                    <div>
                        <div class="main-div" style={{   boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}>
                            <h1 style={{ fontSize: "20px" }}>Address</h1>
                            <input onChange={this.handleAddressStateChange} value={this.state.address} type="text" class="form-control" name="address"
                                placeholder="Address"  />
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
