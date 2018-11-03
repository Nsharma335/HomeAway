import React, { Component } from 'react'
import axios from 'axios';
import Swal from 'sweetalert2';
import cookie from 'react-cookies';
import HeaderOwner from './HeaderOwner';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import {Redirect} from 'react-router'; 
import Pagination from './Pagination'
import { Link } from "react-router-dom";

class OwnerDashboard extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
            message: "",
            currentPage: 1, perPageRows: 5,
            photos: [],
            searchedName:"",
            propertyArray2:[],
        };
        this.handlePageChange= this.handlePageChange.bind(this);
        this.handleNextPaginationButton= this.handleNextPaginationButton.bind(this);
        this.handlePrevPaginationButton= this.handlePrevPaginationButton.bind(this);
        this.serachedNameHandler=this.serachedNameHandler.bind(this);
        this.searchByName=this.searchByName.bind(this);
    }
    handlePageChange(e) {
        this.setState({currentPage: Number(e.target.dataset.id)})
      }
    
      handleNextPaginationButton(e) {
        const total_pages = this.state.data.length > 0 ? this.state.data.length/this.state.perPageRows : 0;
        if(this.props.searchResults  != [] && this.state.currentPage != Math.ceil(total_pages)){
          this.setState({currentPage: Number(this.state.currentPage + 1)})      
        }
      }
    
      handlePrevPaginationButton(e) {
        if(this.props.searchResults != [] && this.state.currentPage != 1){
          this.setState({currentPage: Number(this.state.currentPage - 1)})
        }
      }

    componentWillMount() {
        if (this.props.authFlag)
            this.loadOwnerPropertyDetails();
        else
        <Redirect to="/ownerlogin" />
        
    }

    loadOwnerPropertyDetails() {
        var self = this;
        var id=null;
        let details= this.props.userinfo.map(user=> {
            if(user!=null){
            console.log("inside map email",user.email)
            id = user.email
            }
        })
        console.log("user email id fetched from store..",id)
        console.log("OWNER DASHBOARD PAGE ID" + id)
        if (id != null) {
            axios.get("http://localhost:3001/ownersListedProperty?email=" + id)
                .then(function (response) {
                    console.log("response",response)
                    if (response.data.updatedList.rows != null) {
                        console.log("response from backedn",response.data.updatedList.rows);
                        self.setState({
                            data: response.data.updatedList.rows,
                            propertyArray2: response.data.updatedList.rows
                        })
                    }
                    if (response.data.updatedList.status === 204) {
                        console.log("hey data is not present");
                        console.log("data" + response.data.updatedList.status)
                        return
                    }
                })
        }
    }

    serachedNameHandler(e){
        this.setState({searchedName:e.target.value})
    }
    searchByName(){
        let propertyList=this.state.data;
      console.log(propertyList)
        let newNames=[];
        let newProperty=[];
        let names= propertyList.map(property=>{
            let headline=property.headline;
            console.log("prop headline",headline)
            console.log("prop headline serached name with",this.state.searchedName)
            if(this.state.searchedName.match(headline))
            {
                console.log("inside if",headline)
             newNames.push(headline);
             newProperty.push(property);
            }
        })
        //if(names.co)
        console.log("names",names)
        console.log("new names",newNames)
        console.log("new property",newProperty)
        this.setState({data:newProperty})
        if(this.state.searchedName=="")
        this.setState({data:this.state.propertyArray2})
    }

    render() {
        let propertytList, pagination_list=null;
        const indexOfLastTodo = this.state.currentPage * this.state.perPageRows;
        const indexOfFirstTodo = indexOfLastTodo - this.state.perPageRows;
        const currentTodos = this.state.data.slice(indexOfFirstTodo, indexOfLastTodo);
        const total_pages = this.state.data.length > 0 ? this.state.data.length/this.state.perPageRows : 0;
        const page_numbers = [];
        for (let i = 1; i <= Math.ceil(this.state.data.length / this.state.perPageRows); i++) {
          page_numbers.push(i);
        } 
          pagination_list = page_numbers.map(number => {
            return (
              <li class="page-item" key= {number} data-id={number} onClick={this.handlePageChange} ><a data-id={number} class="page-link" href="#">{number}</a></li>
            );
          });
          if(currentTodos != null){
        propertytList = currentTodos.map(property => {
            var image_tag = null;
            console.log("property",property.images)
            console.log("headline",property.headline)
            console.log("address",property.address)
            if(property.images.length >0){
                var splitimage=property.images.split(",")
                image_tag = <img  src= { require('../../../backend/uploads/' + splitimage[0]) } width="150px" height="150px" ></img>            
              }
              else{
                image_tag = <img src= { require('../images/default-property.png') } width="150px" height="150px" ></img>
              }
            return (
                <div>
           <div className="container-fluid" style={{
                        borderRadius: "5px",
                        marginBottom: "20px",
                        width: "90%",
                        backgroundColor: "white",
                        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"

                    }}>
                        <div className="row">
                      
                        
                            <div className="col-sm-2" >
                            {image_tag}

                            </div>
                            <div className="col-sm-10 nameview">
                                {/* <div>
                                    <a href="#" onClick={this.handleOnClickProperty} data-id={property.propertyId}> {property.propertyId} </a>
                                </div> */}
                                <div className="displayRow">
                                    <div id="below">{property.headline}</div>
                                    <div className="belowTitleView"><strong>{property.bedroom}</strong> BHK accomodates by </div>
                                    <div className="belowTitleView"><strong>{property.accomodates}</strong> people</div>
                                </div>


                                <div className="priceview">
                                    <span>{property.baseRate}&nbsp;{property.currency}</span> Per night
                         </div>
                                <div>
                                    Avialable from : <Moment format="MM/DD/YYYY">{property.availableFrom}</Moment>
                                </div>
                                <div>
                                    Avialable To : <Moment format="MM/DD/YYYY">{property.availableTo}</Moment>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            );
        });


        if (this.state.data.length>0) {
            return (
                <div>
                    <div className="main-property-div" style={{ backgroundColor: '#f7f7f8' }}>
                   
                        <HeaderOwner />
                        <div className="container-fluid" style={{marginLeft: "50px"}}>
                        <input type="text" name="searchedName" style={{width:"400px"}}onChange={this.serachedNameHandler} placeholder="Search property by name" />
                        <button  onClick={this.searchByName}class="btn btn-primary">Search</button>
                        </div>
                      
                                
                        <p></p> <p></p>
                        {propertytList}
                    </div>
                    <Pagination handlePrevPaginationButton = {this.handlePrevPaginationButton.bind(this)} handleNextPaginationButton = {this.handleNextPaginationButton.bind(this)}
          handlePageChange = {this.handlePageChange.bind(this)} pagination_list = {pagination_list}/>
                </div >
            )
        }
        else{
            return (
                <div>
                     <HeaderOwner />
                    <div className="col-md-10 form-group" style={{ textAlign: "center", margin: "100px" }}>
                        <h2> You Haven't listed anything, Start listing your property.
                                <br></br>
                            <Link to="/listYourProperty">Here</Link></h2>
                    </div>
                </div >
            )
        }
    }
}
}

const mapStateToProps = state =>{
    console.log("State auth", state)
    console.log("State user", state.userinfo)
    return {
        authFlag : state.authFlag,
        userinfo : state.user

    }
}

export default connect(mapStateToProps)(OwnerDashboard);