var express = require('express');
var router = express.Router();
var db = require('../db/index')

router.get('/', function(req, res, next) {
  // 10*req.query.page
  var page = req.query.page
  var size = 4
  db.connection.query(`select * from zn_news limit ${size*(page-1)},${size}`, function (error, resData, fields) {
    if (error) throw error;
    db.connection.query(`select count(*) from zn_news`, function (error, resTot, fields) {
      if (error) throw error;
      console.log(resData)
      res.render('news/index',{newsList:resData,total:resTot[0]['count(*)'],currentPage:page,size:size});
    });
  });
});
router.get('/singleNews', function(req, res, next) {
  db.connection.query(`select * from zn_news where id = ${req.query.id}`, function (error, results, fields) {
    if (error) throw error;
    res.render('news/singleNews',{singleNews:results});
  });
});

module.exports = router;