var express = require('express');
var Order = require('../models/order');
var Good = require('../models/good');
var router = express.Router();


router.get('/', function (req, res, next) {

    let username = null;

    let orders = null;

    if (req.cookies.user !== null && req.cookies.user != undefined) {
        let user = req.cookies.user;
        username = user.user.username;

        let whereStr = {
            sname: username
        };

        Order.find(whereStr, function (err, orders) {
            res.render('saleOrder', {
                username: username,
                orders: orders
            })
        })


    } else {
        console.log("暂未登录！");
        res.render('saleOrder', {
            username: username,
            orders: orders
        })
    }


})

router.post('/byid', function (req, res, next) {
    let _id = req.body._id;

    Order.findOne({ _id: _id }, function (err, order) {
        if (err) {
            throw err;
        }
        console.log(order);
        res.send(order);

    })
})

router.post('/edit', function (req, res, next) {

    let _id = req.body._id;
    let cname = req.body.cname;
    let ctele = req.body.ctele;
    let caddress = req.body.caddress;

    const updateStr = {
        $set: {
            cname: cname,
            ctele: ctele,
            caddress: caddress
        }
    };

    Order.updateOne({ _id: _id }, updateStr, function (err, results) {
        if (err) {
            throw err;
        }
        console.log("修改成功!");
        res.send('1');
    })

})

router.post('/del', function (req, res, next) {
    let _id = req.body._id;

    Order.deleteOne({ _id: _id }, function (err, results) {
        if (err) {
            throw err;
        }
        console.log("删除成功！");
        res.send('1');
    })
})

router.post('/look', function (req, res, next) {
    let goodId = req.body.goodId;

    Good.findOne({ _id: goodId }, function (err, rows) {
        if(err){
            throw err;
        }
        console.log("rows================",rows);
        res.send(rows);
    })

})



module.exports = router;