var express = require('express');
var router = express.Router();

var latest =new Object;
for(var i=0;i<4;i++){
	latest[i]={};
	latest[i]['col']='R';
	latest[i]['lno']=i.toString();
	latest[i]['noc']=0;
}

router.post('/post',function(req,res){
    latest[req.body.lno]['col'] = req.body.col;
    latest[req.body.lno]['lno']= req.body.lno;
    res.send({'message':'success'});
});

router.post('/post_noc',function(req,res){
	for(var i=0;i<4;i++){
		latest[i]['noc']=req.body[i];
	}
	res.send({'message':'success'})
});

router.get('/get',function(req,res){
    var send=latest;
    res.send(send);
});

router.get('/',function(req,res){
    res.render('index', { title: 'Realtime Traffic Analytics' });
});
module.exports = router;
