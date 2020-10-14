var express = require('express');
var Factory = require('../models/factory');
var Good = require('../models/good');
var router = express.Router();


router.get('/', function (req, res, next) {
    let username = null;
    let factories = null;
    //查看是否登录
    if (req.cookies.user !== null && req.cookies.user != undefined) {

        let user = req.cookies.user;
        username = user.user.username;
        Factory.find({}, function (err, factories) {
            if (err) {
                throw err;
            }
            console.log(factories);
            res.render('superFactory',
                {
                    username: username,
                    factories: factories
                });

        })

    } else {
        console.log("暂未登录！");
        // console.log(users)
        res.render('superFactory',
            {

                username: username,
                factories: factories
            });

    }

});


// 新增功能
router.post('/add', function (req, res, next) {
    let fname = req.body.fname;
    let faddress = req.body.faddress;
    let gname = req.body.gname;
    let fprice = req.body.fprice;

    console.log(fname, faddress, gname, fprice);
    const factory = {
        fname: fname,
        gname: gname,
        faddress: faddress,
        fcost: fprice
    };

    const whereStr = {
        $and: [
            {
                fname: fname,
                gname: gname

            }
        ]
    };

    Factory.findOne(whereStr, function (err, results) {
        if (err) {
            throw err;
        }
        if (results) {
            console.log("find it!");
            res.send('0');
        } else {
            Factory.create(factory, function (err, row) {
                if (err) {
                    throw err;
                }
                console.log("新增成功！");
                res.send('1');
            })
        }
    })
})


// 把选中的用户显示到模态框功能
router.post('/byid', function (req, res, next) {
    let _id = req.body._id;
    Factory.findOne({ _id: _id }, function (err, editInfo) {
        if (err) {
            throw err;
        }

        res.send(editInfo);
    })
})


// 编辑功能
router.post('/edit', function (req, res, next) {
    let flag = 1;

    let _id = req.body._id;
    let fname = req.body.fname;
    let gname = req.body.gname;
    let faddress = req.body.faddress;

    const whereStr = {
        $and: [
            {
                fname: fname,
                gname: gname

            }
        ]
    };


    Factory.find(whereStr, function (err, results) {
        if (err) {
            throw err;
        }
        for (let i = 0; i < results.length; i++) {

            if (results[i].faddress == faddress) {
                flag = 0;
                res.send('0');
            }
        }

        console.log(flag);
        if (flag) {
            Factory.updateOne({ _id: _id }, { faddress: faddress }, function (err, results) {
                if (err) {
                    throw err;
                }
                console.log("修改成功！");
                res.send('1');
            })
        }


    })


})

// 新增商品地址
router.post('/addressadd', function (req, res, next) {

    let flag = 1;

    let fname = req.body.fname;
    let gname = req.body.gname;
    let faddress = req.body.faddress;
    let fcost = req.body.fcost;

    console.log(fname, gname, faddress, fcost);
    const whereStr = {
        $and: [
            {
                fname: fname,
                gname: gname

            }
        ]
    };

    const updateStr = {
        fname: fname,
        gname: gname,
        faddress: faddress,
        fcost: fcost
    }

    Factory.find(whereStr, function (err, results) {
        if (err) {
            throw err;
        }
        for (let i = 0; i < results.length; i++) {

            if (results[i].faddress == faddress) {
                flag = 0;
                res.send('0');
            }
        }

        if (flag) {
            Factory.create(updateStr, function (err, row) {
                if (err) {
                    throw err;
                }
                console.log("新增成功！");
                res.send('1');
            })
        }


    })

})

// 查看相关信息
router.post('/find', function (req, res, next) {
    let fname = req.body.sfname;
    let gname = req.body.sgname;

    const whereStr = {
        $and: [
            {
                fname: fname,
                gname: { $regex: gname, $options: 'i' }

            }
        ]
    };

    Factory.find(whereStr, function (err, results) {
        if (err) {
            throw err;
        }
        console.log(results);
        res.send(results);
    })

})

// 删除
router.post('/del', function (req, res, next) {

    let _id = req.body._id;

    Factory.findOne({ _id: _id }, function (err, delInfo) {
        if (err) {
            throw err;
        }

        const whereStr = {
            $and: [
                {
                    fname: delInfo.fname,
                    gname: delInfo.gname

                }
            ]
        };

        Good.deleteOne(whereStr, function (err, results) {
            if (err) {
                throw err;
            }
            console.log("goods表删除成功");
        });
        
        Factory.deleteOne({ _id: _id }, function (err, results) {
            if (err) {
                throw err;
            }
            console.log("删除成功！");
            res.send('1');
        });


    })



});

module.exports = router;
