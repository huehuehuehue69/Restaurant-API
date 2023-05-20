const express = require('express');
const app = express();
app.listen(3000);
//for making request and getting response.
app.get('/',(req,res)=>{
    res.send('HUEHUEHUE');
});
// for sending file as response
app.get('/about' , (req,res)=>{
    res.sendFile('./index/Home.html' , {root : __dirname});
});
// for sending file as response
app.get('/404' , (res,req)=>{
    res.sendFile('D:\BackendDevelopment\index\pageNotFound.html');
});

// redirecting
app.get('/about-us' , (req,res)=>{
    res.redirect('/about');
});

// 404 page
app.use((req,res)=>{
    res.sendFile('./index/pageNotFound.html', {root : __dirname});
});
//404 with status code
app.use((req,res)=>{
    res.status(404).sendFile('./index/pageNotFound.html', {root : __dirname});
});


