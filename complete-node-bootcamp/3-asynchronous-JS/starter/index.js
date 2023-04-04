const fs = require('fs');
const http = require('http');
const superagent = require('superagent');

const readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject('I cound not find that file');
      resolve(data);
    });
  });
};
const writeFilePro = (file,data) => { 
    return new Promise((resolve, reject) => {
        fs.writeFile(file, data ,(err) => {
            if (err) reject('I cound not find that file');
            resolve('success');
         })
     })
}

const getDogPic = async () => {
    try {
        const data = await readFilePro(`${__dirname}/dog.txt`)
        console.log(`Beer: ${data}`);

        const res1Pro = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`)
        const res2Pro = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`)
        const res3Pro = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`)
        
        const all = await Promise.all([res1Pro,res2Pro, res3Pro])
        const imgs = all.map(el => el.body.message)
        console.log(imgs);

        // const res = await superagent.get(`https://dog.ceo/api/breed/${data}/images/random`)
        // console.log(res.body.message);
    
        await writeFilePro('dog-imgage.txt', imgs.join('\n'))
        console.log('done writing...')
    }
    catch (err) { 
        console.log(err)
        throw err;
    }
    return 'ready'

}
(async () => {
    try {
        console.log('1: will get dog pics');
        const x = await getDogPic();
        console.log(x);
        console.log('3: DONE get dog pics');
    } catch (err) {
        console.log('ERROR');
    }
})();
/*
console.log('1: will get dog pics');
getDogPic().then(x => {
    console.log(x);
    console.log('3: DONE get dog pics');
}).catch(err => { 
    console.log('ERROR');
})
*/
/* 
readFilePro(`${__dirname}/dog.txt`)
  .then((data) => {
    console.log(`Beer: ${data}`);
    return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
  })
  .then((res) => {
    console.log(res.body.message);
    return writeFilePro('dog-imgage.txt', res.body.message);
  })
  .then(() => {
    console.log('done writing...');
  })
  .catch((err) => {
    console.log(err.message);
  });

// fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
//   console.log(`Beer: ${data}`);

// });

// const server = http.createServer();
// server.on('request', (req, res) => {
//   console.log(`Request`);
//   res.end(`hello world`);
// });
// server.listen(8000, '127.0.0.1', () => {
//   console.log(`server listening on 8000...`);
// });
*/