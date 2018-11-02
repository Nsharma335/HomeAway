import React, { Component } from 'react'
import axios from 'axios';
import swal from 'sweetalert2';
import { connect } from 'react-redux';
import HeaderOwner from './HeaderOwner';
import Message from './TravelerToOwnerMessage'
import HeaderBlue from './HeaderBlue';
import OwnerToTravelerReply from './OwnerToTravelerReply';

class TravelerInbox extends Component {
    constructor() {
        super();
        this.state = {
            messages: "",
            email:"",
        };
    }
componentDidMount(){
    let details= this.props.userinfo.map(user=> {
        if(user!=null){
        console.log("inside map email",user.email)
        this.setState({
            email:user.email
        })
        }
    })
   var id=null;
    let userid= this.props.userinfo.map(user=> {
        console.log("inside map email",user.email)
        id = user.email
    })
    console.log("user email id fetched from store..",id)
    if (id != null) {
    axios.get('http://localhost:3001/getMessage?email='+id).then(response=>
{
    console.log("response",response.data.res.MessageData)
    this.setState({
    messages : response.data.res.MessageData
    })   
//handle when no response found , show no messages validation, check length of response
    console.log("messages queue-->",this.state.messages)
})
}
}



  render() {

    let display
    if(this.state.messages.length>0){
    display=this.state.messages.map(message=> {     
    return(
        <div>
        
        <div className="container-fluid" style={{
                        borderRadius: "5px",
                        width: "90%",
                        backgroundColor: "white",     
                        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"

                    }}>
      <table class="table table-hover" style={{
      }}>

    <tr>
      <td scope="row"></td>
      <td style={{width:"150px"}}>{message.senderEmail} : </td>
      <td style={{textAlign:"left"}}>{message.message}</td>
    </tr>

</table>
</div>
      </div>
    )
    })
}
else{
  return(
      <div>
           <HeaderBlue></HeaderBlue>
           <center ><div style={{color:"grey"}}>No messages</div></center>
      </div>
  )
}

    return(
        <div>
            <HeaderBlue></HeaderBlue>
            {display}
        </div>
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
  export default connect(mapStateToProps)(TravelerInbox);