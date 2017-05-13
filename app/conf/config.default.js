/**
 * Created by zhaojunlike on 2017/5/13.
 */


exports.API_ROUTES = {
    trademark: {
        hostname: 'japi.juhe.cn',
        port: 80,
        path: '/trademark/search?',
        method: 'GET',
        key: "",
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
        key: "",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36"
        }
    },
};
