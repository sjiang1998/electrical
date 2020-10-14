var express = require('express');
var Good = require('../models/good');
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

    let _id = req.query.id;

    Good.findOne({ _id: _id }, function (err, result) {
        if (err) {
            throw err;
        }
        res.render('saleDetail', {
            username: username,
            customername: customername,
            ctele: ctele,
            caddress: caddress,
            good: result
        })
    })

});

module.exports = router;