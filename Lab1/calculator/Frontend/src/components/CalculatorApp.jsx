import ReactDOM from "react-dom";
import React, { Component } from "react";
import "./style.css";
import axios from 'axios';

class CalculatorApp extends Component {
  constructor(props) {
    super(props)
    this.state = { result: "0" };
    this.enterDigit = this.enterDigit.bind(this);
    this.enterDot = this.enterDot.bind(this);
    this.result = this.result.bind(this);
    this.clear = this.clear.bind(this);
    this.enterPlus = this.enterPlus.bind(this);
    this.enterMinus = this.enterMinus.bind(this);
    this.enterMultipllication = this.enterMultipllication.bind(this);
    this.enterDivision = this.enterDivision.bind(this);

  }


  enterDigit(digit) {

    this.setState(
      {
        result: this.state.result === "0" ? String(digit) : this.state.result + digit
      })
  }
  enterDot() {
    if (this.state.result.indexOf('.') === -1) {
      this.setState(
        {
          result: this.state.result + '.'
        }
      )
    }
  }
  clear() {
    this.setState({
      result: "0"
    })
  }

  enterPlus() {
    if (this.state.result.indexOf('+') === -1) {
      this.setState(
        {
          result: this.state.result + '+'
        }
      )
    }
  }

  enterMinus() {
    if (this.state.result.indexOf('-') === -1) {
      this.setState(
        {
          result: this.state.result + '-'
        }
      )
    }
  }
  enterMultipllication() {
    if (this.state.result.indexOf('*') === -1) {
      this.setState(
        {
          result: this.state.result + '*'
        }
      )
    }
  }
  enterDivision() {
    if (this.state.result.indexOf('/') === -1) {
      this.setState(
        {
          result: this.state.result + '/'
        }
      )
    }
  }
  result() {
    var data = {
      expression: this.state.result
    }
    axios.post('http://localhost:5001/', data)
      .then((response) => {
        console.log("response.data.result:" + response.data.result)
        if (response.data.result !== undefined) {
          this.setState({
            result: response.data.result,

          });
        }
      })
  }

  render() {
    return (
      <div className="calculator" >
        <div className="calculator-display" onClick={this.result}>{this.state.result}</div>
        <div className="calculator-keypad">
          <div className="input-keys">
            <div className="digit-keys">
              <button className="calculator-key key-0" onClick={() => this.enterDigit(0)}>0 </button>
              <button className="calculator-key key-1" onClick={() => this.enterDigit(1)}>1 </button>
              <button className="calculator-key key-2" onClick={() => this.enterDigit(2)}>2 </button>
              <button className="calculator-key key-3" onClick={() => this.enterDigit(3)}>3 </button>
              <button className="calculator-key key-4" onClick={() => this.enterDigit(4)}>4 </button>
              <button className="calculator-key key-5" onClick={() => this.enterDigit(5)}>5 </button>
              <button className="calculator-key key-6" onClick={() => this.enterDigit(6)}>6 </button>
              <button className="calculator-key key-7" onClick={() => this.enterDigit(7)}>7 </button>
              <button className="calculator-key key-8" onClick={() => this.enterDigit(8)}>8 </button>
              <button className="calculator-key key-9" onClick={() => this.enterDigit(9)}>9 </button>
              <button className="calculator-key key-9" onClick={() => this.enterDot()}>.</button>
              <button className="calculator-key key-AC" onClick={() => this.clear()}>AC </button>
            </div>
            <div className="operator-keys">
              <button className="calculator-key" onClick={() => this.enterDivision(0)}>/</button>
              <button className="calculator-key " onClick={() => this.enterPlus(0)}>+</button>
              <button className="calculator-key " onClick={() => this.enterMinus(0)}>-</button>
              <button className="calculator-key" onClick={() => this.enterMultipllication(0)}>*</button>
              <button className="calculator-key" onClick={this.result}>=</button>
            </div>
          </div>
        </div>
      </div >
    );
  }
}

export default CalculatorApp;
