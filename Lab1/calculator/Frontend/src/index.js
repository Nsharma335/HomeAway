import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter as Router, Route } from 'react-router-dom'

import CalculatorApp from "./components/CalculatorApp.jsx";


ReactDOM.render(

    <Router>
        <div>
            <Route exact path="/" component={CalculatorApp} />

        </div>
    </Router>
    ,
    document.getElementById('root')
);
