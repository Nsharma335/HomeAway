import React, { Component } from 'react'
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link } from "react-router-dom";
import HeaderBlue from './HeaderBlue';
import Search from './Search';
import Pagination from './Pagination'
import { BrowserRouter as Router } from 'react-router-dom';
import {Redirect} from 'react-router'; 
import { connect } from 'react-redux';
import swal from 'sweetalert2'
import Filters from './Filters';

class ViewProperty extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
            currentPage: 1, perPageRows: 2,
            imagesPreview: [],
        };
       // this.handleOnClickProperty = this.handleOnClickProperty.bind(this);
       this.handlePageChange= this.handlePageChange.bind(this);
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
    
   
    render() {
        let propertytList, pagination_list=null;
        const indexOfLastTodo = this.state.currentPage * this.state.perPageRows;
        const indexOfFirstTodo = indexOfLastTodo - this.state.perPageRows;
        const currentTodos = this.props.searchResults.slice(indexOfFirstTodo, indexOfLastTodo);
        const total_pages = this.props.searchResults.length > 0 ? this.props.searchResults.length/this.state.perPageRows : 0;
        const page_numbers = [];
        for (let i = 1; i <= Math.ceil(this.props.searchResults.length / this.state.perPageRows); i++) {
          page_numbers.push(i);
        } 
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
            console.log("property",property)
            return (
                <div>
                    <div className="container-fluid" style={{
                        borderRadius: "5px",
                        marginBottom: "20px",
                        width: "90%",
                        backgroundColor: "white",
                        boxShadow: "0px 1px 3px rgba(0,0,0,.1)"
                    }}>
                        <div className="row">
                            <div className="col-sm-2" >

                                {/* <img src={require(`../Components/uploads/${property.images}`)} height="100px" /> */}
                                {/* <img src={this.state.imagesPreview} height="100px" /> */}
                            </div>
                            <div className="col-sm-10 nameview">
                                <div>
                                    {/* <Link to={} data-id={property._id}> Property {property._id} </Link> */}
                                    <Link  to={{
                                        pathname: "/bookProperty",
                                         state: {
                                             property: property
                                             }
                                             }} 
                                             role="button">{property.headline}</Link>
                                </div>
                                <div className="displayRow">
                                    <div id="below">{property.headline}</div>
                                    <div className="belowTitleView"><strong>{property.bedroom}</strong> BA|</div>
                                    <div className="belowTitleView"><strong>{property.accomodates}</strong> Sleeps|</div>
                                </div>


                                <div className="priceview">
                                    <span>{property.bathroom}</span> Per night
                         </div>
                            </div>
                        </div>
                    </div>
                </div>

            );
        })};

        if (this.state.data != null) {
            return (

                <div>
                    <div className="main-property-div" style={{ backgroundColor: '#f7f7f8' }}>
                        <HeaderBlue />
                        <Search />
                        <label><Filters></Filters></label>
                        {propertytList}
                    </div>
                    <Pagination handlePrevPaginationButton = {this.handlePrevPaginationButton.bind(this)} handleNextPaginationButton = {this.handleNextPaginationButton.bind(this)}
          handlePageChange = {this.handlePageChange.bind(this)} pagination_list = {pagination_list}/>
                </div >
            )

        }

    }
}

const mapStateToProps = state =>{
    //console.log("State", state)
    console.log("State in view property searchresults..", state.searchResults)
    return {
        searchResults : state.searchResults,
     
    }
}


export default connect(mapStateToProps,null)(ViewProperty);