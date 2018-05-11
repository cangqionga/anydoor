const http = require('http');
const chalk = require('chalk');
const path = require('path');
const fs = require('fs');
const conf = require('./config/defultConfig');

const server = http.createServer((req, res) =>{
    const filePath = path.join(conf.root, req.url);
    res.write(filePath);
    fs.stat(filePath, (err, starts) =>{
        if (err) {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/plain');
            res.end(`${filePath} is no a directory or file`);
            return;
        }

        if (starts.isFile()) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
            fs.createReadStream(filePath).pipe(res);
        } else if (starts.isDirectory()) {
            fs.readdir(filePath, (err, files) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/plain');
                res.end(files.join(','));
            });
        }
    });
    res.statusCode = 200;
    res.setHeader('Cotent-Type', 'test/plain');
    res.end(filePath);
});

server.listen(conf.port, conf.hostname, () => {
    const addr = `http://${conf.hostname}:${conf.port}`;
    console.info(`Server started at ${chalk.green(addr)}`);
});
