'use strict';
var mysql = require('mysql');
var crypt = require('./crypt');
var config = require('./settings');
var db = {};

// Creating a connection object for connecting to mysql database
var connection = mysql.createConnection({
    host: config.database_host,
    port: config.database_port,
    user: config.database_user,
    password: config.database_password,
    database: config.database_name,
    socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock'
});

//Connecting to database
connection.connect(function (err) {
    if (err) {
        console.error('error connecting to database: ' + err.stack);
        return;
    }
    console.log('connected as id ' + connection.threadId);
});

db.createUser = function (user, successCallback, failureCallback) {
    var passwordHash;

    crypt.createHash(user.password, function (res) {
        passwordHash = res;

        connection.query("INSERT INTO UserTable VALUES ( " + mysql.escape(user.email) + " , " + mysql.escape(user.firstName) + " , " + mysql.escape(user.lastName) + " , " + mysql.escape(passwordHash) + " ); ",
            function (err) {
                if (err) {
                    console.log(err);
                    failureCallback(err);
                    return;
                }
                successCallback();
            });
    }, function (err) {
        console.log(err);
        failureCallback();
    });
};

db.findUser = function (user, successCallback, failureCallback) {
    // console.log("user inside db " + username + user + user.length + user.password + user.username)
    console.log("inside db find user");

    var sqlQuery = "SELECT * FROM `Homeaway`.`UserTable` WHERE `email` = '" + user.email + "';";
    console.log("query result " + sqlQuery);
    connection.query(sqlQuery, function (err, rows) {
        if (err) {
            failureCallback(err);
            return;
        }
        if (rows.length > 0) {
            successCallback(rows[0])
        } else {
            failureCallback('User not found.');
        }
    });
};

module.exports = db;