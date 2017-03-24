var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var sendNews = require('./router/news');

app.listen(3000, function(){
  console.log("server start on port 3000");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static('public'))


app.get('/',function(req,res){
  res.sendFile(__dirname + '/public/main.html');
})

app.use("/news",sendNews);
