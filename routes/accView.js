var express = require('express');
var Order = require('../models/order');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  let username = null;
  let role = null;
  let orders = null;
  let sname = null;

  if (req.cookies.user !== null && req.cookies.user != undefined) {
    let user = req.cookies.user;
    username = user.user.username;
    role = user.user.role;

    let sname = req.query.name;

    Order.find({ sname: sname }, function (err, orders) {
      if (err) {
        throw err;
      }

      res.render('accView', {
        username: username,
        sname: sname,
        role: role,
        orders: orders
      });
    })

  } else {

    console.log("暂未登录！");
    res.render('accView', {
      username: username,
      sname: sname,
      role: role,
      orders: orders
    });

  }

});

router.post('/profit', function (req, res, next) {
  let sname = req.body.sname;
  console.log("sname==================", sname);

  const snameInfo = [
    {
      $match: {
        "sname": sname
      }
    },

    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m", date: "$goodtime" } },
        profit_sum: {
          $sum: { $multiply: [{ $subtract: ["$price", "$cost"] }, "$goodnum"] }
        }
      }
    },
    {
      $project: {
        _id: "$_id",
        profit_sum: 1,
        
      }
    },
    {
      $sort: {
        '_id': 1
      }
    }
  ]

  Order.aggregate(snameInfo, function (err, rows) {
    if (err) {
      throw err;
    }
    res.send(rows);
  })
})

module.exports = router;
