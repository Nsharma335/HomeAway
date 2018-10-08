'use strict';
// Include our packages in our main server file
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
const math = require("math");


const port = 5001;
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
});
// Use body-parser to get POST requests for API use
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

app.post('/', function (request, response) {

    var data = request.body.expression;
    let result = eval(data)
    if (result !== undefined) {
        result = result.toFixed(2);
    }
    console.log(result)
    response.json({ succes: true, result: result });

});

app.listen(port);
console.log("Server running on port:" + port);









