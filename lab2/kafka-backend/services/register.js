var mongoose = require("./mongoose");
//var passwordHash = require('password-hash');
const bcrypt = require("bcrypt");

function handle_request(msg, callback) {
  var res = {};
  console.log("In handle login request:" ,msg);
  console.log("In handle login request:" , msg.password);

  mongoose.User.findOne({ email: msg.email },
    function(err, user, info) {
    console.log("password" + user.password);
    if (err) {
      console.log(err);
    } else {
      if (!user) {
        console.log("not valid user");
        res.code = "404";
        res.value = "user does not exist";
        //done(null,false,{ message: 'user does not exist' });
      } else {
        // var check = passwordHash.verify(msg.password, user.pwd);
        // console.log('check'+check);
        // if (check === true) {
        //     res.code = "200";
        //     res.value = user;
        //     // done(null,{username: username, password: password});
        // }
        // else{
        //     res.code = "401";
        //     res.value = "password incorrect";
        //      //done(null,false,{message: "password incorrect"});
        // }
        bcrypt.compare(msg.password, user.password, function(err, result) {
          console.log("inside ", err, result);
          if (err) {
            res.code = "401";
            res.value =
              "The email and password you entered did not match our records. Please double-check and try again.";
            console.log(res.value);
            res.sendStatus(401).end();
          } else if (result) {
            console.log("test1");
            const payload = {
              email: user.email
            };
            console.log("payload neha", payload);
            // jwt.sign(
            //   payload,
            //   config.secret,
            //   { expiresIn: 8000 },
            //   (err, token) => {
            //     res.json({
            //       success: true,
            //       token: token,
            //       email: user.email,
            //       name: user.name,
            //       type: user.type
            //     });
            //   }
            // );
            res.code = "200";
            res.value = user;
            console.log("response", res);
            callback(null, res);
          }
        });
      }
    }
    //callback(null, res);
  });
}

exports.handle_request = handle_request;
