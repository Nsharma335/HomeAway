'use strict';
//var mysql = require('mysql');

var crypt = require('./crypt');
var config = require('./settings');
var db = {};
var {User} = require('./models/user');
var {Property} = require('./models/properties');
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
                console.log("User created : ", user);
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
    // pool.getConnection(function (err, connection) {
    //     var sqlQuery = "SELECT * FROM `Homeaway`.`UserTable` WHERE `email` = '" + user.email + "';";
    //     console.log("query ", sqlQuery);
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

// db.searchProperty = function (property, successCallback, failureCallback) {
//     console.log(property)
//     var data = {};
//     pool.getConnection(function (err, connection) {
//         console.log("Searching property in database");
//         console.log(property)

//         var sqlQuery = "SELECT * FROM `Homeaway`.`property` WHERE address = '" + property.data.location + "' and availableFrom <= '" + property.data.checkin + "' and availableTo >='" + property.data.checkout + "' ;";
//         console.log(sqlQuery);
//         connection.query(sqlQuery, function (err, rows) {
//             if (err) {
//                 console.log("failure callback 1")
//                 failureCallback(err);
//                 return;
//             }
//             if (rows.length > 0) {
//                 console.log("successCallback callback 2")
//                 console.log("rows generated are" + rows)
//                 successCallback(rows)
//             }
//             else {
//                 console.log("failure callback 2")
//                 failureCallback('Property Match not found.');
//             }
//             connection.release();
//         });

//     });

// };

db.updateProfile = function (form_values, successCallback, failureCallback) {
    console.log("Updating profile of user : " + form_values.firstName)
    pool.getConnection(function (err, connection) {
        var sql = "UPDATE UserTable SET firstName = '" + form_values.firstName + "', lastName = '" + form_values.lastName +
            "', comment='" + form_values.comment + "', country='" + form_values.country + "', company='" + form_values.company +
            "',  school='" + form_values.school + "', hometown='" + form_values.hometown + "', languages='" + form_values.languages +
            "', gender='" + form_values.gender + "' where email='" + form_values.email + "'";

        console.log(sql);
        connection.query(sql,
            function (err, result) {
                if (err) {
                    console.log(err);
                    console.log("in update failure block")
                    failureCallback(err);
                    return;
                }
                console.log("in update success block")
                console.log("result" + result);
                successCallback();
            });

    }, function (err) {
        console.log(err);
        failureCallback();  //callback of update profile
    });
    //connection.release();
};



// db.submitProperty = function (property, successCallback, failureCallback) {
//     console.log("Creating property inside database....")
//     const insertQueryString =
//         "INSERT INTO `Homeaway`.`property` (address,headline,description,bedroom,bathroom,accomodates,amenities,availableFrom,availableTo,propertyType,currency,baseRate,owner) VALUES ( " + mysql.escape(property.address) + " , " +
//         mysql.escape(property.headline) + " , " +
//         mysql.escape(property.description) + " , " + mysql.escape(property.bedroom) + " , " +
//         mysql.escape(property.bathroom) + " , " + mysql.escape(property.accomodates) + " , " +
//         mysql.escape(property.amenities) + " , " + mysql.escape(property.availableFrom) + " , " +
//         mysql.escape(property.availableTo) + " , " +
//         mysql.escape(property.propertyType) + " , " + mysql.escape(property.currency) + " , " +
//         mysql.escape(property.baseRate) + " , " + mysql.escape(property.email) + " ); "

//     pool.getConnection(function (err, connection) {
//         connection.query(insertQueryString,
//             function (err) {
//                 if (err) {
//                     console.log(err);
//                     failureCallback(err);
//                     return;
//                 }
//                 console.log("Property Created successfully")
//                 console.log(insertQueryString);
//                 successCallback();
//             },
//             function (err) {
//                 console.log(err);
//                 failureCallback();
//             });
//         connection.release();
//     });
// };

db.submitProperty = function (property, successCallback, failureCallback) {
    console.log("Creating property inside database....")
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


db.findProperty = function (property, successCallback, failureCallback) {
    console.log("fetching properties from Database..")
    pool.getConnection(function (err, connection) {
        var sqlQuery = "SELECT * FROM `Homeaway`.`property` WHERE `propertyId` = '" + property.id + "';";
        console.log("query result " + sqlQuery);
        connection.query(sqlQuery, function (err, rows) {
            if (err) {
                console.log("failure callback 1")
                failureCallback(err);
                return;
            }
            if (rows.length > 0) {
                successCallback(rows[0])
            }
            else {
                console.log("failure callback 2")
                failureCallback('Property not found.');
            }
            connection.release();
        });

    });
};


db.findOwnersListedPropertyperty = function (property, successCallback, failureCallback) {
    console.log("owner id " + property.ownerid)
    pool.getConnection(function (err, connection) {
        var sqlQuery = "SELECT * FROM `Homeaway`.`property` WHERE `owner` = '" + property.ownerid + "';";
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
                failureCallback('Property not found.');
            }
            connection.release();
        });

    });
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