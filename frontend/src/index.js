import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from './Components/Layout';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Home from './Components/Home';
import { Provider } from 'react-redux';
import TripBoards from './Components/TripBoards';
import TravelerLogin from './Components/TravelerLogin';
import Help from './Components/Help';
import ListProperty from './Components/ListProperty';
import SignUp from './Components/SignUp';
import Location from './Components/Location';
import Dashboard from './Components/Dashboard';

ReactDOM.render(
    <Provider >
        <Layout>
            <Router>
                <div>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/tripBoards" component={TripBoards} />
                    <Route path="/travelerlogin" component={TravelerLogin} />
                    <Route path="/register" component={SignUp} />
                    <Route path="/location" component={Location} />
                    <Route path="/dashboard" component={Dashboard} />
                    <Route exact path="/help" component={Help} />
                    <Route exact path="/listProperty" component={ListProperty} />
                </div>
            </Router>
        </Layout>
    </Provider>
    ,
    document.getElementById('root')
);
