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
    request.session.destroy();
    response.json({ message: "Session Destroyed" });
});

// Register new users
app.post('/register', function (request, response) {
    console.log("inside register")
    console.log(request.body);
    if (!request.body.firstName || !request.body.lastName || !request.body.email || !request.body.password) {
        response.status(400).json({ success: false, message: 'Please enter all the fields.' });
    } else {
        response.cookie('cookieName', "cookieValue", { maxAge: 900000, httpOnly: false, path: '/' });
        var newUser = {
            firstName: request.body.firstName,
            lastName: request.body.lastName,
            email: request.body.email,
            password: request.body.password
        };

        // Attempt to save the user
        db.createUser(newUser, function (res) {
            response.status(201).json({ success: true, message: 'Successfully created new user.' });
        }, function (err) {
            console.log(err);
            return response.status(400).json({ success: false, message: 'That username address already exists.' });
        });
    }
});

// Authenticate the user and get a JSON Web Token to include in the header of future requests.
app.post('/travelerlogin', function (request, response) {
    console.log("inside server side traveler login")
    console.log("username from request " + request.body.email);
    db.findUser({
        email: request.body.email

    }, function (row) {
        console.log("inside successcallback");
        console.log("row id" + row.id + "row usernm" + row.username);
        // Check if password matches because we found a row from db
        console.log("passwrd from response " + row.password);

        var user = { email: row.email, firstName: row.firstName, lastName: row.lastName };
        crypt.compareHash(request.body.password, row.password, function (err, isMatch) {
            console.log("inside compare hash");
            if (isMatch && !err) {
                // Create token if the password matched and no error was thrown
                var token = jwt.sign(user, config.secret, {
                    expiresIn: 10080 // in seconds
                });
                response.cookie('cookieName', "cookieValue", { maxAge: 900000, httpOnly: false, path: '/' });
                response.status(200).json({ success: true, token: 'JWT ' + token });

            } else {
                response.status(401).json({
                    success: false,
                    message: 'Authentication failed. Passwords did not match.'
                });
            }
        }, function (err) {
            console.log(err);
            response.status(401).json({ success: false, message: 'Authentication failed. User not found.' });
        });
    }, function (err) {
        console.log(err);
        response.status(401).json({ success: false, message: 'Authentication failed. User not found.' });
    });
});





//start your server on port 3001
app.listen(3001);
console.log("Server Listening on port 3001");