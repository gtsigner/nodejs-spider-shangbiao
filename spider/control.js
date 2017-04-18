/**
 * Created by zhaojunlike on 2017/3/1.
 */
const http = require("http");
const xpath = require('xpath')
    , dom = require('xmldom').DOMParser;
const env = require('jsdom').env;
const jquery = require("jquery");

let searchUrl = "http://www.chatm.com/chatm/getList?keywords=";
exports.search = function (keywords, curPage, callback) {
    //直接去查询数据
    searchUrl += keywords;
    let req = http.request({
        host: "www.chatm.com",
        path: "/chatm/getList?keywords=" + encodeURIComponent(keywords) + `&curPage=` + curPage,
        method: 'GET',
        timeout: 3000,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36"
        }
    }, function (res) {
        res.setEncoding('UTF-8');
        let rawData = '';

        res.on('data', (chunk) => rawData += chunk);
        res.on('end', () => {
            try {
                pasrseData(rawData, callback);
            } catch (e) {
                console.log(e);
            }
        });
    });
    req.on('error', (e) => {
        callback(false);
    });
    req.end();
};
function pasrseData(content, callback) {
    content = content.replace("/\r\n/g", "").replace("/\\r\\n/g", "").replace("/n/g", "").replace("/\\n/g", "").replace("/\\r/g", "").replace("/( )|\n|\r|\t/g", "");
    env(content, function (errors, window) {
        let $ = require('jquery')(window);
        let li = $('#content').find("li");
        let data = {
            result: [],
            page: {},
        };
        //获取分页数据
        //     <input type="hidden" id="totalInit"  value="805">
        //     <input type="hidden" id="pageNumInit"  value="81">
        //     <input type="hidden" id="total"  value="805">
        //     <input type="hidden" id="pageNum"  value="81">
        //     <input type="hidden" id="type"  value="2">
        //     <input type="hidden" id="status"  value="-1">
        //     <input type="hidden" id="msg_hid" value="">
        //     <input type="hidden" id="category" value="">
        //     <input type="hidden" id="categorys" value="">
        //     <input type="hidden" id="searchType" value="2">
        //     <input type="hidden" id="isSubmit" value="">
        //     <input type="hidden" id="token" value="token:2017030209314421790005">
        //     <input type="hidden" id="t" value="23">
        //     <input type="hidden" id="alertRegisterRate" value="0">

        let form = {};
        form.totalInit = $("#totalInit").val();
        form.pageNumInit = $("#pageNumInit").val();
        form.pageNum = $("#pageNum").val();
        form.type = $("#type").val();
        form.status = $("#status").val();
        form.msg_hid = $("#msg_hid").val();
        form.category = $("#category").val();
        form.categorys = $("#categorys").val();
        form.searchType = $("#searchType").val();
        form.categorys = $("#categorys").val();
        form.searchType = $("#searchType").val();
        form.isSubmit = $("#isSubmit").val();
        form.token = $("#token").val();
        form.t = $("#t").val();
        form.alertRegisterRate = $("#alertRegisterRate").val();
        //这个是整个分页数据

        li.each(function () {
            let item = {};
            //商标
            item.url = $(this).find("img").attr("src");
            item.sb = $(this).find(".shangbmc").text();
            //类别
            item.lb = $(this).find(".middle").find("p").eq(1).text().replace("商标类别：", "");
            //注册号
            item.zch = $(this).find(".middle").find("p").eq(2).find("span").eq(0).text();
            //申请日期
            item.sqrq = $(this).find(".middle").find("p").eq(2).find("span").eq(1).text().replace("申请日期：", "");
            item.sqr = $(this).find(".middle").find("p").eq(3).find("span").eq(0).text().replace("申请人：", "").replace(" ", "");
            item.status = $(this).find(".right").text();
            data.result.push(item);
        });
        //其实没必要存库

        data.page = form;
        console.log(data);
        callback(data);
    });
}
