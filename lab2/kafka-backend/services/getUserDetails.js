var db = require('../../backend/db');

function handle_request(msg, callback){
    console.log(msg);
    console.log("msg received for register",msg)
console.log(" ownersListedProperty " + msg);
db.findUser({
    email: msg
},  //success callback of finduser
function (rows) {
    console.log("success callback of get user details");
    if(rows){
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
}},
    function (err) {
        console.log(err);
        const resData = {
            message : "No results found",
            status: 204,
        }
        callback(err,resData)

    });

}

exports.handle_request = handle_request;

