var express = require('express');
var router = express.Router();
const http = require("http");
const queryString = require("querystring");
const spider = require("../spider/control");
/* GET home page. */
const API_ROUTES = require('../conf/config');

//http://www.juhe.cn, 13482264559  a12345

//中转商标
router.get('/api/trademark/:keywords/:page', function (req, res, next) {
    //res.render('index', { title: 'Express' });
    //HTTP
    let keywords = req.param("keywords");
    let page = req.param("page");

    let postData = queryString.stringify({
        key: API_ROUTES.trademark.key,
        keyword: keywords,
        pageSize: 50,
        pageNo: page,
    });

    API_ROUTES.trademark.path += postData;

    //中转请求
    let request = http.request(API_ROUTES.trademark, function (response) {
        let json = {};
        let total = "";

        response.on('data', (chunk) => {
            total += chunk;
        });

        response.on('end', () => {
            total = JSON.parse(total);
            json = {
                data: total,
                code: 200,
                msg: "success",
            };
            res.set({
                'Access-Control-Allow-Origin': '*'
            });
            res.json(json);
        });
    });
    request.on('error', (err) => {
        res.end();
    });
    request.end();
});

//中转专利
router.get('/api/patent/:keywords/:page', function (req, res, next) {
    //HTTP
    let keywords = req.param("keywords");
    let page = req.param("page");

    let postData = queryString.stringify({
        key: API_ROUTES.patent.key,
        q: keywords,
        ps: 50,
        p: page,
    });

    API_ROUTES.patent.path += postData;

    //中转请求
    let request = http.request(API_ROUTES.patent, function (response) {
        let json = {};
        let total = "";

        response.on('data', (chunk) => {
            total += chunk;
        });

        response.on('end', () => {
            total = JSON.parse(total);
            json = {
                data: total,
                code: 200,
                msg: "success",
            };
            res.set({
                'Access-Control-Allow-Origin': '*'
            });
            res.json(json);
        });
    });
    request.on('error', (err) => {
        res.end();
    });
    request.end();
});


router.get('/api/back/:keywords/:page', function (req, res, next) {
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
