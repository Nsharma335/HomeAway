var mongoose =require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/HomeAway');

var User= mongoose.model('User',{
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