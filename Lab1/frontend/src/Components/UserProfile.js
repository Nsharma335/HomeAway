import React, { Component } from 'react'
import HeaderBlue from './HeaderBlue';
import axios from 'axios';
import Swal from 'sweetalert2';
import cookie from 'react-cookies';
import ProfileImageUpload from './ProfileImageUpload';

export default class componentName extends Component {
    constructor(props) {
        super(props)
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: "",
            comment: "",
            country: "",
            company: "",
            school: "",
            hometown: "",
            languages: "",
            gender: ""
        }

        this.loadUserDetails = this.loadUserDetails.bind(this);
        this.saveChanges = this.saveChanges.bind(this);
        this.firstNameChangeHandler = this.firstNameChangeHandler.bind(this);
        this.lastNameChangeHandler = this.lastNameChangeHandler.bind(this);
        this.emailChangeHandler = this.emailChangeHandler.bind(this);
        this.phoneNumberChangeHandler = this.phoneNumberChangeHandler.bind(this);
        this.commentChangeHandler = this.commentChangeHandler.bind(this);
        this.countryChangeHandler = this.countryChangeHandler.bind(this);
        this.companyChangeHandler = this.companyChangeHandler.bind(this);
        this.schoolChangeHandler = this.schoolChangeHandler.bind(this);
        this.hometownChangeHandler = this.hometownChangeHandler.bind(this);
        this.languagesChangeHandler = this.languagesChangeHandler.bind(this);
        this.genderChangeHandler = this.genderChangeHandler.bind(this);
    }

    firstNameChangeHandler(e) {
        this.setState({ firstName: e.target.value });
        e.target.value == "" ? document.getElementById("firstName-error").innerHTML = "Please enter your first name." :
            document.getElementById("firstName-error").innerHTML = "";
    }
    lastNameChangeHandler(e) {
        this.setState({ lastName: e.target.value });
        e.target.value == "" ? document.getElementById("lastName-error").innerHTML = "Please enter your last name." :
            document.getElementById("lastName-error").innerHTML = "";
    }
    emailChangeHandler(e) {
        this.setState({ email: e.target.value });
        e.target.value == "" ? document.getElementById("email-error").innerHTML = "Please enter your email address." :
            document.getElementById("email-error").innerHTML = "";
        const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!regex.test(String(this.state.email).toLowerCase())) {
            document.getElementById("email-error").innerHTML = "Please enter valid email address";
            return false;
        }
    }
    phoneNumberChangeHandler(e) {
        this.setState({ phoneNumber: e.target.value });
        e.target.value == "" ? document.getElementById("phoneNumber-error").innerHTML = "Please enter your phone number." :
            document.getElementById("phoneNumber-error").innerHTML = "";
        const regex = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/;
        if (!regex.test(String(this.state.phoneNumber))) {
            document.getElementById("phoneNumber-error").innerHTML = "Please enter valid phone number.";
            return false;
        }
    }
    commentChangeHandler(e) {
        this.setState({ comment: e.target.value });
    }
    countryChangeHandler(e) {
        this.setState({ country: e.target.value });
    }
    companyChangeHandler(e) {
        this.setState({ company: e.target.value });
    }
    schoolChangeHandler(e) {
        this.setState({ school: e.target.value });
    }
    hometownChangeHandler(e) {
        this.setState({ hometown: e.target.value });
    }
    languagesChangeHandler(e) {
        this.setState({ languages: e.target.value });
    }
    genderChangeHandler(e) {
        this.setState({ gender: e.target.value });
    }
    componentWillMount() {
        if (cookie.load("cookieName") == undefined) {
            window.location.href = "http://localhost:3000/";
        }
        else {
            this.loadUserDetails();
        }
    }

    loadUserDetails() {
        var self = this;

        var cookievalue = cookie.load("cookieName");
        var jsonobject = cookievalue.substring(2);
        var parsedObject = JSON.parse(jsonobject);
        var id = parsedObject.user_email;
        if (id != null) {
            axios.get("http://localhost:3001/getUserDetails?email=" + id)
                .then(function (response) {
                    if (response.data.rows != null) {
                        console.log("if row returned from get user , come here")
                        let user_detail = response.data.rows;
                        console.log("response data email->" + response.data.rows.email);
                        console.log("email from user_detail->" + user_detail.email);
                        self.setState({
                            email: user_detail.email,
                            firstName: user_detail.firstName,
                            lastName: user_detail.lastName,
                            phoneNumber: user_detail.phoneNumber == null ? "" : user_detail.phoneNumber,
                            comment: user_detail.comment == null ? "" : user_detail.comment,
                            country: user_detail.country == null ? "" : user_detail.country,
                            company: user_detail.company == null ? "" : user_detail.company,
                            school: user_detail.school == null ? "" : user_detail.school,
                            hometown: user_detail.hometown == null ? "" : user_detail.hometown,
                            languages: user_detail.languages == null ? "" : user_detail.languages,
                            gender: user_detail.gender == null ? "" : user_detail.gender
                        })
                        return;
                    }
                    return;
                })
        }
    }

    saveChanges = e => {

        if (cookie.load('cookieName')) {
            e.preventDefault();
            console.log("inside submit login from client side..")
            const data = {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email: this.state.email,
                phoneNumber: this.state.phoneNumber,
                comment: this.state.comment,
                country: this.state.country,
                company: this.state.company,
                school: this.state.school,
                hometown: this.state.hometown,
                languages: this.state.languages,
                gender: this.state.gender
            };
            console.log(data);
            axios.post('http://localhost:3001/updateProfile', data, { withCredentials: true })
                .then(response => {
                    console.log("Status Code : ", response.status);
                    if (response.data.success) {
                        console.log("success")
                        this.setState({
                            authFlag: true

                        });
                        Swal('Updated Profile.', "Your profile has been updated successfully!", 'success');
                        this.props.history.push('/userProfile');
                    } else {
                        console.log("error")
                        this.setState({
                            authFlag: false
                        })
                        Swal('Oops...', response.data.message, 'error');
                    }
                });
        }
    }

    renderPopulatedData() {
        console.log("render population")
        if (cookie.load('cookieName')) {
            return (
                <div>
                    <div className="row">
                        <input type="text" class="form-control" onChange={this.firstNameChangeHandler} placeholder={this.state.firstName} name="firstName" />
                    </div>
                    <div id="firstName-error"></div>
                    <div className="row">
                        <input type="text" class="form-control" onChange={this.lastNameChangeHandler} placeholder={this.state.lastName} name="lastName" />
                    </div>
                    <div id="lastName-error"></div>
                </div>
            )
        }
        else {
            return (
                <div>
                    <div>
                        <input type="text" onChange={this.firstNameChangeHandler} class="form-control" name="firstName" />
                    </div>
                    <div id="firstName-error"></div>

                    <div>
                        <input type="text" onChange={this.lastNameChangeHandler} class="form-control" name="lastName" />
                    </div>
                    <div id="lastName-error"></div>
                </div >
            )
        }
    }

    render() {
        return (
            <React.Fragment>
                <HeaderBlue></HeaderBlue>
                <center><h1>{this.state.firstName}&nbsp;{this.state.lastName}</h1></center>
                <div align="center">
                    <div >
                        <ProfileImageUpload />
                    </div>
                </div>
                \

                <div class="profile-form ">

                    <div class="form-group" style={{
                        marginTop: "-10px"
                    }}
                        align="center" >
                        < div class="user-profile" >
                            <h1>Profile Information</h1>
                            {this.renderPopulatedData()}
                            <div className="row">
                                <input type="text" onChange={this.emailChangeHandler} class="form-control" name="email" value={this.state.email} />
                            </div>
                            <div id="email-error"></div>

                            <div className="row">
                                <input type="text" onChange={this.phoneNumberChangeHandler} class="form-control" name="phoneNumber" placeholder="phone number" />
                            </div>
                            <div id="phoneNumber-error"></div>

                            <div className="row">
                                <textarea class="form-control" onChange={this.commentChangeHandler} rows="5" name="comment" placeholder="About me"></textarea>
                            </div>
                            <div id="comment-error"></div>

                            <div className="row">
                                <input type="text" class="form-control" onChange={this.countryChangeHandler} name="country"
                                    placeholder="My City, country" />
                            </div>
                            <div id="country-error"></div>

                            <div class="form-group row">
                                <input type="text" class="form-control" onChange={this.companyChangeHandler} name="company"
                                    placeholder="Company" />
                            </div>
                            <div id="company-error"></div>

                            <div class="form-group row">
                                <input otype="text" class="form-control" onChange={this.schoolChangeHandler} name="school"
                                    placeholder="School" />
                            </div>
                            <div id="school-error"></div>

                            <div class="form-group row">
                                <input type="text" class="form-control" onChange={this.hometownChangeHandler} name="hometown"
                                    placeholder="Hometown" />
                            </div>
                            <div id="hometown-error"></div>

                            <div class="form-group row">
                                <input type="text" class="form-control" onChange={this.languagesChangeHandler} name="languages"
                                    placeholder="Languages" />
                            </div>
                            <div id="languages-error"></div>

                            <div class="form-group row">
                                <select className="form-control" name="gender" onChange={this.genderChangeHandler} >
                                    <option value="" disabled selected hidden>Gender</option>
                                    <option value="0">Female</option>
                                    <option value="1">Male</option>
                                </select>
                            </div>
                            <div id="gender-error"></div>
                            <p></p>
                            <div id="error" class="error"></div>
                            <p></p>
                            <div className="row">
                                <button onClick={this.saveChanges} class="btn btn-primary">Save changes</button></div>
                        </div>
                    </div >
                </div >

            </React.Fragment >
        )
    }

}
