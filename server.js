const http = require('http');//server creation using http module
const fs = require('fs');//for reading and sending file from other folder
const _ = require('lodash');
const server = http.createServer((req, res) => {
    console.log('Response has been made from browser to server');
    // console.log(req.method);
    // console.log(req.url);
    res.setHeader('Content-Type', 'text/html');
    let path = './index';
    let num = _.random(0,20);
    console.log(num);
    let greet = _.once(()=>{
        console.log('hello');
    });
    greet();
    greet();
    switch(req.url){//request made from sever
        case '/':
            path+='/yes.html';
            res.statusCode=200;
            break;
        case '/about':
            path+='/Home.html';
            res.statusCode=200;
            break;
        case '/aboutabc':
            res.statusCode=301;
            res.setHeader('Location', '/about');
            res.end();
            break;
        default:
            path+='/pageNotFound.html';
            res.statusCode=404;
            break;
    };
    // res.write('<h1>Hello Huehuehue</h1>');
    fs.readFile(path, (err, fileData)=>{
        if(err){
            console.log(err);
        }
        else{
            res.end(fileData);
        }
    }) 
});

//arguments pf server.listen (port number, host, callback function)
server.listen(3000, 'localhost' ,()=>{
    console.log('server is listening om port 3000')
});