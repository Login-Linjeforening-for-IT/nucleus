const http = require('http')
const app1 = require('./app1')
const server = http.createServer(app1)
server.listen(4000, "localhost")