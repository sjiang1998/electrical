var express = require('express');
var User = require('../models/users');

var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  let username = null;
  let users = null;
  let role = null;

  if (req.cookies.user !== null && req.cookies.user != undefined) {
    let user = req.cookies.user;
    username = user.user.username;
    role = user.user.role;

    User.find({}, function (err, users) {
      res.render('accFinancial', {
        username: username,
        role: role,
        users: users
      });
    })
  } else {

    console.log("暂未登录！");
    res.render('accFinancial', {
      username: username,
      role: role,
      users: users
    });
  }

});

router.post('/find', function (req, res, next) {
  let sInfo = req.body.sInfo;

  const whereStr = { username: { $regex: sInfo } };

  User.find(whereStr, function (err, user) {
    if (err) {
      throw err;
    }
    res.send(user);
  })

})

module.exports = router;
