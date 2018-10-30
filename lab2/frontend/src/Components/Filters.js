import React, { Component } from 'react'
import { connect } from 'react-redux';
import {Redirect} from 'react-router'; 
import swal from 'sweetalert2'
import axios from 'axios';

class Filters extends Component {

constructor(props){
    super(props);
    this.state= {
        bedrooms: 1,
        price: 50,
        location:"",
        checkin:"",
        checkout:"",
    }
    this.onBedroomChangeHandler = this.onBedroomChangeHandler.bind(this);
    this.onPriceChangeHandler= this.onPriceChangeHandler.bind(this);
    this.locationChangeHandler = this.locationChangeHandler.bind(this);
    this.checkInDateHandler= this.checkInDateHandler.bind(this);
    this.checkOutDateHandler= this.checkOutDateHandler  .bind(this);
    this.onSearchHandler=this.onSearchHandler.bind(this);
}

 

  onPriceChangeHandler = (event) => {
    this.setState({ price : event.target.value});
  }

  onBedroomChangeHandler = (event) => {
    this.setState({ bedrooms : event.target.value});
  }

  locationChangeHandler=(event)=>{
    this.setState({ location : event.target.value});
  }
  checkInDateHandler = (event) => {
    this.setState({ checkin : event.target.value});
  }

  checkOutDateHandler = (event) => {
    this.setState({ checkout : event.target.value});
  }

  onSearchHandler(){
    var data={
      price:this.state.price,
      location:this.state.location,
      checkin:this.state.checkin,
      checkout:this.state.checkout
    }
    console.log("on serach handler",data)
    this.props.onSubmitHandle(data);
  }
  render() {
    return (
      <div>
   
<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalLong" style={{marginTop:"-300px"}}>
 More Filetrs
</button>


<div class="modal fade" id="exampleModalLong" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle"></h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
            <div>
                <label for="price-min">Price:</label>
                <input type="range" name="price-min" id="price-min" value={this.state.price} min="50" max="10000" onChange={this.onPriceChangeHandler}/>
                {
                    this.state.price > 50 ? <label>{this.state.price}</label> : null
                }
            </div>

            <div>
                <label for="bedrooms">Bedroom:</label>
                <input type="range" name="bedrooms" id="bedrooms" value={this.state.bedrooms} min="1" max="10" onChange={this.onBedroomChangeHandler}/>
                {
                    this.state.bedrooms > 1 ? <label>{this.state.bedrooms}</label> : null
                }
            </div>

            <div>
                <label>Location</label>&nbsp;&nbsp;
                <input type="text" name="area" onChange={this.locationChangeHandler} value={this.state.location}/>
            </div>

            <div>
                <label>Checkin</label>&nbsp;&nbsp;&nbsp;&nbsp;
                <input type="date" name="checkin" onChange={this.checkInDateHandler} value={this.state.checkin}></input>
            </div>

            <div>
                <label>Checkout</label>&nbsp;&nbsp;
                <input type="date" name="checkin"onChange={this.checkOutDateHandler} value={this.state.checkout} ></input>
            </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" onClick={this.onSearchHandler}>Search</button>
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
  console.log("State serachdetails data 1...", state.searched)
  console.log("State serachdetails data 2...", state.searchResults)
  return {
      searchedProperty : state.searched,
      serachedResults:state.searchResults,
      location: state.location,
      checkin:state.checkin,
      checkout: state.checkout,
      guests: state.checkout
  }
}
  const mapDispatchStateToProps = dispatch => {
      return {
          onSubmitHandle : (data) => {
             let self=this;
              axios.post('http://localhost:3001/searchPropertyWithFilters', data,{ withCredentials: true })
                  .then((response) => {
                          console.log("response fetched ROWS..", response)
                          if(response.data.updatedList.status==204)
                          {
                              swal('There is no property with this criteria.', "No results", 'error');
                          }
                         //self.setState({data: response.data.updatedList.rows })
                          console.log("rows in filter",response.data.updatedList.rows)
                          dispatch({type: 'SEARCH_RESULTS',payload :response.data.updatedList.rows, statusCode : response.data.updatedList.status})
                          console.log("dataaa", data)
                          //dispatch({type: "SEARCH_PARAMETER", searchData : data})
              })
          }
      }
  }


export default connect(mapStateToProps,mapDispatchStateToProps)(Filters);