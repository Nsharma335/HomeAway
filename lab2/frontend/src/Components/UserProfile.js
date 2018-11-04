import React, { Component } from 'react'
import HeaderBlue from './HeaderBlue';
import axios from 'axios';
import Swal from 'sweetalert2';
import cookie from 'react-cookies';
import ProfileImageUpload from './ProfileImageUpload';
import { connect } from 'react-redux';
import {Redirect} from 'react-router'; 
import swal from 'sweetalert2'

 class UserProfile extends Component {
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
        // const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        // if (!regex.test(String(this.state.email).toLowerCase())) {
        //     document.getElementById("email-error").innerHTML = "Please enter valid email address";
        //     return false;
        // }
    }
    phoneNumberChangeHandler(e) {
        this.setState({ phoneNumber: e.target.value });
        e.target.value == "" ? document.getElementById("phoneNumber-error").innerHTML = "Please enter your phone number." :
            document.getElementById("phoneNumber-error").innerHTML = "";
        
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
    componentDidMount() {
    console.log("componentWillMount of UserProfile",this.props.authFlag)
    this.loadUserDetails();

    }


    loadUserDetails() {
        console.log("loading details function called...")
        var self = this;
        var id=null;
        let details= this.props.userinfo.map(user=> {
            console.log("inside map email",user.email)
            id = user.email
            
        })
        console.log("user email id fetched from store..",id)
        if (id != null) {
            this.setState({email:id})
            console.log("inside if..")
            axios.defaults.headers.common["Authorization"] = localStorage.getItem("token" );
            axios.get("http://localhost:3001/getUserDetails?email=" + id)
                .then(function (response) {
                    if (response.data.updatedList.rows  != null) {
                        console.log("loadUserDetails loaded with values from db...")
                        let user_detail = response.data.updatedList.rows ;
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

        if (this.props.authFlag) {
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

            let validatePhoneError = !this.validatePhone(this.state.phoneNumber) ? true : false;
            validatePhoneError ? "" : this.props.onSubmitHandle(data)
  
        }
        else{
            swal("You are not logged in, please login to update profile.")
        }
    }

    validatePhone(phone){
    let regex= /^\d{10}$/;
    if(!regex.test(phone))    
        {    
            document.getElementById("phoneNumber-error").innerHTML = "Please enter valid phone number of 10 digits";
            return false;
        }
    return true
    }

    render() {
       
        return (
          
            <React.Fragment>
                <HeaderBlue></HeaderBlue>
                <center><h1>{this.state.firstName}&nbsp;{this.state.lastName}</h1></center>
                <div align="center">
                    <div >
                        {/* <ProfileImageUpload /> */}
                    </div>
                </div>
                <div class="profile-form ">

                    <div class="form-group" style={{
                        marginTop: "-10px"
                    }}
                        align="center" >
                        < div class="user-profile" >
                            <h1>Profile Information</h1>
        
                            <div className="row">
                        <input type="text" class="form-control" onChange={this.firstNameChangeHandler} placeholder={this.state.firstName} name="firstName" />
                    </div>
                    <div id="firstName-error"></div>
                    <div className="row">
                        <input type="text" class="form-control" onChange={this.lastNameChangeHandler} placeholder={this.state.lastName} name="lastName" />
                    </div>
                    <div id="lastName-error"></div>

                            <div className="row">
                                <input type="text" value={this.state.email} class="form-control" name="email" />
                            </div>
                            <div id="email-error"></div>

                            <div className="row">
                                <input type="text" onChange={this.phoneNumberChangeHandler} class="form-control" name="phoneNumber" value={this.state.phoneNumber} placeholder="phone number" />
                            </div>
                            <div id="phoneNumber-error"></div>

                            <div className="row">
                                <textarea class="form-control" onChange={this.commentChangeHandler} rows="5" name="comment" value={this.state.comment} placeholder="About me"></textarea>
                            </div>
                            <div id="comment-error"></div>

                            <div className="row">
                                <input type="text" class="form-control" onChange={this.countryChangeHandler} value={this.state.country} name="country"
                                    placeholder="My City, country" />
                            </div>
                            <div id="country-error"></div>

                            <div class="form-group row">
                                <input type="text" class="form-control" onChange={this.companyChangeHandler} value={this.state.company} name="company"
                                    placeholder="Company" />
                            </div>
                            <div id="company-error"></div>

                            <div class="form-group row">
                                <input otype="text" class="form-control" onChange={this.schoolChangeHandler} value={this.state.school} name="school"
                                    placeholder="School" />
                            </div>
                            <div id="school-error"></div>

                            <div class="form-group row">
                                <input type="text" class="form-control" onChange={this.hometownChangeHandler} value={this.state.hometown} name="hometown"
                                    placeholder="Hometown" />
                            </div>
                            <div id="hometown-error"></div>

                            <div class="form-group row">
                                <input type="text" class="form-control" onChange={this.languagesChangeHandler} value={this.state.languages} name="languages"
                                    placeholder="Languages" />
                            </div>
                            <div id="languages-error"></div>

                            <div class="form-group row">
                                <select className="form-control" name="gender" onChange={this.genderChangeHandler} value={this.state.gender} >
                                    <option value="" disabled selected hidden>Gender</option>
                                    <option value="Female">Female</option>
                                    <option value="Male">Male</option>
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


const mapStateToProps = state =>{
    //console.log("State", state)
    console.log("State header user", state.user)
    return {
        authFlag : state.authFlag,
        userinfo : state.user
  
    }
  }
  const mapDispatchStateToProps = dispatch => {
    return {
        onSubmitHandle : (data) => {
            axios.defaults.headers.common["Authorization"] = localStorage.getItem("token" );
          
            axios.post('http://localhost:3001/updateProfile', data,{ withCredentials: true })
                .then((response) => {
                    console.log("response got from Kafkaa... ",response)
                    // console.log("response retrieval authflag from Kafkaa... ",response.data.updatedList.authFlag)
                    // console.log("response retrieval authflag from Kafkaa... ",response.data.updatedList.user.email)
                    if (response.data.updatedList.status === 200) {
                   
                    swal('Your profile updated successfully.', "Profile updated.", 'success');
                         }
                    if (response.data.updatedList.status === 400) {

                    swal("Please check your fields type", "Not able to update field", 'error');
                        }

                        console.log("response fetched..", response.data.resData)
                        dispatch({type: 'UPDATE_PROFILE',payload :response.data.updatedList, statusCode : response.status})
                      
            })
        }
    }
}
  
  export default connect(mapStateToProps,mapDispatchStateToProps)(UserProfile);