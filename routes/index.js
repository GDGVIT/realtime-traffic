var express = require('express');
var router = express.Router();

var latest =new Object;

router.post('/post',function(req,res){
	//console.log(req.body);
	latest[req.body.lno]={};
    latest[req.body.lno]['col'] =  req.body.col;
    latest[req.body.lno]['noc'] = req.body.noc;
    latest[req.body.lno]['lno']= req.body.lno;
    latest[req.body.lno]['status'] = 'change';
    res.send({'message':'success'});
});

router.get('/get',function(req,res){
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

router.get('/',function(req,res){
    res.render('index', { title: 'Realtime Traffic Analytics' });
});
module.exports = router;
