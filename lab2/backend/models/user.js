var mongoose =require('mongoose');

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
            },
    phoneNumber: {
        type : Number
        },
    comment :{
        type : String
    },
    country :{
        type : String
    },
    company: {
        type : String
    },
    school: {
        type : String
            },
    hometown: {
        type : String
        },
    languages: {
        type : String
            },
    gender: {
        type : String
        },
    
    MessageData:{
            senderEmail: String,
            senderFirstName: String,
            senderLastName:String,
            message:String,
            created_on: Date,
            propertyData: [],
        }
},"User")

module.exports = {User};