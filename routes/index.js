var express = require('express');
var Good = require('../models/good');
var Reception = require('../models/reception');
var Order = require('../models/order');
var router = express.Router();



router.get('/', function (req, res, next) {
    let username = null;
    let customername = null;
    let ctele = null;
    let caddress = null;


    if (req.cookies.user !== null && req.cookies.user != undefined) {
        let user = req.cookies.user;
        username = user.user.username;

        if (req.cookies.customer != null && req.cookies.customer != undefined) {
            let customer = req.cookies.customer;
            customername = customer.customer.cname;
            ctele = customer.customer.ctele;
            caddress = customer.customer.caddress;

        }

    }
    console.log(customername);

    Good.find({}, function (err, goods) {
        if (err) {
            throw err;
        }
       
        res.render('index',
            {
                username: username,
                customername: customername,
                ctele: ctele,
                caddress: caddress,
                goods: goods

            });
    })
});


// 纪录接待信息

router.post('/saveReception', function (req, res, next) {
    let cname = req.body.cname;
    let ctele = req.body.ctele;
    let caddress = req.body.caddress;
    let ctime = new Date();

    const reception = {
        cname: cname,
        ctele: ctele,
        caddress: caddress,
        ctime: ctime
    }

    Reception.create(reception, function (err, customer) {
        if (err) {
            throw err;
        }
        console.log("新增成功！");
        res.cookie("customer", { customer: customer }, { maxAge: 600000, httpOnly: false });
        res.send('1');

    })


})

// 购买
router.get('/aorders', function (req, res, next) {
    let orders = req.query.orders;

    for (let i = 0; i < orders.length; i++) {
        Order.create(orders[i], function (err, addorder) {
            if(err){
                throw err;
            }
            console.log("新增订单成功！");
        
        })

    }
    res.clearCookie('customer');
    res.send('1');
    
})


// 退出
router.get('/logout', function (req, res, next) {
    res.clearCookie('user');
    res.clearCookie('customer');
    Good.find({}, function (err, goods) {
        if (err) {
            throw err;
        }
        console.log(goods);
        res.render('index',
            {
                username: null,
                customername: null,
                ctele: null,
                caddress: null,
                goods: goods

            });
    })

})


module.exports = router;
