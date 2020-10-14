var express = require('express');
var Order = require('../models/order');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {

  let username = null;
  let role = null;
  let rows = null;

  if (req.cookies.user !== null && req.cookies.user != undefined) {
    let user = req.cookies.user;
    username = user.user.username;
    role = user.user.role;

    let date = new Date();
    let year = date.getFullYear()
    let start = year + "-01-01T00:00:00Z";
    let end = year + "-12-31T00:00:00Z";

    const aggInfo = [
      {
        $match: {
          "goodtime": {
            '$gte': new Date(start),
            '$lt': new Date(end)
          }
        }
      },

      {
        $group: {
          _id: "$sname",
          price_sum: { $sum: { $multiply: ["$price", "$goodnum"] } },
          cost_sum: { $sum: { $multiply: ["$cost", "$goodnum"] } },
          profit_sum: {
            $sum: { $multiply: [{ $subtract: ["$price", "$cost"] }, "$goodnum"] }
          }
        }
      }
    ]


    Order.aggregate(aggInfo, function (err, rows) {
      if (err) {
        throw err;
      }
      console.log("row=====================", rows);

      res.render('accResult', {
        username: username,
        role: role,
        accounts: rows
      });

    });

  } else {

    console.log("暂未登录！")
    res.render('accResult', {
      username: username,
      role: role,
      accounts: rows
    });

  }

});

router.post('/cost', function (req, res, next) {

  let date = new Date();
  let year_month = date.getFullYear() + '-0' + (date.getMonth() + 1);
  let start = year_month + "-01T00:00:00Z";
  let end = year_month + "-31T00:00:00Z";

  let last_year_month = date.getFullYear() + '-0' + (date.getMonth());
  let last_start = last_year_month + "-01T00:00:00Z";
  let last_end = last_year_month + "-31T00:00:00Z";

  let before_year_month = date.getFullYear() + '-0' + (date.getMonth() - 1);
  let before_start = before_year_month + "-01T00:00:00Z";
  let before_end = before_year_month + "-31T00:00:00Z";


  console.log("start==========================", start);
  console.log("end=============================", end);

  let monthaggInfo = [
    {
      $match: {
        "goodtime": {
          '$gte': new Date(start),
          '$lt': new Date(end)
        }
      }
    },

    {
      $group: {
        _id: "$sname",
        cost_sum: { $sum: { $multiply: ["$cost", "$goodnum"] } },
        profit_sum: { 
          $sum: { $multiply: [{ $subtract: ["$price", "$cost"] }, "$goodnum"] }
         },
      }
    },
    {
      $project: {
        _id: "$_id",
        cost_sum: 1,
        profit_sum: 1,
        start: { '$add': [new Date(start), 0] },
        end: { '$add': [new Date(end), 1] }
      }
    },
  ]

  let last_monthaggInfo = [
    {
      $match: {
        "goodtime": {
          '$gte': new Date(last_start),
          '$lt': new Date(last_end)
        }
      }
    },

    {
      $group: {
        _id: "$sname",
        cost_sum: { $sum: { $multiply: ["$cost", "$goodnum"] } },
        profit_sum: { 
          $sum: { $multiply: [{ $subtract: ["$price", "$cost"] }, "$goodnum"] }
        },
      }
    },
    {
      $project: {
        _id: "$_id",
        cost_sum: 1,
        profit_sum: 1,
        start: { '$add': [new Date(last_start), 0] },
        end: { '$add': [new Date(last_end), 1] }
      }
    },
  ]

  let before_monthaggInfo = [
    {
      $match: {
        "goodtime": {
          '$gte': new Date(before_start),
          '$lt': new Date(before_end)
        }
      }
    },

    {
      $group: {
        _id: "$sname",
        cost_sum: { $sum: { $multiply: ["$cost", "$goodnum"] } },
        profit_sum: { 
          $sum: { $multiply: [{ $subtract: ["$price", "$cost"] }, "$goodnum"] }
         },
      }
    },
    {
      $project: {
        _id: "$_id",
        cost_sum: 1,
        profit_sum: 1,
        start: { '$add': [new Date(before_start), 0] },
        end: { '$add': [new Date(before_end), 1] }
      }
    },
  ]




  Order.aggregate(monthaggInfo, function (err, r1) {
    if (err) {
      throw err;
    }
    Order.aggregate(last_monthaggInfo, function (err, r2) {
      if (err) {
        throw err;
      }
      Order.aggregate(before_monthaggInfo, function (err, r3) {
        if (err) {
          throw err;
        }

        let threeMonth = [];
        if (r1.length > 0) {
          for (let i = 0; i < r1.length; i++) {
            threeMonth[i] = r1[i];
          }
        }

        if (r2.length > 0) {
          for (let i = threeMonth.length, j = 0; i < r1.length + r2.length; i++) {
            threeMonth[i] = r2[j];
            j++;
          }
        }

        if (r3.length > 0) {
          for (let i = threeMonth.length, j = 0; i < r1.length + r2.length + r3.length; i++) {
            threeMonth[i] = r3[j];
            j++;
          }
        }
        console.log("threeMonth-=====================", threeMonth);
        res.send(threeMonth)
      });


    })
  })


})

module.exports = router;
