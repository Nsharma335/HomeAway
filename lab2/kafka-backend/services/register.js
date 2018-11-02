
var db = require('../../backend/db');

function handle_request(msg, callback){
    console.log("Registering New User...")
    console.log(msg);
    console.log("msg received for register",msg)
    if (!msg.firstName || !msg.lastName || !msg.email || !msg.password) {
        const resData = {
            message: 'Please enter all the fields.',
            success: false,
            status : 400
        }
        callback(null,resData)
       
    } 
    else {
        //response.cookie('cookieName', "cookieValue", { maxAge: 90000000, httpOnly: false, path: '/' });
        var newUser = {
            firstName: msg.firstName,
            lastName: msg.lastName,
            email: msg.email,
            password: msg.password
        };

        // Attempt to save the user
        db.createUser(newUser, function (res) {
            const resData = {
                message : "Successfully created new user.",
                status: 200,
                user : res
            }
            callback(null,resData)
        }, function (err) {
            console.log(err);
            const resData = {
                message : "Username already exist.",
                status: 204
            }
            callback(err,resData)
        });
    }

}


exports.handle_request = handle_request;