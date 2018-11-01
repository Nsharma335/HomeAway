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
        cb(null, file.originalname);
    },
});

var upload = multer({ storage });



// Use body-parser to get POST requests for API use
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

// Log requests to console
app.use(morgan('dev'));

console.log("here");
//require('./app/routes')(app);
app.use(passport.initialize());
app.use(passport.session());

// Bring in defined Passport Strategy
require('./passport')(passport);

// Set up middleware
var requireAuth = passport.authenticate('jwt', { session: false });

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

app.post('/upload', upload.any(), (req, res) => {
    console.log("Req : ", req.body);
    console.log("Res : ", res.file);
    res.send();
});

app.post('/download/:file(*)', (req, res) => {

    console.log("Inside download file",req.params.file);
   console.log( typeof(req.params.file));
    var file = req.params.file.split(",");
    console.log("file array",file)
    var base64imagesArray=[];
    file.map(name=>{
        var fileLocation = path.join(__dirname + '/uploads', name);
        console.log("file location",fileLocation)
 
        var img = fs.readFileSync(fileLocation);
        var base64img = new Buffer(img).toString('base64');
        base64imagesArray.push(base64img)
    })
    console.log("Images to be downloaded",base64imagesArray)
    res.writeHead(200, { 'Content-Type': 'image/jpg' });
    res.end(JSON.stringify(base64imagesArray));
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


app.post('/login',function(request, response){
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


app.get('/getUserDetails',requireAuth, function (request, response) {
    console.log("authenticating user...",request)
    console.log("header data....".request.body);

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




app.post('/searchPropertyWithFilters', function (request, response) {
    console.log("Request search property for User : " );
    kafka.make_request('filter_property_topic',request.body, function(err,results){
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
    kafka.make_request('traveler_bookings_topic',request.query.email, function(err,results){
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


app.post('/bookingProperty', function (request, response) {
    console.log("Booking property for traveler... " + request.body)
    kafka.make_request('book_property_topic',request.body, function(err,results){
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

app.post('/sendMessage', function (request, response) {
    console.log("Sending message to owner... " + request.body)
    kafka.make_request('send_message_to_owner_topic',request.body, function(err,results){
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


app.get('/getMessage', function (request, response) {
    console.log("fetching message to owner... " + request.query.id)
    console.log("fetching message to owner... " + request.query.email)
    var data = {
      email: request.query.email
    }
    db.getMessage(data, function (res,err) {
        console.log("Message data",res)
        response.status(200).json({ success: true, message: 'Message retrieved.', res });

    }, function (err) {
        console.log(err);
        return response.status(400).json({ success: false, message: "Coudn't read messages" });
    });

});

// app.post('/sendMessageToOwner', function (request, response) {
//     console.log("Sending message to owner... " + request.body)

//     var messageObject = {
//         propertyId: request.body.propertyId,
//         firstName: request.body.firstName,
//         lastName: request.body.lastName,
//         travelerEmail: request.body.travelerEmail,
//         messageData: request.body.message
//     };

//     console.log(messageObject);

//     db.SendMessageToOwner(messageObject, function (res) {
//         console.log("Message data",res)
//         response.status(201).json({ success: true, message: 'Message sent.' });
//     }, function (err) {
//         console.log(err);
//         return response.status(400).json({ success: false, message: "Coudn't send messages" });
//     });

// });



//start your server on port 3001
app.listen(3001);
console.log("Server Listening on port 3001");