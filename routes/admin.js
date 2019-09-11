var express = require('express');
var router = express.Router();
var multer = require('multer');
var db = require('../db/index')
//文件上传的配置
var upload = multer({
  storage:multer.diskStorage({
    limits:{
      fileSize:10*10000000
    },
    destination:function (req,file,cb) {
      cb(null,'./public/files');
    },
    filename:function(req,file,cb){
      cb(null,new Date().getTime()+"_"+file.originalname);
    }
  })
})
//权限控制
router.all("*",(req,res,next)=>{
  if(req.cookies.uuid){
    if(req.url == '/login'){
      res.redirect('/admin')
    }else{
      next();
    }
  }else{
    if(req.url == '/login'){
      next();
    }else{
      res.redirect('/admin/login')
    }
  }
})

router.get('/', function(req, res, next) {
  db.connection.query(`select * from zn_category`,function (error, results) {
    if (error) throw error;
    res.render('admin/index',{proCate:results});
  });
});

router.get('/login', function(req, res, next) {
  res.render('admin/login');
});


// 登录接口
router.post('/login',(req,res,next)=>{
  db.connection.query(`select * from zn_adminer where email = '${req.body.email}' and passwd = '${req.body.passwd}'`, function (error, results, fields) {
    if (error) throw error;
    let resData = {
      code:0,
    }
    if(results[0]&&results[0].id){
      res.cookie('uuid',results[0].id)
      resData.code = 200;
      res.json(resData)
    }else{
      resData.code = 400;
      resData.msg = "邮箱或密码错误"
      res.json(resData)
    }
  });
})


//——————————————————————————————————————————添加新闻————————————————————————————————————————
//单个文件上传
router.post('/addNews',upload.array('img'), (req,res)=>{
  var news = JSON.parse(req.body.news)
  db.connection.query(`insert into zn_news values (null,'${news.title}','${news.date}','files/${req.files[0].filename}','${news.newsContent}')`,function (error, results) {
    if (error) throw error;
    res.json({
      code:200,
      msg:"添加成功"
    })
  });
});

//——————————————————————————————————————————添加产品分类——————————————————————————————————————
router.post('/addCate',(req,res,next)=>{
  db.connection.query(`insert into zn_category values (null,'${req.body.category}')`,function (error, results) {
    if (error) throw error;
    res.json({
      code:200,
      msg:"添加成功"
    })
  });
})

//——————————————————————————————————————————添加产品————————————————————————————————————————
//单个文件上传
router.post('/addPro',upload.array('proImg'), (req,res)=>{
  var pro = JSON.parse(req.body.pro)
  console.log(pro)
  db.connection.query(`insert into zn_pro values (null,'${pro.proCate}','${pro.proTitle}','${pro.proContent}','files/${req.files[0].filename}')`,function (error, results) {
    if (error) throw error;
    console.log(results);
    res.json({
      code:200,
      msg:"添加成功"
    })
  });
});
module.exports = router;