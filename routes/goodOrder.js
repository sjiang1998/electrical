var express = require('express');
var Order = require('../models/order');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  let username = null;

  let orders = null;

  if (req.cookies.user !== null && req.cookies.user != undefined) {
    let user = req.cookies.user;
    username = user.user.username;

    Order.find({}, function (err, orders) {
      if (err) {
        throw err;
      }
      res.render('goodOrder',
        {
          username: username,
          orders: orders
        })
    })
  } else {

    console.log("暂未登录！");

    res.render('goodOrder',
      {
        username: username,
        orders: orders
      })

  }
});

router.post('/byid', function (req, res, next) {
  let _id = req.body._id;
  Order.findOne({ _id: _id }, function (err, results) {
    if (err) {
      throw err;
    }
    
    res.send(results);
  })

})

module.exports = router;