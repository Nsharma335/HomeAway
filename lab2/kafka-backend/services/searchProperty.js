
var db = require('../../backend/db');

function handle_request(msg, callback){
    console.log("Registering New User...")
    console.log(msg);
    console.log("msg received for register",msg)
    var data = {
        location: msg.location, checkin: msg.checkin, checkout: msg.checkout,
        guests: msg.guests
    };
    console.log("data from GUI", data )
    db.searchProperty(
        {
            data
        },  //success callback of finduser
        function (rows) {
            console.log("success callback of get user details");
            console.log(rows.length)
            if(rows.length>0){
            const resData = {
                message : "fetched results.",
                status: 200,
                rows : rows
            }
            callback(null,resData)
        }
        else{
            const resData = {
                message : "No results found",
                status: 204,
            }
            callback(null,resData)
        }
           // response.status(200).json({ success: true, rows: rows }).end();
        }, 
        function (err) {
            const resData = {
                message : "No results found",
                status: 204,
            }
            callback(err,resData)
            //response.status(204).end();
        }
    );
    }


    exports.handle_request = handle_request;