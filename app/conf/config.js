/**
 * Created by zhaojunlike on 2017/5/13.
 */

//http://www.juhe.cn, 13482264559  a12345
exports.API_ROUTES = {
    trademark: {
        hostname: 'japi.juhe.cn',
        port: 80,
        path: '/trademark/search?',
        method: 'GET',
        key: "6685f44a8611ea8fae3b71317fc64d25",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36"
        }
    },
    patent: {
        hostname: 'v.juhe.cn',
        port: 80,
        path: '/patent/search.php?',
        method: 'GET',
        key: "e9135f40a861b8d5f52cab763f0a30d1",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36"
        }
    },
};
