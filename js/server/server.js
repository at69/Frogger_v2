//modules we will use
var express = require('express'); 
//var cookieManager = require('express/node_modules/cookie');
var app = express();	
var url = require("url");
var mysql = require("mysql");
var databaseManager = require("../database/databaseManager"); 
var io = require('socket.io').listen(8880);

//the memory to store the session cookies
var MemoryStore = require('express/node_modules/connect/lib/middleware/session/memory');

io.sockets.on('connection', function (socket) {
	socket.on('move', function (data) {
		socket.broadcast.emit('move', { x: data.x, y: data.y, o: data.o, l: data.l });
	});
});
	
function start(route, handle) {								// create the server instance
	app.engine('.html', require('ejs').__express);			// enable the embedded javascript templates
	app.set('views', __dirname + '/../..');					// tell where are views
	app.set('view engine', 'html');						
	//app.use(express.bodyParser()); //decode application/x-www-form-urlencoded data — i.e., forms
	app.use(express.methodOverride()); //the methodOverride middleware allows Express apps to behave like RESTful apps
	app.use(express.cookieParser());//handle session cookies via express
	app.use(app.router);
	app.use(express.static(__dirname + '/../..'));			// root directory /Frogger to access all other files (images, classes ...)
	app.listen(9000); 										// listen on port 9000
	
	app.use(function(req, res, next){						// when a request reach the server,
		var postData = "";
		var pathname = url.parse(req.url).pathname;						// retrieve the path
		
		req.addListener("data", function(postDataChunk) {
			postData += postDataChunk;
		});
		req.addListener("end", function() {
			if(postData == "")
			{
				postData = String(req.url).split("?")[1];
				if(postData == undefined)
				{
					postData = "";
				}
			}
			route(handle, pathname, res, req, postData);					// and route the request
		});
	});
	
	
}

exports.start = start;