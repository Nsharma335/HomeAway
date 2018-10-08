import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';


export default class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            location: "",
            checkin: "",
            checkout: "",
            guests: "",

        };
        this.saveFormData = this.saveFormData.bind(this);
        this.locationChangeHandler = this.locationChangeHandler.bind(this);
        this.checkInHandler = this.checkInHandler.bind(this);
        this.checkOutHandler = this.checkOutHandler.bind(this);
        this.guestHandler = this.guestHandler.bind(this);
    }

    locationChangeHandler(e) {
        console.log("state location")
        this.setState({
            location: e.target.value
        })
        console.log("location" + this.state.location)
    }

    checkInHandler(e) {
        console.log("state location")
        this.setState({
            checkin: e.target.value
        })
        console.log("location" + this.state.checkin)
    }
    checkOutHandler(e) {
        console.log("state location")
        this.setState({
            checkout: e.target.value
        })
        console.log("location" + this.state.checkout)
    }
    guestHandler(e) {
        console.log("state location")
        this.setState({
            guests: e.target.value
        })
        console.log("location" + this.state.guests)
    }

    saveFormData(e) {
        e.preventDefault();
        debugger
        localStorage.setItem("location", this.state.location);
        localStorage.setItem("checkin", this.state.checkin);
        localStorage.setItem("checkout", this.state.checkout);
        localStorage.setItem("guests", this.state.guests);
        // this.props.history.push("/viewProperty")
        window.location.href = "http://localhost:3000/viewProperty";
    }


    render() {
        console.log(this.state.location)
        console.log("checkin" + localStorage.getItem("checkin"));
        console.log("checkout" + localStorage.getItem("checkout"));
        console.log(this.state.guests)
        return (
            <div>
                <form className="form-inline" style={{ marginBottom: "200px" }}>
                    <div className="form-group form-group-lg">
                        <input type="text" onChange={this.locationChangeHandler} className="form-control" value={localStorage.getItem("location")} name="location" placeholder="Where do you want to go?" style={{ width: "350px" }}></input>
                    </div>
                    <div className="form-group form-group-lg">
                        <input type="date" onChange={this.checkInHandler} className="form-control" value={localStorage.getItem("checkin")} name="checkin" placeholder="Arrive" style={{ width: "195px" }}></input>
                    </div>
                    <div className="form-group form-group-lg">
                        <input type="date" onChange={this.checkOutHandler} className="form-control" value={localStorage.getItem("checkout")} name="checkout" placeholder="Depart" style={{ width: "195px" }}></input>
                    </div>
                    <div className="form-group form-group-lg">
                        <input type="text" onChange={this.guestHandler} className="form-control" value={localStorage.getItem("guests")} name="guests" placeholder="Guests" style={{ width: "100px", }}></input>
                    </div>
                    <button type="submit" className="btn btn-lg" onClick={this.saveFormData}>Search </button>
                </form>
            </div>
        )
    }
}
