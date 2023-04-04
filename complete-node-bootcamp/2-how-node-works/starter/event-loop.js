const fs = require('fs');
const crypto = require('crypto');
const start = Date.now();

process.env.UV_THREADPOOLE = 1;

setTimeout(() => {
    console.log('time 1 finished')
}, 0);
setImmediate(() => { console.log('immediate finished') });

fs.readFile('test-file.js', 'utf8', (err, data) => { 
    console.log('I/O finished', data);
    console.log('---------------');

    setTimeout(() => {
        console.log('time 2 finished')
    }, 0);
    setTimeout(() => {
        console.log('time 3 finished')
    }, 3000);
    setImmediate(() => { console.log('immediate 2 finished') });

    process.nextTick(() => { console.log('process.nextTick finished') })
    
    crypto.pbkdf2Sync('password', 'salt', 100000, 1024, 'sha512');
     console.log(Date.now() - start, 'password encrypted');
    crypto.pbkdf2Sync('password', 'salt', 100000, 1024, 'sha512');
        console.log(Date.now() - start, 'password encrypted');
    crypto.pbkdf2Sync('password', 'salt', 100000, 1024, 'sha512');
        console.log(Date.now() - start, 'password encrypted');
    crypto.pbkdf2Sync('password', 'salt', 100000, 1024, 'sha512');
        console.log(Date.now() - start, 'password encrypted');
})
console.log('hello from the top-level code')
