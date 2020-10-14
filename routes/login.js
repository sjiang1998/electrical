var express = require('express');
var User = require('../models/users');
var router = express.Router();

var crypto = require("crypto");


router.get('/', function (req, res, next) {

    res.render('login');
});

router.post('/', function (req, res, next) {
    let username = req.body.username;
    let password = req.body.password;
    let role = req.body.role;

    var md5 = crypto.createHash("md5");
    var newPas = md5.update(password).digest("hex");

    let flag = 0;

    User.findOne({ username: username }, function (err, user) {
        if (err) {
            throw err;
        }

        // 判断是否存在该用户名
        if (user) {
            console.log(user.password);

            if (user.password == newPas) {   // 判断密码是否正确
                if (user.role == role) {   // 判断身份是否正确
                    if (user.status == 1) {   //判断是否被禁用
                        res.cookie("user", { user: user }, { maxAge: 600000, httpOnly: false });
                        res.send('4');
                    } else {
                        res.send('3');
                        console.log("该用户被禁用！")
                    }
                } else {
                    res.send('2');
                    console.log("身份错误！");
                }

            } else {
                res.send('1');
                console.log("密码错误！");
            }

        } else {
            res.send('0');
            console.log("未找到该用户！");
        }


    })

})

module.exports = router;
