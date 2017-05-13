var express = require('express');
var router = express.Router();
const http = require("http");
const queryString = require("querystring");
const spider = require("../spider/control");
/* GET home page. */
const API_ROUTES = require('../conf/config').API_ROUTES;

//中转商标
router.get('/api/v2/trademark/:keywords/:page', function (req, res, next) {
    //res.render('index', { title: 'Express' });
    //HTTP
    let keywords = req.param("keywords");
    let page = req.param("page");

    let postData = queryString.stringify({
        key: API_ROUTES.trademark.key,
        keyword: keywords,
        pageSize: 20,
        pageNo: page,
        searchType: 1
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

//商标详细
router.get('/api/v2/trademark/detail/:regNo/:intCls', function (req, res, next) {
    //res.render('index', { title: 'Express' });
    //HTTP
    let regNo = req.param("regNo");
    let intCls = req.param("intCls");

    let postData = queryString.stringify({
        key: API_ROUTES.trademark_detail.key,
        regNo: regNo,
        intCls: intCls,
    });

    API_ROUTES.trademark_detail.path += postData;

    //中转请求
    let request = http.request(API_ROUTES.trademark_detail, function (response) {
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
router.get('/api/v2/patent/:keywords/:page', function (req, res, next) {
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


//商标Spider采集
router.get('/api/v1/trademark/:keywords/:page', function (req, res, next) {
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
