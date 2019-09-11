var express = require('express');
var router = express.Router();
var db = require('../db/index')

router.get('/', function(req, res, next) {
  db.connection.query(`select * from zn_category`, function (error, results, fields) {
    if (error) throw error;
    db.connection.query(`select * from zn_pro where cate_id = '${req.query.id}'`, function (error, proList, fields) {
      if (error) throw error;
      res.render('product/index',{cateList:results,proList:proList,isProList:true});
    });
  });
});
router.get('/proDetail', function(req, res, next) {
  db.connection.query(`select * from zn_category`, function (error, results, fields) {
    if (error) throw error;
    db.connection.query(`select * from zn_pro where id = '${req.query.id}'`, function (error, proDetail, fields) {
      if (error) throw error;
      res.render('product/index',{cateList:results,proDetail:proDetail,isProList:false});
    });
  });
});
module.exports = router;