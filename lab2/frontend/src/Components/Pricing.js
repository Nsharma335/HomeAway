import React, { Component } from 'react';
import { Form, Input, FormGroup, Container, Label } from 'reactstrap';

export default class Pricing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bookingType: "",
            currency: "",
            baseRate: "",
            availableFrom: "",
            availableTo: ""


        }
        this.availableFromChange = this.availableFromChange.bind(this);
        this.availableToChange = this.availableToChange.bind(this);
        this.saveAndContinue = this.saveAndContinue.bind(this);
        this.currencyChangeHandler = this.currencyChangeHandler.bind(this);
        this.baseRateChangeHandler = this.baseRateChangeHandler.bind(this);
    }
    availableFromChange(e) {

        this.setState({ availableFrom: e.target.value });
        e.target.value == "" ? document.getElementById("availableFrom-error").innerHTML = "Please enter date." :
            document.getElementById("availableFrom-error").innerHTML = "";
    }
    availableToChange(e) {

        this.setState({ availableTo: e.target.value });
        e.target.value == "" ? document.getElementById("availableTo-error").innerHTML = "Please enter date" :
            document.getElementById("availableTo-error").innerHTML = "";
    }
    currencyChangeHandler(e) {

        this.setState({ currency: e.target.value });
        e.target.value == "" ? document.getElementById("currency-error").innerHTML = "Please enter currency" :
            document.getElementById("currency-error").innerHTML = "";
    }

    baseRateChangeHandler(e) {

        this.setState({ baseRate: e.target.value });
        e.target.value == "" ? document.getElementById("baseRate-error").innerHTML = "Please enter base price." :
            document.getElementById("baseRate-error").innerHTML = "";
    }

    saveAndContinue(e) {
        e.preventDefault()
        var data = {
            availableFrom: this.state.availableFrom,
            availableTo: this.state.availableTo,
            currency: this.state.currency,
            baseRate: this.state.baseRate
        }

        console.log("data is " + JSON.stringify(data));
        console.log("field");
        this.props.saveFields(data);
        this.props.nextStep();

    }
    render() {
        return (
            <div>

                <div class="container" style={{ backgroundColor: "#eee" }}>
                    <p></p>
                    <div>

                        <div class="container">
                            <p></p>

                            <div class="main-div">

                                <div>
                                    <div class="radio-inline ">
                                        <label><input type="radio" name="instant" checked onChange={this.bookingTypeHandler} />Instant Booking</label>
                                    </div>
                                    <div class="radio-inline ">
                                        <label><input type="radio" name="twenty-four-hour" />24-hour Review</label>
                                    </div>

                                </div>
                                <div className="row">
                                    Available from :
                                <input onChange={this.availableFromChange} type="Date" class="form-control" name="availableFrom"
                                        required="true" />
                                </div>
                                <div id="availableFrom-error"></div>
                                <div className="row">
                                    Available to :
                                <input onChange={this.availableToChange} type="Date" class="form-control" name="availableTo"
                                        required="true" />
                                    <div id="availableTo-error"></div>

                                </div >
                                <hr class="separator" style={{ color: "black" }}></hr>

                                <div form-control><strong>Pricing Details</strong></div>

                                <div className="row">Currency
                                    <select required className="form-control" name="currency" onChange={this.currencyChangeHandler} >
                                        <option value=""></option>

                                        <option value="AUD">Australian Dollar (AUD)</option>
                                        <option value="SGD">Singapore Dollar (SGD)</option>
                                        <option value="JPY">Japanese Yen (JPY)</option>
                                        <option value="EUR">Euros (EUR)</option>
                                        <option value="GBP">Great British Pound (GBP)</option>
                                        <option value="USD">US Dollar (USD)</option>
                                        <option value="CAD">Canadian Dollar (CAD)</option>
                                        <option value="NZD">New Zealand Dollar (NZD)</option>
                                        <option value="BRL">Brazil Real (BRL)</option>

                                    </select>
                                </div>
                                <div id="currency-error" ></div>
                                <div className="row">
                                    Nigtly Base rate <input type="text" id="price" name="baseRate" onChange={this.baseRateChangeHandler}></input>
                                </div>
                                <div id="baseRate-error"></div>


                                <div className="row">
                                    <button className="btn-primary form-group" onClick={this.saveAndContinue}>Next</button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}
