var http = require('http');
var URL = require('url');
var fs = require('fs');
var path = require('path');

var mine = {
  "css": "text/css",
  "gif": "image/gif",
  "html": "text/html",
  "ico": "image/x-icon",
  "jpeg": "image/jpeg",
  "jpg": "image/jpeg",
  "js": "text/javascript",
  "json": "application/json",
  "pdf": "application/pdf",
  "png": "image/png",
  "svg": "image/svg+xml",
  "swf": "application/x-shockwave-flash",
  "tiff": "image/tiff",
  "txt": "text/plain",
  "wav": "audio/x-wav",
  "wma": "audio/x-ms-wma",
  "wmv": "video/x-ms-wmv",
  "xml": "text/xml"
};

http.createServer(function (req, res) {
  var pathname = URL.parse(req.url).pathname;
  var filename = path.join(__dirname, pathname);
  if (pathname === '/') {
    // 直接输出index.html页面
    filename = path.join(__dirname, 'index.html');
  }
  if (pathname !== '/favicon.ico') {
    fs.exists(filename, function (exist) {
      if (!exist) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('This file is not exist');
      } else {
        fs.stat(filename, function (err, files) {
          if (err) throw err;

          if (files.isFile()) {
            var ext = path.extname(pathname).substr(1) || 'html';
            fs.readFile(filename, 'utf-8', function (err, data) {
              if (err) throw err;
              res.writeHead(200, { 'Content-Type': mine[ext] });
              res.end(data);
            })
          }

          if (files.isDirectory()) {
            // 展示出文件夹中所有的文件
            fs.readdir(filename, function (err, files) {
              if (err) throw err;
              var itemHtml = '';
              files.forEach(function (item, index) {
                itemHtml += `<p><a href="${pathname}/${item}">${item}</a></p>`;
              });
              res.writeHead(200, { 'Content-Type': 'text/html' });
              res.end(itemHtml);
            })
          }
        })
      }
    });
  } else {
    res.end(null);
  }
}).listen(8080);