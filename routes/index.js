var express = require('express');
var router = express.Router();
const spider = require("../spider/control");
/* GET home page. */
router.get('/api/search/:keywords/:page', function (req, res, next) {
    //res.render('index', { title: 'Express' });
    //HTTP
    let keywords = req.param("keywords");
    let page = req.param("page");
    if (!page) {
        page = 1;
    }
    let data = spider.search(keywords, page, function (data) {
        let json = {};
        json = {
            data: data,
            code: 200,
            msg: "success",
        };
        res.set({
            'Access-Control-Allow-Origin': '*'
        });
        res.json(json);
    });

});
module.exports = router;
