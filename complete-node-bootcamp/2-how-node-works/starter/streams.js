const fs = require('fs');
const server = require('http').createServer();

server.on('request', (req, res) => {
    console.log('Request')
    //slution1
    // fs.readFile('test-file.txt', 'utf8', (err, data) => {
    //     if (err) console.log(err);
    //     res.end(data);
    // })

    //slution2
    // const readable = fs.createReadStream('test-file.txt');
    // readable.on('data', chunk => {
    //     res.write(chunk);
    // })
    // readable.on('end', () => {
    //     res.end();
    // })
    // readable.on('error', err => {
    //     res.statusCode = 500
    //     res.end('file not found: ');
    // })

    //slution3
    const readable = fs.createReadStream('test-file.txt');
    readable.pipe(res);
});
server.listen(8000, '127.0.0.1', () => {
    console.log('listen on port 8000...');
});