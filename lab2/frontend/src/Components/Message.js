import React, { Component } from 'react'
import axios from 'axios';
import swal from 'sweetalert2'

export default class Message extends Component {
    constructor(props) {
        super(props)
        this.state = {
            recipientEmail:"",
            senderEmail:"",
            message:"",
            senderFirstName:"",
            senderLastName:"",
        }
        this.messageHandler = this.messageHandler.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
    }

    messageHandler(e){
        this.setState({ message: e.target.value });
        console.log("message",this.state.message)
        this.setState({recipientEmail : this.props.receiver})
        console.log("recipientEmail",this.state.recipientEmail)
        this.setState({senderEmail : this.props.sender})
        console.log("senderEmail",this.state.senderEmail)
        this.setState({senderFirstName:this.props.senderFirstName})
        this.setState({senderLastName:this.props.senderLastName})
    }

    sendMessage(){
var data= {
    receiver: this.state.recipientEmail,
    sender:this.state.senderEmail,
    message:this.state.message,
    senderFirstName:this.props.senderFirstName,
    senderLastName:this.props.senderLastName

}

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
Ask Owner a question</button>


<div class="modal fade" id="myModal" role="dialog">
  <div class="modal-dialog">
  

    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 class="modal-title">Ask Owner a Question</h4>
      </div>
      <div>
         </div>
                           
                    <div >
                    &nbsp; <span> Receipent's email address </span>&nbsp;
                        <input type="text" class="form-control" value={this.props.receiver} name="lastName" />
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
