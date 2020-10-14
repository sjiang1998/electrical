var express = require('express');
var Order = require('../models/order');
var Factory = require('../models/factory');

var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {

  let username = null;
  let factories = null;
  let orders = null;

  if (req.cookies.user !== null && req.cookies.user != undefined) {
    let user = req.cookies.user;
    username = user.user.username;

    let _id = req.query.id;
    let ord = {};


    Order.find({}, function (err, orders) {
      if (err) {
        throw err;
      }

      for (let i = 0; i < orders.length; i++) {
        if (orders[i]._id == _id) {
          ord = orders[i]
        }
      }


      const whereStr = {
        gname: ord.goodname,
        fname: ord.fname
      }



      Factory.find(whereStr, function (err, factories) {
        if (err) {
          throw err;
        }

        res.render('goodBuy',
          {
            _id: _id,
            username: username,
            factories: factories,
            order: ord,
            orders: orders
          });
      })


    })



  } else {
    console.log("暂未登录！");
    res.render('goodBuy',
      {
        _id: null,
        username: username,
        factories: factories,
        order: null,
        orders: orders
      })
  }


});

router.post('/sureorder', function (req, res, next) {
  let _id = req.body._id;
  let cost = req.body.cost;
  let faddress = req.body.faddress;

  const updateStr = {
    $set: {
      cost: cost,
      faddress: faddress,
      goodstatus: "生产中"
    }
  }

  Order.updateOne({ _id: _id }, updateStr, function (err, results) {
    if (err) {
      throw err;
    }
    console.log("修改成功！");
    res.send('1');
  })

})

router.post('/changestatus', function (req, res, next) {
  let _id = req.body._id;

  Order.findOne({ _id: _id }, function (err, results) {
    if (err) {
      throw err;
    }

    let updateStr = {};

    if (results.goodstatus == "生产中") {
      updateStr = { goodstatus: "派送中" };
    } else {
      updateStr = { goodstatus: "已送达" };
    }

    Order.updateOne({ _id: _id }, updateStr, function (err, rows) {
      if (err) {
        throw err;
      }
      console.log("修改状态成功！")
      res.send('1');
    })

  })
})

router.post('/byid', function (req, res, next) {
  let _id = req.body._id;
  Order.findOne({ _id: _id }, function (err, results) {
    if (err) {
      throw err;
    }
    res.send(results);
  })
})

router.post('/find', function (req, res, next) {
  let sInfoId = req.body.sInfo;
  let _id;
  let matchId;
  let order = [];


  Order.find({}, function (err, results) {
    if (err) {
      throw err;
    }

    for (let i = 0; i < results.length; i++) {
      _id = String(results[i]._id);
      matchId = _id.substring(_id.length - 4, _id.length);
      if (matchId == sInfoId) {
        order = results[i];
      } 
    }
    console.log("order================================",order);
    res.send(order);
  })

})

module.exports = router;