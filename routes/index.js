var express = require('express');
var router = express.Router();
var db = require('../db/index')

router.get('/', function(req, res, next) {
  db.connection.query(`select * from zn_news limit 0,3`, function (error, resNews, fields) {
    if (error) throw error;
    db.connection.query(`select * from zn_carousel`, function (error, resCarousel, fields) {
      if (error) throw error;
      res.render('index/index',{newsList:resNews,carousel:resCarousel});
    });
  });
});

module.exports = router;