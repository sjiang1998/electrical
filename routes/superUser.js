var express = require('express');
var User = require('../models/users');
var router = express.Router();

//导入加密模块
var crypto = require("crypto");


//显示人员信息
router.get('/', function (req, res, next) {

  let username = null;
  let date = [];
  let users = null;
  //查看是否登录
  if (req.cookies.user !== null && req.cookies.user != undefined) {

    let user = req.cookies.user;
    username = user.user.username;

    User.find({}, function (err, users) {
      console.log(users);

      //修改注册时间格式
      for (let i = 0; i < users.length; i++) {

        let day = users[i].regdate;
        let time = day.getFullYear() + '-' + (day.getMonth() + 1) + '-' + day.getDate();
        date[i] = time;
      }

      res.render('superUser',
        {
          users: users,
          username: username,
          date: date
        });
    })


  } else {
    console.log("暂未登录！");
    console.log(users)
    res.render('superUser',
      {
        users: users,
        username: username,
        date: date
      });

  }

});




//新增功能
router.post('/add', function (req, res, next) {

  // 获取前端传值
  let addName = req.body.addName;

  let addPass = req.body.addPass;
  //对密码进行加密
  let md5 = crypto.createHash("md5");
  let newPas = md5.update(addPass).digest("hex");

  let addRole = req.body.addRole;

  let regDate = new Date();
  console.log(regDate);

  // 新增用户数据，状态默认为1，即"启用"
  const user = {
    username: addName,
    password: newPas,
    role: addRole,
    regdate: regDate
  };

  // 为保证用户名唯一性，先进行数据库查询，若已经存在该用户名，则返回0
  User.findOne({ username: addName }, function (err, results) {
    if (results) {
      res.send('0');
    } else {

      // 无重复状况，返回1
      User.create(user, function (err, rows) {
        if (err) {
          throw err;
        }
        console.log("新增成功！");
        res.send('1');
      })
    }
  })

});




//删除功能
router.post('/del', function (req, res, next) {

  let _id = req.body._id;


  User.deleteOne({ _id: _id }, function (err, results) {
    if (err) {
      throw err;
    }
    console.log("删除成功！");
    res.send('1');
  })

});




//把选中的用户显示到模态框功能
router.post('/byedit', function (req, res, next) {
  let _id = req.body._id;
  console.log(_id);

  User.findOne({ _id: _id }, function (err, editInfo) {
    if (err) {
      throw err;
    }
  
    res.send(editInfo);
  })
});




//编辑功能
router.post('/edit', function (req, res, next) {
  let _id = req.body._id;
  let role = req.body.editrole;

  User.updateOne({ _id: _id }, { role: role }, function (err, results) {
    if (err) {
      throw err;
    }
    console.log("修改成功！");
    res.send('1');
  })
  console.log(_id, role)
});




//修改状态功能
router.post('/changestatus', function (req, res, next) {
  let _id = req.body._id;
  User.findOne({ _id: _id }, function (err, users) {
    if (err) {
      throw err;
    }
    if (users.status == 1) {
      User.updateOne({ _id: _id }, { status: 0 }, function (err, results) {
        if (err) {
          throw err;
        }
        console.log("修改状态成功！已被禁用");
        res.send('0');
      })
    } else {
      User.updateOne({ _id: _id }, { status: 1 }, function (err, results) {
        if (err) {
          throw err;
        }
        console.log("修改状态成功！已被启用");
        res.send('1');
      })
    }
  })
});


//查找信息
router.post('/search', function (req, res, next) {
  let sInfo = req.body.sInfo;
  console.log(sInfo);

  const whereStr = { username: { $regex: sInfo } };
  User.find(whereStr, function (err, userInfos) {
    if (err) {
      throw err;
    }
    console.log(userInfos);
    res.send(userInfos);
  })
})


module.exports = router;
