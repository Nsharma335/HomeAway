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

ReactDOM.render(
    <Provider >
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

                </div>
            </Router>
        </Layout>
    </Provider>
    ,
    document.getElementById('root')
);
