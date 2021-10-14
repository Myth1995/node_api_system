var express = require('express');
var router = express.Router();
var User = require("../models/user");
var BusinessContact = require("../models/businesscontact");


const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
var passwordHash = require('bcrypt-node');
var salt = bcrypt.genSaltSync(10);

/* GET users listing. */
router.post('/register', function(req, res, next) {
  try {
    console.log(req.body)
    if (req.body && req.body.directphone && req.body.password && req.body.email && req.body.phonenum) {
      User.find({ "email" : req.body.email }, (err, data) => {
        if (data.length == 0) {
          const pwd = bcrypt.hashSync(req.body.password, salt);

          let user = new User({
            email : req.body.email ,
			      password : pwd , 
            directphone : req.body.directphone,
            phonenum: req.body.phonenum
          });

          user.save((err, data) => {
            if (err) {
              res.json({
                message: err,
                status: 401,
              });
            } else {
              res.json({
                message: 'Registered Successfully.' ,
                status: 200,
              });
            }
          });

        } else {
          res.json({
            message: `UserName ${req.body.email} Already Exist!`,
            status: 401
          });
        }
      });
    } else {
      res.json({
        message: 'Add proper parameter first!',
        status: 401
      });
    }
  } catch (e) {
    res.json({
      message: 'Something went wrong!',
      status: 401
    });
  }
});

router.post("/login", (req, res) => {
    // console.log(req.body.email);
    BusinessContact.findOne({"elink": req.body.elink}, function(err, user_data){
			if(err || !user_data){
				let response = {
					status : 402,
					message : "Invalid elink.",
				};
        console.log(response.status)
        res.json(response)
			} 
      else {
        console.log(JSON.stringify(user_data));
        console.log(user_data.direct_phone);
        res.json({
            message : "Get Successfully",
            email: user_data.email_address,
            phonenum: user_data.phone_number,
            directphone: user_data.direct_phone,
            status : 200 , 
        });
			}
		});
});

module.exports = router;
