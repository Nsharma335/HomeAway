import React, { Component } from 'react'
import axios from 'axios';
import swal from 'sweetalert2';
import { connect } from 'react-redux';

class Inbox extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
            messages: ""
        };
    }
componentDidMount(){
    var id=null;
    let details= this.props.userinfo.map(user=> {
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
          <div class="container">
      <table class="table table-hover" style={{
           border: "1px solid black",
           borderCollapse: "collapse",
           padding: "15px",
            textAlign: "left",
            backgroundColor: "#f1f1c1"
      }}>

 
  <tbody>
    <tr>
      <td scope="row"></td>
      <td>{message.senderEmail}</td>
      <td>{message.message}</td>
    
    </tr>

  </tbody>
</table>
</div>
      </div>
    )
    })
}

    return(
        <div>
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
  export default connect(mapStateToProps)(Inbox);