var express = require('express');
var proxy = require('http-proxy-middleware');
var port = 3000;

var proxyTable = {
    '/dashboardApi': 'http://localhost:5000',
    '/securityApi': 'http://localhost:3001'
};

var options = {
    target: 'http://localhost:8080/',
    changeOrigin: true,
    ws: true,// proxy websockets
    router: proxyTable,
    pathRewrite: {
        '^/dashboardApi' : '/api',
        '^/securityApi' : '/'
    }
};

var proxyInstance = proxy(options);
var app = express();

app.use(proxyInstance);
app.listen(port);

