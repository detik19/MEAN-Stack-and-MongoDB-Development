/**
 * http://usejsdoc.org/
 */
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
//var mongo =require('mongodb').MongoClient;
var mongoose = require('mongoose');
//var jwt = require('jwt-simple');
//var moment = require('moment');
//var auth = require('')

//var database;
var Message = mongoose.model('Message',{
	msg:String
});
app.use(bodyParser.json());
app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin","*");
	res.header("Access-Control-Allow-Headers","Content-Type, Authorization");
	next();
});

//function checkAuthenticated(req, res, next) {
//	if(!req.header('Authorization')){
//		return res.status(481).send({message:'Please make sure your request has an Authorization header'});
//	}
//	
//	var token = req.header('Authorization').split('')[1];
//	var payload = jwt.decode(token, 'secret');
//	if(payload.exp <= moment().unix()){
//		return res.status(401).send({message:'token has expired'});
//	}
//}


app.get('/api/message', GetMessages)  

app.post('/api/message', function(req, res) {
	console.log(req.body);
	var message = new Message(req.body);
	message.save();
	res.status(200);
});

function GetMessages(req, res) {
	Message.find({}).exec(function(err, result) {
		//console.log(result);
		res.send(result);
	})
}



mongoose.connect("mongodb://localhost:27017/test", function(err, db) {
	if(!err){
		console.log("we are connected to mongo");
		//db.collection('messages').insertOne({'msg':'test'});
		//database=db;
	}
});

var server = app.listen(8080, function() {
	console.log('listening on port ',server.address().port);
});
