var express =require('express');
var app = express();
var bodyParser = require('body-parser');
var path=require('path');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine','ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var latest =new Object;

app.post('/post',function(req,res){
	//console.log(req.body);
	latest[req.body.lno]={};
    latest[req.body.lno]['col'] =  req.body.col;
    latest[req.body.lno]['noc'] = req.body.noc;
    latest[req.body.lno]['lno']= req.body.lno;
    latest[req.body.lno]['status'] = 'change';
    res.send({'message':'success'});
});

app.get('/get',function(req,res){
    var send={};
    //res.send(Object.keys(latest).length.toString());
    var c=0;
    for(var i in latest){
		console.log(latest[i]);
        if(latest[i]['status']=="change"){
			send[latest[i]['lno']]=latest[i];
			latest[i].status="sent";
		}
        if(c==parseInt(Object.keys(latest).length.toString())-1)
        res.send(send);
        c++;
    }
});

app.get('/',function(req,res){
    res.render('index.ejs');
});

app.listen(3000);
