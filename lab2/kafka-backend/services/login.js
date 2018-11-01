var db = require('../../backend/db');
var crypt = require('../../backend/crypt');
var jwt = require('jsonwebtoken');
var config = require('../../backend/settings');
//Authenticate the user and get a JSON Web Token to include in the header of future requests.
// send this service request to kafka , we used to send our service to databse directly before, now we are sending it to kafka.
function handle_request(msg, callback){
    db.findUser ({
            email: msg.email

        }, function (row) {
            var user = { email: row.email};
           
            console.log("row email "+row.email + row.password)
            crypt.compareHash(msg.password, row.password, function (err, isMatch) {
                console.log("inside compare hash");
                if (isMatch && !err) {
                    console.log("is matched true")
                   var token = jwt.sign(user, config.secret, {
                     expiresIn: 10080 // in seconds
                   });
                   
                    //let cookie = { user_email: request.body.email, first_name: row.firstName, last_name: row.lastName };
                   // response.cookie('cookieName', cookie, { maxAge: 90000000, httpOnly: false, path: '/' });
                    console.log("user found..",row)
                    const resData = {
                        authFlag : true,
                        user : row,
                       token: "Bearer "+token,
                        status: 200
                    }
                    callback(err,resData)
                    //response.status(200).json({ success: true, token: 'JWT ' + token , resData});
                }
            else
                {  console.log("inside err" ,err)
                  // response.statusMessage = "Password did not match.";
                  const resData={
                      status: 403,
                      message : "password did not match"
                  }
                   callback(err,resData)
                  // response.status(401).end();
                }
            },
                function (err) {
                    console.log(err);

                    const resData={
                        status: 401,
                        message : "Authentication failed 2. User not found."
                    }
                    callback(err,resData)

                });
        },
        function (err) {
            console.log("not found neha->",err);
            const resData={
                status: 401,
                message : "Authentication failed 2. User not found."
            }
            callback(err,resData)

        });
}

exports.handle_request = handle_request;