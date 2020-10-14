var express = require('express');
var fs = require('fs');
var Factory = require('../models/factory')
var Good = require('../models/good');
var router = express.Router();

//上传图片的模板
var multer = require('multer');
var upload = multer({ dest: './public/goods/' }) //文件所在路径



router.get('/', function (req, res, next) {
  let username = null;

  let goods = null;

  //查看是否登录
  if (req.cookies.user !== null && req.cookies.user != undefined) {

    let user = req.cookies.user;
    username = user.user.username;

    Good.find({}, function (err, goods) {
      if (err) {
        throw err;
      }

      console.log(goods);
      res.render('superGood',
        {
          username: username,
          goods: goods
        });
    })

  } else {
    console.log("暂未登录！");
    // console.log(users)
    res.render('superGood',
      {

        username: username,
        goods: goods
      });

  }
});


// 新增功能
router.post('/add', upload.single('gImgurl'), function (req, res, next) {
  let gname = req.body.gname;
  let fname = req.body.fname;
  let gtype = req.body.gtype;
  let gprice = parseFloat(req.body.gprice);
  let gInfo = req.body.gInfo;
  let modeln = req.body.modeln;
  let warrantly = req.body.warrantly;
  let pconsum = req.body.pconsum;

  console.log("price====", gprice);

  var oname = req.file.originalname;
  var oldpath = req.file.path;
  var newpath = './public/upload/' + oname;
  var imgUrl = '/upload/' + oname;

  console.log(oname, oldpath);
  console.log("new=====", newpath);
  console.log("imgurl===", imgUrl);

  fs.rename(oldpath, newpath, function (err) {
    if (!err) {
      console.log("上传成功！");
    }
  });

  const whereStr = {
    $and: [
      {
        fname: fname,
        gname: gname

      }
    ]
  };

  const inStr = {
    fname: fname,
    gname: gname,
    gInfo: gInfo,
    gparams: [
      {
        modeln: modeln,
        warrantly: warrantly,
        pconsum: pconsum
      }
    ],
    gtype: gtype,
    gprice: gprice,
    gImgurl: imgUrl
  };

  Factory.find(whereStr, function (err, results) {
    if (err) {
      throw err;
    }

    if (results && results.length > 0) {

      Good.find(whereStr, function (err, good) {

        if (err) {
          throw err;
        }


        if (results[0].fcost < parseFloat(gprice)) {

          if (good && good.length > 0) {
            console.log("已存在该商品！");
            res.send('1');
          } else {

            Good.create(inStr, function (err, row) {

              if (err) {
                throw err;
              }
              console.log("新增成功！");
              res.send('2');

            })

          }

        } else {
          console.log("售价不能低于成本价！")
          res.send('3');
        }


      })

    } else {
      console.log("未有商家提供此商品！");
      res.send('0');
    }
  })

})


// 删除功能
router.post('/del', function (req, res, next) {
  let _id = req.body._id;

  Good.deleteOne({ _id: _id }, function (err, results) {
    if (err) {
      throw err;
    }
    console.log("删除成功！");
    res.send('1');
  })
})


// 把选中的用户显示到模态框功能
router.post('/byid', function (req, res, next) {
  let _id = req.body._id;
  Good.findOne({ _id: _id }, function (err, editInfo) {
    if (err) {
      throw err;
    }
    console.log(editInfo);
    res.send(editInfo);
  })
})


// 编辑功能
router.post('/edit', upload.single('gImgurl'), function (req, res, next) {
  let _id = req.body._id;
  let fname = req.body.fname;
  let gname = req.body.gname;
  let gInfo = req.body.gInfo;
  let gprice = req.body.gprice;
  let modeln = req.body.modeln;
  let warrantly = req.body.warrantly;
  let pconsum = req.body.pconsum;
  let gImgurl = req.body.gImgurl;



  Good.findOne({ _id: _id }, function (err, findInfo) {
    if (err) {
      throw err;

    }
    if (gImgurl != findInfo.gImgurl) {
      let oname = req.file.originalname;
      let oldpath = req.file.path;
      let newpath = './public/upload/' + oname;
      gImgurl = '/upload/' + oname;
      fs.rename(oldpath, newpath, function (err) {
        if (!err) {
          console.log("上传成功！");
        }
      })
    }

    const updateStr = {
      $set: {
        gInfo: gInfo,
        gparams: [
          {
            modeln: modeln,
            warrantly: warrantly,
            pconsum: pconsum
          }
        ],
        gprice: gprice,
        gImgurl: gImgurl
      }
    };

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

      if (results[0].fcost < gprice) {

        Good.updateOne({ _id: _id }, updateStr, function (err, rows) {
          if (err) {
            throw err;
          }
          console.log("编辑成功！");
          res.send('1');
        })

      } else {
        console.log("售价不能低于成本价！")
        res.send('0');

      }
    })

  })
})


// 查找功能
router.post('/find', function (req, res, next) {
  let sInfo = req.body.sInfo;


  const whereStr = {
    gname: { $regex: sInfo, $options: 'i' }
  };
  

  Good.find(whereStr, function (err, results) {
    if (err) {
      throw err;
    }
    console.log(results);
    res.send(results);
  })
})
module.exports = router;