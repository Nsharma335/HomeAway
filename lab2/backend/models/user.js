var mongoose =require('mongoose');

var User= mongoose.model('',{
    email :{
        type : String
    },
    password :{
        type : String
    },
    firstName: {
        type : String
    },
    lastName: {
        type : String
            }
},"User")

module.exports = {User};