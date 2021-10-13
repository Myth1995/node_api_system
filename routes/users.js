var express = require('express');
var router = express.Router();
var User = require("../models/user");


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
    
    User.findOne({"email": req.body.email}, function(err, user_data){
      // console.log(err)
      // console.log(user_data)
			if(err || !user_data){
				let response = {
					status : 402,
					message : "Invalid username and password.",
				};
        console.log(response.status)
        res.json(response)
			} else {
        if (bcrypt.compareSync( req.body.password , user_data.password)) {
            var token = jwt.sign({ user: user_data.username, id: user_data._id } , 'secret' , {expiresIn : 60*60*24}) ;
            res.json({
              	message : "Login Successfully",
              	token	: token ,
                id: user_data._id,
                phonenum: user_data.phonenum,
                directphone: user_data.directphone,
                status : 200 , 
            });
        }
        else {
          res.json({
            message : "Password isn't correct.",
            status : 401 , 
          });
        }
			}
		});
});

module.exports = router;
