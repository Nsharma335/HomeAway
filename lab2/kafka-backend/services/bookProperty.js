var db = require('../../backend/db');

function handle_request(msg, callback){
console.log("handling add property by kafka...")

    console.log("backend msg" + msg.travelerEmail)
    // response.cookie('cookieName', "cookieValue", { maxAge: 90000000, httpOnly: false, path: '/' });
    var bookingData = {
        propertyId: msg.propertyId,
        travelerId: msg.travelerEmail,
        checkin: msg.checkin,
        checkout: msg.checkout,
        totalPrice: msg.totalPrice
    };

    console.log(bookingData);

    db.BookProperty(bookingData, function (res) {
        const resData = {
            message : "You have booked your property successfully.",
            status: 201
        }
        callback(null,resData)
        //response.status(201).json({ success: true, message: 'You have submitted your property successfully.' });
    }, function (err) {
        const resData = {
            message : "Cannot book property",
            status: 400
        }
        callback(err,resData)
       // return response.status(400).json({ success: false, message: 'Cannot book property' });
    });

}

exports.handle_request = handle_request;