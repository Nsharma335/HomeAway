
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { createStore,applyMiddleware,compose } from "redux";
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from './Components/Layout';

import Home from './Components/Home';
import TravelerLogin from './Components/TravelerLogin';
import SignUp from './Components/SignUp';
import UserProfile from './Components/UserProfile';
import PropertyDetails from './Components/PropertyDetails';
import Location from './Components/Location';
import Pricing from './Components/Pricing';
import ListYourProperty from './Components/ListYourProperty';
import ViewProperty from './Components/ViewProperty';
import BookProperty from './Components/BookProperty';
import OwnerLogin from './Components/OwnerLogin';
import OwnerDashboard from './Components/OwnerDashboard';
import ProfileImageUpload from './Components/ProfileImageUpload';
import TravelerTrips from './Components/TravelerTrips';
import Inbox from './Components/Inbox';
import reducer from './store/reducer';
import {Provider} from 'react-redux';
import promise from "redux-promise";
//to work with redux dev tool

const composePlugin = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const createStoreWithMiddleware = applyMiddleware(promise)(createStore);
//import createStore from redux
//import Provider from react-redux

//create a store and pass reducer as an argument
//const store = createStore(reducer);
const store = createStore(reducer, composePlugin(applyMiddleware(promise)));

ReactDOM.render(
    <Provider store = {store}>
        <Layout>
            <Router>
                <div>
                    <Route exact path="/" component={Home} />
                    <Route path="/travelerlogin" component={TravelerLogin} />
                    <Route path="/ownerlogin" component={OwnerLogin} />
                    <Route path="/register" component={SignUp} />
                    <Route path="/userprofile" component={UserProfile} />
                    <Route path="/location" component={Location} />
                    <Route path="/listYourProperty" component={ListYourProperty} />
                    <Route path="/propertydetails" component={PropertyDetails} />
                    <Route path="/pricing" component={Pricing} />
                    <Route exact path="/viewProperty" component={ViewProperty} />
                    <Route exact path="/bookProperty" component={BookProperty} />
                    <Route exact path="/ownerDashboard" component={OwnerDashboard} />
                    <Route exact path="/travelerTrips" component={TravelerTrips} />
                    <Route exact path="/photoUpload" component={ProfileImageUpload} />
                    <Route exact path="/inbox" component={Inbox} />
                </div>
            </Router>
        </Layout>
    </Provider>
    ,
    document.getElementById('root')
);
