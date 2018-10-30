var db = require('../../backend/db');

function handle_request(msg, callback){
    console.log(msg);
    console.log("msg received for register",msg)
console.log(" ownersListedProperty " + msg);
    db.findTravelerBookings({
        travelerId: msg
    },  //success callback of finduser
        function (rows) {
            console.log("success callback of get user details");
            console.log(rows)
            const resData = {
                message : "fetched results.",
                status: 200,
                rows : rows
            }
            callback(null,resData)
        }, //failure callback
        function (err) {
            console.log(err);
            const resData = {
                message : "No Bookings Found.",
                status: 204,
        
            }
            callback(null,resData)

        });
}
exports.handle_request = handle_request;
