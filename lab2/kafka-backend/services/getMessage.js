
var db = require('../../backend/db');

function handle_request(msg, callback){
    console.log("fetching message to owner... " + msg)
    var data = {
      email: msg
    }
    db.getMessage(data, function (resultObject,err) {
        console.log("Message data",resultObject)
        const res = {
            message : "Message retrieved through Kafka..",
            status: 200,
            rows : resultObject
        }
     callback(null,res)
        //response.status(200).json({ success: true, message: 'Message retrieved.', res });

    }, function (err) {
        console.log(err);
        const res = {
            message : "Coudn't read messages through Kafka..",
            status: 400,
            sucess : false
        }
     callback(null,res)
       // return response.status(400).json({ success: false, message: "Coudn't read messages" });
    });

}


exports.handle_request = handle_request;