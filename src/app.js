const http = require('http');
const chalk = require('chalk');
const conf = require('./config/defultConfig');
console.error(conf.port);
const server = http.createServer((req, res) =>{
    res.statusCode = 200;
    res.setHeader('Cotent-Type', 'test/plain');
    res.end('123');
});

server.listen(conf.port, conf.hostname, () => {
    const addr = `http://${conf.hostname}:${conf.port}`;
    console.info(`Server started at ${chalk.green(addr)}`);
});
