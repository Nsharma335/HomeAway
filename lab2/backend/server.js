'use strict';
// Include our packages in our main server file
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var passport = require('passport');
var cors = require('cors');
var port = 8080;
var app = express();
var config = require('./settings');
var jwt = require('jsonwebtoken');
var crypt = require('./crypt');
var db = require('./db');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
var cookieParser = require('cookie-parser');
var kafka = require("./kafka/client")



// var dir = './profileImage';

// if (!fs.existsSync(dir)) {
//     fs.mkdirSync(dir);
// }

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log("multer disk storage running...")
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {

        // const newFilename = `test${path.extname(file.originalname)}`;
        cb(null, file.originalname);
    },
});

var upload = multer({ storage });

// Set up middleware
var requireAuth = passport.authenticate('jwt', { session: false });

// Use body-parser to get POST requests for API use
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

// Log requests to console
app.use(morgan('dev'));

console.log("here");
//require('./app/routes')(app);
app.use(passport.initialize());

// Bring in defined Passport Strategy
require('./passport')(passport);



app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
});


app.get('/checkSession', function (request, response) {
    response.json({ session: request.session });
})

app.get('/destroySession', function (request, response) {
    response.clearCookie('cookieName');
    response.json({ message: "Session Destroyed" });
});


app.post('/profilePhoto', upload.single('selectedFile'), (req, res) => {
    console.log("Req : ", req.body);
    console.log("Res : ", res.file);
    res.send();
});

app.post('/multipleImage', upload.any(), (req, res) => {
    console.log("Req : ", req.body);
    console.log("Res : ", res.file);
    res.send();
});

app.post('/download/:file(*)', (req, res) => {
    console.log("Inside download file");
    var file = req.params.file;
    var fileLocation = path.join(__dirname + '/uploads', file);
    var img = fs.readFileSync(fileLocation);
    var base64img = new Buffer(img).toString('base64');
    res.writeHead(200, { 'Content-Type': 'image/jpg' });
    res.end(base64img);
});

app.post('/register', function (request, response) {
    console.log("Registering New User...")
    console.log(request.body);
    kafka.make_request("register_topic", request.body, function(err, results) {
        console.log(results);
        if (err){
            console.log("Inside err");
            response.json({
                status:"error",
                msg:"System Error, Try Again."
            })
        }else{
            console.log("Inside else");
            response.json({
                    updatedList:results
                });
                response.end();
            } 
    });
});


app.post('/login', function(request, response){
    kafka.make_request('login_topic',request.body, function(err,results){
        console.log('in result');
        console.log(results);
        if (err){
            console.log("Inside err");
            response.json({
                status:"error",
                msg:"System Error, Try Again."
            })
        }else{
            console.log("Inside else");
            console.log("results from kafka",results)
            response.json({
                    updatedList:results
                });
                response.end();
            } 
    });
});

app.post('/updateProfile', function (request, response) {
    console.log("fetching user profile, you rcan start updating you profile..")
    
    kafka.make_request('update_profile_topic',request.body, function(err,results){
        console.log('in result');
        console.log(results);
        if (err){
            console.log("Inside err");
            response.json({
                status:"error",
                msg:"System Error, Try Again."
            })
        }else{
            console.log("Inside else");
            console.log("results from kafka",results)
            response.json({
                    updatedList:results
                });
                response.end();
            } 
    });
});


app.get('/getUserDetails', function (request, response) {

    console.log("inside getUserDetails " + request.query.email);
    kafka.make_request('get_user_details_topic',request.query.email, function(err,results){
        console.log('in result');
        console.log(results);
        if (err){
            console.log("Inside err");
            response.json({
                status:"error",
                msg:"System Error, Try Again."
            })
        }else{
            console.log("Inside else");
            console.log("results from kafka",results)
            response.json({
                    updatedList:results
                });
                response.end();
            } 
    });
});

app.post('/searchProperty', function (request, response) {
    console.log("Request search property for User : " );
    kafka.make_request('search_property_topic',request.body, function(err,results){
        console.log('in result');
        console.log(results);
        if (err){
            console.log("Inside err");
            response.json({
                status:"error",
                msg:"System Error, Try Again."
            })
        }else{
            console.log("Inside else");
            console.log("results from kafka",results)
            response.json({
                    updatedList:results
                });
                response.end();
            } 
    });
});



app.post('/submitProperty', function (request, response) {
    console.log("Submitting owners property by owner id - " + request.body.owner)
    kafka.make_request('add_property_topic',request.body, function(err,results){
        console.log('in result');
        console.log(results);
        if (err){
            console.log("Inside err");
            response.json({
                status:"error",
                msg:"System Error, Try Again."
            })
        }else{
            console.log("Inside else");
            console.log("results from kafka",results)
            response.json({
                    updatedList:results
                });
                response.end();
            } 
    });
});


app.get('/getProperty', function (request, response) {

    console.log("Get Property details of property id selected-  " + request.query.id);
    db.findProperty({
        id: request.query.id
    },  //success callback of finduser
        function (rows) {
            console.log(rows)
            response.status(200).json({ success: true, rows: rows });
        }, function (err) {
            console.log(err);
            response.status(401).json({
                success: false,
                message: 'Cannot fetch details.'
            });
        });
});


app.get('/ownersListedProperty', function (request, response) {
    console.log(" ownersListedProperty " + request.query.email);
    kafka.make_request('owner_listing_property_topic',request.query.email, function(err,results){
        console.log('in result');
        console.log(results);
        if (err){
            console.log("Inside err");
            response.json({
                status:"error",
                msg:"System Error, Try Again."
            })
        }else{
            console.log("Inside else");
            console.log("results from kafka",results)
            response.json({
                    updatedList:results
                });
                response.end();
            } 
    });
});

app.get('/travelerBookings', function (request, response) {

    console.log(" travelerBooking email " + request.query.email);
    db.findTravelerBookings({
        travelerId: request.query.email
    },  //success callback of finduser
        function (rows) {
            console.log("success callback of get user details");
            console.log(rows)
            response.status(200).json({ success: true, rows: rows });
        }, //failure callback
        function (err) {
            console.log(err);
            response.statusMessage = "No Bookings Found.";
            response.status(204).end();

        });
});


app.post('/bookingProperty', function (request, response) {

    console.log("Booking property for traveler... " + request.body.travelerEmail)

    response.cookie('cookieName', "cookieValue", { maxAge: 90000000, httpOnly: false, path: '/' });
    var bookingData = {
        propertyId: request.body.propertyId,
        travelerId: request.body.travelerEmail,
        checkin: request.body.checkin,
        checkout: request.body.checkout,
        totalPrice: request.body.total
    };

    console.log(bookingData);

    db.BookProperty(bookingData, function (res) {
        response.status(201).json({ success: true, message: 'You have submitted your property successfully.' });
    }, function (err) {
        console.log(err);
        return response.status(400).json({ success: false, message: 'property already exist.' });
    });

});

//start your server on port 3001
app.listen(3001);
console.log("Server Listening on port 3001");