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
  res.render('admin/index');
});

router.get('/carousel', function(req, res, next) {
  db.connection.query(`select * from zn_carousel`,function (error, results) {
    if (error) throw error;
    res.render('admin/pages/carousel',{carousel:results});
  });
});
router.get('/proCate', function(req, res, next) {
  db.connection.query(`select * from zn_category`,function (error, results) {
    if (error) throw error;
    res.render('admin/pages/proCate',{proCate:results});
  });
});
router.get('/product', function(req, res, next) {
  db.connection.query(`select * from zn_pro`,function (error, resultsPro) {
    if (error) throw error;
    db.connection.query(`select * from zn_category`,function (error, resultsCate) {
      if (error) throw error;
      for(var i in resultsPro){
        for(var j in resultsCate){
          if(resultsPro[i].cate_id == resultsCate[j].id){
            resultsPro[i]["cateName"] = resultsCate[j].category
          }
        }
      }
      res.render('admin/pages/product',{product:resultsPro,proCate:resultsCate});
    });
  });
});
router.get('/news', function(req, res, next) {
  db.connection.query(`select * from zn_news`,function (error, results) {
    if (error) throw error;
    res.render('admin/pages/news',{newsList:results});
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


//——————————————————————————————————————————添加轮播图————————————————————————————————————————
//单个文件上传
router.post('/addCarousel',upload.single('img'), (req,res)=>{
  db.connection.query(`insert into zn_carousel values (null,'/files/${req.file.filename}')`,function (error, results) {
    if (error) throw error;
    res.json({
      code:200,
    })
  });
});
//——————————————————————————————————————————删除轮播图————————————————————————————————————————
//单个文件上传
router.post('/delCarousel',(req,res)=>{
  db.connection.query(`delete from zn_carousel where id = ${req.body.id}`,function (error, results) {
    if (error) throw error;
    res.json({
      code:200,
    })
  });
});
//——————————————————————————————————————————添加新闻————————————————————————————————————————
router.post('/addNews',upload.array('img'), (req,res)=>{
  var news = JSON.parse(req.body.news)
  db.connection.query(`insert into zn_news values (null,'${news.title}','${news.date}','/files/${req.files[0].filename}','${news.newsContent}')`,function (error, results) {
    if (error) throw error;
    res.json({
      code:200,
      msg:"添加成功"
    })
  });
});
//——————————————————————————————————————————删除新闻————————————————————————————————————————
router.post('/delNews',upload.array('img'), (req,res)=>{
  db.connection.query(`delete from zn_news where id = ${req.body.id}`,function (error, results) {
    if (error) throw error;
    res.json({
      code:200,
      msg:"添加成功"
    })
  });
});
//——————————————————————————————————————————编辑新闻————————————————————————————————————————
router.post('/editNews',upload.array('img'), (req,res)=>{
  var news = JSON.parse(req.body.news)
  var sql;
  if(req.files.length == 0){
    sql = `update zn_news set title='${news.title}' , date='${news.date}' , Content='${news.newsContent}' where id=${news.id}`
  }else{
    sql = `update zn_news set title='${news.title}' , date='${news.date}' , Content='${news.newsContent}' , img='/files/${req.files[0].filename}' where id=${news.id}`
  }
  db.connection.query(sql,function (error, results) {
    if (error) throw error;
    res.json({
      code:200,
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
  db.connection.query(`insert into zn_pro values (null,'${pro.proCate}','${pro.proTitle}','${pro.proContent}','/files/${req.files[0].filename}')`,function (error, results) {
    if (error) throw error;
    res.json({
      code:200,
      msg:"添加成功"
    })
  });
});
//——————————————————————————————————————————编辑产品————————————————————————————————————————
router.post('/editPro',upload.array('proImg'), (req,res)=>{
  var pro = JSON.parse(req.body.pro)
  var sql;
  if(req.files.length == 0){
    sql = `update zn_pro set cate_id='${pro.proCate}' , proName='${pro.proTitle}' , proDesc='${pro.proContent}' where id=${pro.id}`
  }else{
    sql = `update zn_pro set cate_id='${pro.proCate}' , proName='${pro.proTitle}' , proDesc='${pro.proContent}' , proImg='/files/${req.files[0].filename}' where id=${pro.id}`
  }
  db.connection.query(sql,function (error, results) {
    if (error) throw error;
    res.json({
      code:200,
    })
  });
});
//——————————————————————————————————————————删除产品————————————————————————————————————————
router.post('/delPro', (req,res,next)=>{
  db.connection.query(`delete from zn_pro where id=${req.body.id}`,function (error, results) {
    if (error) throw error;
    res.json({
      code:200,
    })
  });
});
//——————————————————————————————————————————编辑分类————————————————————————————————————————
router.post('/editCate',(req,res,next)=>{
  db.connection.query(`update zn_category set category = '${req.body.category}' where id = ${req.body.id}`,function (error, results) {
    if (error) throw error;
    res.json({
      code:200
    })
  });
})
//——————————————————————————————————————————删除分类————————————————————————————————————————
router.post('/delCate',(req,res,next)=>{
  db.connection.query(`select * from zn_pro where cate_id = ${req.body.id}`,function (error, results) {
    if (error) throw error;
    if(results.length>0){
      res.json({
        code:400,
        msg:"该分类下有商品,请先转移或删除商品"
      })
    }else{
      db.connection.query(`delete from zn_category where id = ${req.body.id}`,function (error, results) {
        if (error) throw error;
        res.json({
          code:200,
          msg:"删除成功"
        })
      });
    }
  });
  
})
module.exports = router;