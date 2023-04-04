const eventEmmiter = require('events');
const http = require('http');
class Sales extends eventEmmiter {
    constructor() {
        super();
    }
}
const myEmmiter = new Sales();

myEmmiter.on('newSale', () => {
    console.log('there are a new sale');
})
myEmmiter.on('newSale', () => {
    console.log('customer event emmit');
})
myEmmiter.on('newSale', stock => {
    console.log(`stock event emmit ${stock}`);
})
myEmmiter.emit('newSale', 9);

///
const server = http.createServer();

server.on("request", (req, res) => {
  console.log("Request received!");
  console.log(req.url);
  res.end("Request received");
});

server.on("request", (req, res) => {
  console.log("Another request 😀");
});

server.on("close", () => {
  console.log("Server closed");
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Waiting for requests...");
});
