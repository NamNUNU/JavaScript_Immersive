var express = require('express');
var app = express();


app.listen(3000,function(){
  console.log('start server on port 3000')
})

app.use(express.static('public'));
app.use(express.static('data'));

app.get('/',function(req,res){
  res.sendFile(__dirname + '/public/main.html');
})

app.get('/send_ajax', function(req,res){
  res.sendFile(__dirname + '/data/newslist.json')
})
