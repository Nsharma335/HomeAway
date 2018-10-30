var db = require('../../backend/db');

function handle_request(msg, callback){
    console.log("Sending message to owner through kafka server...")
    console.log("msg received",msg);

    var messageObject = {
        propertyData: msg.property,
        firstName: msg.firstName,
        lastName:  msg.lastName,
        travelerEmail: msg.travelerEmail,
        messageData: msg.message
    };

    console.log(messageObject);

    db.SendMessageToOwner(messageObject, function(result) {
        console.log("Message data",result)
        const resData = {
            message : "Message sent..",
            status: 200,
            rows : result
        }
     callback(null,resData)
        //response.status(200).json({ success: true, message: 'Message sent.' });
    }, function (err) {
        console.log(err);
        const resData = {
            message : "Coudn't send messages",
            status: 400,
        }
        //response.status(204).json({ success: true, rows: resData });
       callback(err,resData)
       // return response.status(400).json({ success: false, message: "Coudn't send messages" });
    });

}

exports.handle_request = handle_request;