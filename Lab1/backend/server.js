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
    if (!request.body.firstName || !request.body.lastName || !request.body.email || !request.body.password) {
        response.status(400).json({ success: false, message: 'Please enter all the fields.' });
    } else {
        response.cookie('cookieName', "cookieValue", { maxAge: 90000000, httpOnly: false, path: '/' });
        var newUser = {
            firstName: request.body.firstName,
            lastName: request.body.lastName,
            email: request.body.email,
            password: request.body.password
        };

        // Attempt to save the user
        db.createUser(newUser, function (res) {
            response.statusMessage = "Successfully created new user.";
            response.status(200).end();
        }, function (err) {
            console.log(err);
            response.statusMessage = "Username already exist";
            response.status(204).end();
        });
    }
});



app.get('/getUserDetails', function (request, response) {

    console.log("inside getUserDetails " + request.query.email);
    db.findUser({
        email: request.query.email
    },  //success callback of finduser
        function (rows) {
            console.log("success callback of get user details");
            console.log(rows)
            response.status(200).json({ success: true, rows: rows });
        }, function (err) {
            console.log(err);
            response.status(401).json({
                success: false,
                message: 'row not updated..!!'
            });
        });
});

app.post('/updateProfile', function (request, response) {
    console.log("fetching user profile, you rcan start updating you profile..")
    console.log(request.body);
    let form_values = {
        firstName: request.body.firstName,
        lastName: request.body.lastName,
        email: request.body.email,
        phoneNumber: request.body.phoneNumber,
        comment: request.body.comment,
        country: request.body.country,
        company: request.body.company,
        school: request.body.school,
        hometown: request.body.hometown,
        languages: request.body.languages,
        gender: request.body.gender
    };
    console.log(form_values);
    // Attempt to save the user
    db.updateProfile(form_values, function (res) {
        console.log(res)
        response.status(200).json({ success: true, message: 'You have submitted your profile successfully.' });
    }, function (err) {
        console.log(err);
        return response.status(400).json({ success: false, message: 'That profile already exist.' });
    });

});





// Authenticate the user and get a JSON Web Token to include in the header of future requests.
app.post('/login', function (request, response) {
    db.findUser
        (
        {
            email: request.body.email

        }, function (row) {
            var user = { email: row.email, firstName: row.firstName, lastName: row.lastName };
            crypt.compareHash(request.body.password, row.password, function (err, isMatch) {
                console.log("inside compare hash");
                if (isMatch && !err) {
                    var token = jwt.sign(user, config.secret, {
                        expiresIn: 10080 // in seconds
                    });
                    let cookie = { user_email: request.body.email, first_name: row.firstName, last_name: row.lastName };
                    response.cookie('cookieName', cookie, { maxAge: 90000000, httpOnly: false, path: '/' });
                    response.status(200).json({ success: true, token: 'JWT ' + token });

                }
                else {
                    console.log("err is " + err)
                    response.statusMessage = "Authentication failed 1. Passwords did not match.";
                    response.status(401).end();
                }
            },
                function (err) {
                    console.log(err);
                    response.statusMessage = "Authentication failed 2. User not found.";
                    response.status(204).end();

                });
        },
        function (err) {
            console.log(err);
            response.statusMessage = "Authentication failed 3. User not found.";
            response.status(204).end();

        });
});


app.post('/searchProperty', function (request, response) {

    console.log("Request search property for User : " + request.body.firstName);
    var data = {
        location: request.body.location, checkin: request.body.checkin, checkout: request.body.checkout,
        guests: request.body.guests
    };
    db.searchProperty(
        {
            data
        },  //success callback of finduser
        function (rows) {
            console.log("success callback of get user details");
            console.log(rows)
            response.status(200).json({ success: true, rows: rows });
        }, //failure callback
        function (err) {
            console.log(err);
            response.statusMessage = "Matching Property Not Found.";
            response.status(204).end();
        }
    );
});

// submit properties
app.post('/submitProperty', function (request, response) {
    console.log("Submitting owners property by owner id - " + request.body.owner)

    console.log("backend owner" + request.body.owner)
    response.cookie('cookieName', "cookieValue", { maxAge: 90000000, httpOnly: false, path: '/' });
    var newProperty = {
        address: request.body.address,
        headline: request.body.headline,
        description: request.body.description,
        bedroom: request.body.bedroom,
        bathroom: request.body.bathroom,
        accomodates: request.body.accomodates,
        amenities: request.body.amenities,
        availableFrom: request.body.availableFrom,
        availableTo: request.body.availableTo,
        propertyType: request.body.propertyType,
        currency: request.body.currency,
        baseRate: request.body.baseRate,
        email: request.body.owner
    };

    console.log(newProperty);
    // Attempt to save the user
    db.submitProperty(newProperty, function (res) {
        response.status(201).json({ success: true, message: 'You have submitted your property successfully.' });
    }, function (err) {
        console.log(err);
        return response.status(400).json({ success: false, message: 'property already exist.' });
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
    db.findOwnersListedPropertyperty({
        ownerid: request.query.email
    },  //success callback of finduser
        function (rows) {
            console.log("success callback of get user details");
            console.log(rows)
            response.status(200).json({ success: true, rows: rows });
        }, //failure callback
        function (err) {
            console.log(err);
            response.statusMessage = "Please list your property.";
            response.status(204).end();

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