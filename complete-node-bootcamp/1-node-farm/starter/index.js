const fs = require('fs');
const http = require('http');
const url = require('url');
const slugify = require('slugify');
const replaceTemplate = require('./modules/replaceTemplate');
///////////////////////////////////////
//FILE

// const textIn = fs.readFileSync('./txt/input.txt','utf-8');
// console.log(textIn)

// const textOut =  `This is what we know about the avocado: ${textIn} \nCreated on ${Date.now()}`
// fs.writeFileSync('./txt/output.txt',textOut)
// console.log('Writing output');

//non blocking
// fs.readFile('./txt/start.txt','utf-8', (err,data1)=>{
//     if(err) return console.log('ERRORRRRRRRRRR!!!')

//     fs.readFile(`./txt/${data1}.txt`,'utf-8', (err,data2)=>{
//         console.log(data2);
//         fs.readFile(`./txt/append.txt`,'utf-8', (err,data3)=>{
//             console.log(data3);

//             fs.writeFile(`./txt/end.txt`, `${data2}\n${data3}` , err =>{
//                 console.log('your file has been written');
//             })
//         })
//     })
// })
// console.log('will read file!!!')

///////////////////////////////////////
//SERVER

const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  'utf-8'
);
const tempCar = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  'utf-8'
);
const tempProducut = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  'utf-8'
);
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataOBJ = JSON.parse(data);
const slugs = dataOBJ.map((el) => slugify(el.productName, { lower: true }));

console.log(slugs);

const server = http.createServer((req, res) => {
  console.log(req.url);
  const { query, pathname } = url.parse(req.url, true);
  //over view
  if (pathname === '/' || pathname === '/overview') {
    res.writeHead(200, {
      'Content-Type': 'text/html',
    });

    const cardsHTML = dataOBJ
      .map((el) => replaceTemplate(tempCar, el))
      .join('');
    const output = tempOverview.replace('{%PRODUCT_CARDS%', cardsHTML);
    res.end(output);
  }
  //product page
  else if (pathname === '/product') {
    res.writeHead(200, {
      'Content-Type': 'text/html',
    });
    const product = dataOBJ[query.id];
    const output = replaceTemplate(tempProducut, product);
    res.end(output);
  }
  //api
  else if (pathname === '/api') {
    res.writeHead(200, {
      'Content-Type': 'application/json',
    });
    res.end(data);
  }
  //not found
  else {
    res.writeHead(404, {
      'Content-Type': 'text/html',
      'my-owner-header': 'hello-world',
    });
    res.end('<h1>Page not found!</h1>');
  }
});

server.listen(8000, '127.0.0.1', () => {
  console.log('listening to requests on port 8000  ...');
});
