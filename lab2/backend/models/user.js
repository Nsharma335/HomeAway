var mongoose =require('mongoose');

var User= mongoose.model('',{
    email :{
        type : String
    },
    password :{
        type : String
    }
},"User")

module.exports = {User};