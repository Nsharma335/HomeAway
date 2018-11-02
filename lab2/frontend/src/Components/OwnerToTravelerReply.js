import React, { Component } from 'react'
import axios from 'axios';
import swal from 'sweetalert2'
import { connect } from 'react-redux';

class OwnerToTravelerReply extends Component {
    constructor(props) {
        super(props)
        this.state = {
            receiver:"",
            message:"",
            sender:"",
            senderFirstName:"",
            senderLastName:"",
        }
        this.receiverStateHandler = this.receiverStateHandler.bind(this);
        this.messageHandler = this.messageHandler.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        
    }
    receiverStateHandler(e){
        this.setState({receiver: e.target.value})
    }
    messageHandler(e){
        this.setState({ message: e.target.value });
    }


    sendMessage(){
        let details= this.props.userinfo.map(user=> {
            if(user!=null){
            console.log("inside map email",user.email)
            this.setState({
                senderFirstName:user.firstName,
                senderLastName:user.lastName,
            })
            }
        })
        var data= {
            receiver: this.state.receiver,
            sender:this.props.sender,
            message:this.state.message,
            senderFirstName:this.state.senderFirstName,
            senderLastName:this.state.senderLastName
        
        }
        console.log("data to be sent from compnent",data)
        axios.post('http://localhost:3001/sendMessage',data).then(response=>
        {
            console.log("response",response.data.updatedList.status)
            if(response.data.updatedList.status==200)
            {
                swal('Your message has been sent successfully', "Your message has been sent successfully", 'success');
            }
            else{
                swal("Sorry, couldn't send your message", "please try again", 'error');
            }
        })
            }

  render() {
    return (
        <div>
  <div class="container">
  
  <button type="button" class="btn-primary " data-toggle="modal" data-target="#myModal" style={{ marginBottom: "50px" }}>
  Reply</button>
  
  
  <div class="modal fade" id="myModal" role="dialog">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h4 class="modal-title">Reply to Traveler</h4>
        </div>
        <div>
           </div>
                      <div >
                      &nbsp; <span> Receipent's email address </span>&nbsp;
                          <input type="text" class="form-control" onChange={this.receiverStateHandler} value={this.state.receiver} name="lastName" />
                      </div>
                      <p> </p>
                      <div >
                      &nbsp; <span> Sender's email address </span>&nbsp; &nbsp; &nbsp;
                          <input type="text" class="form-control" value={this.props.sender} name="lastName" />
                      </div>
  
          
        <div class="modal-body">
        <textarea rows="5" name="message" placeholder="Type your message here"  onChange={this.messageHandler} value={this.state.message} style={{width:"500px"}}></textarea>
        </div>
        <div class="modal-footer">
          <button type="button" onClick={this.sendMessage} class="btn btn-default" >Send</button>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        </div>
      </div>
      
    </div>
  </div>
  
  </div>
        </div>
      )
  }
}

const mapStateToProps = state =>{
    //console.log("State", state)
    console.log("State bookproperty data 1...", state.checkin)
    console.log("State bookproperty data 2...", state.checkout)
    return {
        userinfo :state.user,
        authFlag : state.authFlag,
    }
}

export default connect(mapStateToProps)(OwnerToTravelerReply);