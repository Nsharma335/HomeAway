'use strict';
//var mysql = require('mysql');

var crypt = require('./crypt');
var config = require('./settings');
var db = {};
var {User} = require('./models/User');
var {Property} = require('./models/Property');
var mongoose = require("mongoose");
var {mongoose}= require('./db/mongoose');

db.createUser = function (user, successCallback, failureCallback) {
    console.log("registering users in Mongo Database..")
        var passwordHash;
        console.log("email" , user.email)
        crypt.createHash(user.password, function (res) {
            passwordHash = res;
            var newUser = new User({
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                password: passwordHash
            });
            User.findOne({
                email:user.email
            }).then(function(userExist,err){
            if(userExist){
                failureCallback("User already registered")
            }
            else{
        
            newUser.save().then((user)=> {
                console.log("User created in database: ", user);
                successCallback()
                //res.sendStatus(200).end();
            }, (err) => {
                console.log("Error Creating User");
                failureCallback();
                //res.sendStatus(400).end();
            })
        }
        }, function (err) {
            console.log(err);
            failureCallback();
      
    });
})};


db.findUser = function (userInfo, successCallback, failureCallback) {
    console.log("Finding user in database..")
    console.log("user info email"+userInfo.email) 
        User.findOne({
            email: userInfo.email       
        }).then(function(userdata,err){
            if(userdata){
            console.log("userdata is ",userdata)
            successCallback(userdata);}
            else
            {
                console.log("err->",userdata)
                console.log("error is",err)
                failureCallback(err)
            }
        }, function(err) {
            console.log("error is",err)
            failureCallback(err)
        })
};

db.searchProperty = function (property, successCallback, failureCallback) {
    console.log("Data to be find in database.." ,property.data)
    Property.find({
    address: property.data.location,
    availableFrom :{ $lte: property.data.checkin},
    availableTo : {$gte: property.data.checkout} 
    },function (err,propertyFound) {
            if (propertyFound) {
                console.log("successCallback callback 2")
                console.log("rows generated are" + propertyFound)
                successCallback(propertyFound)
                return;
            }
            else if(err){
                console.log("failure callback 2")
                failureCallback('Property Match not found.');
            }   
    }), function(err){
        console.log("Not able to find data in db")
        console.log("error is",err)
        failureCallback(err)
    }
}


db.updateProfile = function (form_values, successCallback, failureCallback) {
    console.log("Updating profile of user in database: " ,form_values)

    User.findOneAndUpdate({ email:  form_values.email},
        {
          $set: {
            firstName: form_values.firstName,
            lastName: form_values.lastName,
            comment: form_values.comment,
            country: form_values.country,
            company: form_values.company,
            school: form_values.school,
            languages: form_values.languages,
            gender: form_values.gender,
            hometown: form_values.hometown,
            phoneNumber: form_values.phoneNumber
          }
        },{ new: true }, function (err, result) {
                if (result) {
                    console.log(result);
                    console.log("in update success block")

                    console.log("result" + result);
                    successCallback();
                    return; //this is so important if we got the result just return , dont execute below calls
                }else if(err)
                {
                console.log(err, "in update failure block error data below")
                failureCallback();
                }

    }), function (err) {
        console.log(err);
        failureCallback();  
    }
}

//mongo
db.submitProperty = function (property, successCallback, failureCallback) {
    console.log("Creating property inside database....")
    console.log("availablefrom",property.availableFrom)
    console.log("availablefrom",property.availableTo)
    var newProperty = new Property({
        address: property.address,
        headline: property.headline,
        description: property.description,
        bedroom: property.bedroom,
        bathroom: property.bathroom,
        accomodates: property.accomodates,
        amenities: property.amenities,
        availableFrom: property.availableFrom,
        availableTo: property.availableTo,
        propertyType: property.propertyType,
        currency: property.currency,
        baseRate: property.baseRate,
        owner: property.email,
    });
    newProperty.save().then((propertyy)=> {
        console.log("Property created : ", propertyy);
        successCallback()
    }, (err) => {
        console.log("Error Creating property");
        failureCallback();
    }), function (err) {
        console.log(err);
        failureCallback();
      }
};

//will be working back on this after kafka....
// db.findProperty = function (property, successCallback, failureCallback) {
//     console.log("fetching properties from Database..")
//     Property.find({
//         _id: property._id
//         }

//     pool.getConnection(function (err, connection) {
//         var sqlQuery = "SELECT * FROM `Homeaway`.`property` WHERE `propertyId` = '" + property._id + "';";
//         console.log("query result " + sqlQuery);
//         connection.query(sqlQuery, function (err, rows) {
//             if (err) {
//                 console.log("failure callback 1")
//                 failureCallback(err);
//                 return;
//             }
//             if (rows.length > 0) {
//                 successCallback(rows[0])
//             }
//             else {
//                 console.log("failure callback 2")
//                 failureCallback('Property not found.');
//             }
//             connection.release();
//         });

//     });
// };


db.findOwnersListedPropertyperty = function (property, successCallback, failureCallback) {
    console.log("owner id " + property.ownerid)
    Property.find({
        owner: property.ownerid       
    }).then(function(property,err){
        if(property){
        console.log("property is ",property)
        successCallback(property);}
        else
        {
            console.log("err->",property)
            console.log("error is",err)
            failureCallback(err)
        }
    }, function(err) {
        console.log("error is",err)
        failureCallback(err)
    })
};



db.findTravelerBookings = function (property, successCallback, failureCallback) {
    console.log("searching booked properties indatabase..")
    pool.getConnection(function (err, connection) {

        var sqlQuery = "Select * from booking INNER JOIN Property on (booking.propertyId = property.propertyId) where TravelerEmail = '"
            + property.travelerId + "'";

        console.log("query result " + sqlQuery);
        connection.query(sqlQuery, function (err, rows) {
            if (err) {
                console.log("failure callback 1")
                failureCallback(err);
                return;
            }
            if (rows.length > 0) {
                successCallback(rows)
            }
            else {
                console.log("failure callback 2")
                failureCallback('Booking not found.');
            }
            connection.release();
        });

    });
};


db.BookProperty = function (property, successCallback, failureCallback) {
    console.log("storing to database...")
    const insertQueryString =
        "INSERT INTO `Homeaway`.`booking` (propertyId,TravelerEmail,checkIn,checkOut) VALUES ( " + mysql.escape(property.propertyId) + " , " +
        mysql.escape(property.travelerId) + " , " +
        mysql.escape(property.checkin) + " , " + mysql.escape(property.checkout) + " ); "
    console.log(insertQueryString);
    pool.getConnection(function (err, connection) {
        connection.query(insertQueryString,
            function (err) {
                if (err) {
                    console.log(err);
                    failureCallback(err);
                    return;
                }
                successCallback();
            },
            function (err) {
                console.log(err);
                failureCallback();
            });
        connection.release();
    });
};








module.exports = db;