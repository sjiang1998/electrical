var express = require('express');
var Good = require('../models/good')
var router = express.Router();



router.get('/', function (req, res, next) {
    let username = null;

    let searInfo = req.query.searInfo;

    if (req.cookies.user !== null && req.cookies.user != undefined) {
        let user = req.cookies.user;
        username = user.user.username;


    }
    if (searInfo) {
        console.log("s====================", searInfo)
        const whereStr = {
            $or: [
                { "gname": { $regex: searInfo, $options: 'i' } },
                { "gInfo": { $regex: searInfo, $options: 'i' } }]
        };
        Good.find(whereStr, function (err, rows) {
            if (err) {
                throw err;
            }

            res.render('saleSearch',
                {
                    username: username,
                    searInfo: searInfo,
                    Info: rows
                })

        })
    } else {
        res.render('saleSearch',
            {
                username: username,
                searInfo: searInfo
            })
    }

});

module.exports = router;