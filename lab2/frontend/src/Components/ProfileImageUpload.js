import React, { Component } from 'react';
import axios from 'axios';

class ProfileImageUpload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            description: '',
            selectedFile: '',
            imageView: ''
        };
    }
    onChange = (e) => {
        if (e.target.name == 'selectedFile') {
            this.setState({
                selectedFile: e.target.files[0]
            })
        } else {
            this.setState({ [e.target.name]: e.target.value });
        }
    }

    onSubmit = (e) => {
        e.preventDefault();
        const { description, selectedFile } = this.state;
        let formData = new FormData();

        formData.append('description', description);
        formData.append('selectedFile', selectedFile);

        axios.post('http://localhost:3001/profilePhoto', formData)
            .then((response) => {
                console.log("here is the response body")
                console.log(response.body)
                console.log("here is the response data")
                console.log(response.data)
            });

    }
    componentDidMount() {
        this.loadImageNameFromServer();
    }


    loadImageNameFromServer = (e) => {
        axios.post('http://localhost:3001/download/' + 'test.jpeg')
            .then(response => {
                console.log("Imgae Response Data : ", response.data);
                let imagePreview = 'data:image/jpeg;base64, ' + response.data;
                this.setState({
                    imageView: imagePreview
                })
                console.log("imageview")
                console.log(this.state.imageView)
            });
    }
    render() {
        const { description, selectedFile } = this.state;
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    {/* <input
                        type="text"
                        name="description"
                        value={description}
                        onChange={this.onChange}
                        multiple /> */}

                    <img src={this.state.imageView} height="200px" width="200px" style={{ border: "3px solid grey" }} />
                    {/* <img src={require(this.state.imageView)} height="200px" width="200px" /> */}
                    <input
                        type="file"
                        name="selectedFile"
                        onChange={this.onChange}
                    />
                    <p></p>
                    <button type="submit">Upload Profile Pic</button>
                </form>
                {/* <div>
                    <button onClick={this.handleGetPhoto}>Get Photo</button>
                </div> */}
                <p></p>
                <div>
                </div>

            </div>
        )
    }
}

export default ProfileImageUpload;
