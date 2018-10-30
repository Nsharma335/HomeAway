var db = require('../../backend/db');

function handle_request(msg, callback){
console.log("handling add property by kafka...")

    console.log("backend owner" + msg.owner)
    var newProperty = {
        address: msg.address,
        headline: msg.headline,
        description: msg.description,
        bedroom: msg.bedroom,
        bathroom: msg.bathroom,
        accomodates: msg.accomodates,
        amenities: msg.amenities,
        availableFrom: msg.availableFrom,
        availableTo: msg.availableTo,
        propertyType: msg.propertyType,
        currency: msg.currency,
        baseRate: msg.baseRate,
        email: msg.owner,
        images:msg.images
    };

    console.log(newProperty);
    // Attempt to save the user
    db.submitProperty(newProperty, function (res) {

        const resData = {
            message : "Successfully added your property.",
            status: 201,
            property : res
        }
        callback(null,resData)

        //response.status(201).json({ success: true, message: 'You have submitted your property successfully.' });
    }, function (err) {
        console.log(err);
        
            const resData = {
                message : "Not able to add property into database.",
                status: 400
            }
            callback(err,resData)
        //return response.status(400).json({ success: false, message: 'property already exist.' });
    });

}

exports.handle_request = handle_request;