var express=require('express');
var app=express();

app.use(express.static('public'))

app.use((req,res)=>{
    res.sendFile(__dirname+'/public/index.html');
});

app.listen(8081);