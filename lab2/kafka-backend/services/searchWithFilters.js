
var db = require('../../backend/db');

function handle_request(msg, callback){
    console.log("Registering New User...")
    console.log(msg);
    console.log("msg received for register",msg);
    var data = {
        location: msg.location, checkin: msg.checkin, checkout: msg.checkout,
        price: msg.price
    };
    db.searchPropertyWithFilters(
        {
            data
        },  //success callback of finduser
        function (rows) {
            console.log("success callback of get user details");
            console.log(rows.length)
            if(rows.length>0){
                console.log("success callback of get user details");
                console.log(rows.length)
                const resData = {
                    message : "fetched results.",
                    status: 200,
                    rows : rows
                }
             callback(null,resData)
           // response.status(200).json({ success: true, rows });
        }
        else{
            const resData = {
                message : "No results found",
                status: 204,
            }
            //response.status(204).json({ success: true, rows: resData });
           callback(null,resData)
        }
           // response.status(200).json({ success: true, rows: rows }).end();
    },
        function (err) {
            const resData = {
                message : "No results found",
                status: 204,
            }
            //response.status(204).json({ success: true, rows: resData });
            callback(err,resData)
            //response.status(204).end();
        }
    
    );
}

exports.handle_request = handle_request;