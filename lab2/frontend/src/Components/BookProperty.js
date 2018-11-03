import React, { Component } from 'react'
import axios from 'axios';
import HeaderBlue from './HeaderBlue';
import swal from 'sweetalert2';
import { connect } from 'react-redux';
import TravelerToOwnerMessage from './TravelerToOwnerMessage';

class BookProperty extends Component {
    constructor(props) {
        super(props)
        this.state = {
            property: this.props.location.state.property,
            checkin: "",
            checkout: "",
            totalPrice: 0,
            travelerEmail: "",
            availableFrom: "",
            availableTo: "",
            images:[],
            firstName: "",
            lastName:"",
            email:"",
            message : "",
            photos:[],

        };
     this.bookingProperty = this.bookingProperty.bind(this);
     this.checkInDateHandler=this.checkInDateHandler.bind(this);
     this.checkOutDateHandler=this.checkOutDateHandler.bind(this)
     this.messageHandler=this.messageHandler.bind(this)
     this.sendMessage=this.sendMessage.bind(this)
    }

    checkInDateHandler(e){
        this.setState({
            checkin: e.target.value
        })
    }

    checkOutDateHandler(e){
        this.setState({
            checkout: e.target.value
        })
    }
    messageHandler(e){
        this.setState({
            message: e.target.value
        }) 
    }

    CalculateDays(date1, date2) {
        //Get 1 day in milliseconds

        var one_day = 1000 * 60 * 60 * 24;
        console.log("one day",one_day)
        // Convert both dates to milliseconds
        var date1_ms = date1.getTime();
        console.log("date1_ms->",date1_ms)
        var date2_ms = date2.getTime();
        console.log("date2_ms->",date2_ms)

        // Calculate the difference in milliseconds
        var difference_ms = date2_ms - date1_ms;
        console.log("difference_ms->",difference_ms)
        // Convert back to days and return
        console.log("round math",Math.round(difference_ms / one_day))
        return Math.round(difference_ms / one_day);
    }

    bookingProperty(e) {
     if(this.props.authFlag){
        e.preventDefault();
        var id=null;
        let details= this.props.userinfo.map(user=> {
            if(user!=null){
            console.log("inside map email",user.email)
            id = user.email
            }
        })

        console.log("property in booking",this.state.property)
        const data = {
           propertyId: this.state.property._id,
           travelerEmail: id,
           checkin: this.state.property.availableFrom,
           checkout: this.state.property.availableTo,
           totalPrice: this.state.totalPrice 
        }
        console.log("pass data",data)

        this.props.onSubmitHandle(data)
        }
    }

componentWillMount(){
    console.log("this.state.checkin did mount",this.state.property.availableFrom)
    console.log("this.state.checkout did mount",this.state.property.availableTo)
    var total = 0;
    var checkin = new Date(this.state.property.availableFrom);
    var checkout = new Date(this.state.property.availableTo);
    var noOfdays = this.CalculateDays(checkin, checkout);
    console.log("no of days",noOfdays)
    console.log("checkin value variable" + checkin)
    console.log("checkout value variable" + checkout)
    total = this.state.property.baseRate * noOfdays;
    //var showTotal;
    console.log("state price total" + this.state.totalPrice)
    console.log("total calculated" + total)
    if (!isNaN(total)) { 
        this.setState({
        totalPrice : total
        })
    }

}

componentDidMount(){
    console.log("did mount",this.state.property.images)
    let details= this.props.userinfo.map(user=> {
        if(user!=null){
        console.log("inside map email",user.email)
        this.setState({
            firstName:user.firstName,
            lastName:user.lastName,
            email:user.email
        })
        }
    })

    var files=[];
    if(this.state.property.images.length>0){
    files=this.state.property.images.split(",");

    axios.post('http://localhost:3001/download/'+files).then(response=>
    {
    console.log("response",response)
    let imageArr = []
    for (let i = 0; i < response.data.length; i++) {
      let imagePreview = 'data:image/jpg;charset=utf-8;base64, ' + response.data[i];
                            imageArr.push(imagePreview);
                            const photoArr = this.state.photos.slice();
                            photoArr[i] = imagePreview;
                            this.setState({
                                photos: photoArr
                            });
                            console.log('Photo State: ', this.state.photos);
              }
    })

}
}

sendMessage(){

    var data={
        propertyData: this.state.property,
        firstName:this.state.firstName,
        lastName:this.state.lastName,
        travelerEmail : this.state.email,
        message : this.state.message
    }
    axios.post('http://localhost:3001/sendMessageToOwner',data).then(response=>
    {
        console.log("response",response)
    })
}

renderImage()
{
    
}

render() {
    var imagelist=null
    if(this.state.photos.length>0)
    {
       console.log("if image",this.state.photos)
       imagelist= this.state.photos.map(photo=>
            {
            return(
        <img src={photo} width="150px" height="150px" style={{marginRight:"20px"}}></img>
                )
    })
    }
    else{
        console.log("else image")  
             imagelist=<img src= { require('../images/default-property.png') } width="150px" height="150px" ></img>
    }

        return (
            <div>
             <HeaderBlue></HeaderBlue>
            
                <div className="container-fluid" style={{ marginTop: "-100px" }}  >
               
                    <div className="col-md-8 bookclass" >

                        <div>
                      {imagelist}
                        </div>
                        <hr></hr>
                        <div><h1>Overview</h1></div>

                        <div className="displayRow">
                            <div id="below">{this.state.property.headline}</div>
                            <div className="belowTitleView"><strong>{this.state.property.location}</strong></div>
                        </div>
                        <br></br>
                        <div className="displayRow">
                            <div className="belowTitleView" style={{ marginRight: "50px" }}>Bedrooms</div>
                            <div className="belowTitleView" style={{ marginRight: "50px" }}>Bathroom</div>

                        </div>
                        <div className="displayRow">
                            <div className="belowTitleView" style={{ marginRight: "60px" }}><strong>{this.state.property.bedroom}</strong></div>
                            <div className="belowTitleView" style={{ marginRight: "60px" }}><strong>{this.state.property.accomodates}</strong></div>
                            <div className="belowTitleView" style={{ marginRight: "60px" }}><strong>{this.state.property.bathroom}</strong></div>
                        </div>

                        <div>{this.state.property.description}</div>
                        <br>
                        </br>
                        <div style={{ marginBottom: "50px" }}>
                            <strong>Amenities: </strong> {this.state.property.amenities}
                        </div>
                    </div>
                    <div className="col-md-1"></div>
                    <form className="form-inline">

                        <div className="col-md-3 sidebarbook" >
                            <strong style={{ fontSize: "20px" }}> {this.state.property.currency}&nbsp;{this.state.property.baseRate}</strong> <span style={{ fontSize: "12px" }}>per night</span>

                            <p></p>
                           <div>
                                Check In
                        </div>
                            <div>
                                <input type="date" name="checkin"  value={localStorage.getItem("checkin")} onChange={this.checkInDateHandler} ></input>
                            </div>
                            <p></p>
                            <div>
                                Check Out 
                        </div>
                            <div>
                                <input type="date" name="checkout" value={localStorage.getItem("checkout")} onChange={this.checkOutDateHandler}></input>
                            </div>
                            <p></p>
                            <div>
                                <span></span>
                                Total: {this.state.totalPrice} {this.state.property.currency}
                            </div>
                            <p></p>


                            <div style={{ marginBottom: "50px" }}>
                                <button type="submit" className="btn" onClick={this.bookingProperty} >Book Now </button>
                            </div>
                            <TravelerToOwnerMessage sender={this.state.email} receiver ={this.state.property.owner} senderFirstName={this.state.firstName} senderLastName={this.state.lastName}></TravelerToOwnerMessage>

                        </div>
                    </form>
                </div>
              
            </div >
        );

   }
}

const mapStateToProps = state =>{
    //console.log("State", state)
    console.log("State bookproperty data 1...", state.checkin)
    console.log("State bookproperty data 2...", state.checkout)
    return {
        checkin:state.checkin,
        checkout: state.checkout,
        userinfo :state.user,
        authFlag : state.authFlag,
    }
}
    const mapDispatchStateToProps = dispatch => {
        return {
            onSubmitHandle : (data) => {
                axios.post('http://localhost:3001/bookingProperty', data)
                .then((response) => {
                    // window.location.href = "http://localhost:3000/dashboard";
                    console.log("resposne is ",response)
                    if (response.data.updatedList.status === 201) {
                        swal('Booked Successfully.!', "Your Booking is done.", 'success');
    
                    } 

                    console.log("response fetched..", response.data.updatedList)
                    dispatch({type: 'BOOKING_INFO', statusCode : response.data.updatedList.status})
                });
            }
        }
    }


export default connect(mapStateToProps,mapDispatchStateToProps)(BookProperty);