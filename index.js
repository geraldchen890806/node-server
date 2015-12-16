var gulp = require('gulp'),
    connect = require('gulp-connect'),
    fs = require('fs'),
    path = require('path'),
    url = require('url');
connect.server({
    root: process.cwd(),
    port: '9002',
    livereload: true,
    middleware: function(connect, options) {
        return [
            function(req, res, next) {
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
                res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
                return next();
            },
            function(req, res, next) {
                var pathname = url.parse(req.url).pathname;
                if (!fs.existsSync(path.resolve(options.root, pathname.slice(1)))) {
                    next();
                    res.end(fs.readFileSync(path.resolve(options.root, 'index.html')));
                } else {
                    next();
                }
                return;
            }
        ];
    }
});
