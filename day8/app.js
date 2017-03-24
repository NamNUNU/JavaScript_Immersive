var express =  require('express');
var app = express();

var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  port:3306,
  user:'root',
  password:'14858',
  database:'jsman'
})
connection.connect();

var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

app.set('view engine', 'ejs');

app.listen(3000, function(){
  console.log("Start server on port 3000");
})

app.use(express.static('public'));

app.get('/', function(req,res){
  res.sendFile(__dirname+'/public/main.html');
});

app.get('/main', function(req,res){
  res.sendFile(__dirname+'/public/main.html');
});

app.post('/send_email', function(req,res){
  res.render('email.ejs',{'email': req.body.email});
});

app.post('/ajax_send_email', function(req, res){
  var email = req.body.email;
  var responseData = {};

  var query =  connection.query('select name from user where email="'+ email +'"', function(err,rows){
    if(err) throw err;
    if(rows[0]){
      console.log(rows);
      responseData.result = "ok";
      responseData.name = rows[0].name;
    }else{
      responseData.result = "none";
      responseData.name = "";
    }
    res.json(responseData)
  });
});
