var db = require('../../backend/db');

//Authenticate the user and get a JSON Web Token to include in the header of future requests.
// send this service request to kafka , we used to send our service to databse directly before, now we are sending it to kafka.
function handle_request(msg, callback){ {
    console.log("fetching user profile, you can start updating you profile..")
    console.log(msg, "msg is..");
    let form_values = {
        firstName: msg.firstName,
        lastName: msg.lastName,
        email: msg.email,
        phoneNumber: msg.phoneNumber,
        comment: msg.comment,
        country: msg.country,
        company: msg.company,
        school: msg.school,
        hometown: msg.hometown,
        languages: msg.languages,
        gender: msg.gender
    };
    console.log(form_values);
    // Attempt to save the user
    db.updateProfile(form_values, function (res) {
        console.log(res)
        const resData = {
            message : "Your profile is updated successfully.",
            status: 200,
            user : res
        }
        callback(null,resData)
       // response.status(200).json({ success: true, message: 'You have submitted your profile successfully.' });
    }, function (err) {
        console.log(err);
        const resData = {
            message : "Couldn't able to update the profile.",
            status: 400
        }
        callback(err,resData)
        //return response.status(400).json({ success: false, message: 'That profile already exist.' });
    });

}
}

exports.handle_request = handle_request;