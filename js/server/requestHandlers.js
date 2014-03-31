var http = require('http');
var querystring = require('querystring');
var crypto = require('crypto');
var databaseManager = require("../database/databaseManager"); 
var userManager = require("../database/TablesManagers/UserTable");

function login(response, request, postData) {
	
	if(request.method == "GET")
	{	
		if(typeof froggerUser != "undefined") {
			response.render('login', {
				msg: "", //display nothing                   
				froggerUser: request.cookies.froggerUser[0]
			});
		}else
		{
			response.render('login', {
				msg: "", //display nothing
				froggerUser: ""
			});
		}
		
	}
	else if(request.method == "POST") {
			//prevent flood attack, etc.
			if(postData.length > 1e6) {
				postData = "";
				response.writeHead(413, {'Content-Type': 'text/plain'}).end();
				request.connection.destroy();
			}
			else {
				var array = postData.split('&');
				var email = array[0].substr(5, 40).replace("%40", "@");
				var pass = crypto.createHash('md5').update(array[1].substr(5, 40)).digest("hex");
	
				userManager.identifyUser(email, pass, function(error, result) {
					
					if(error == null)
					{	
						if(result.length != 0) {
							user = result;
							var date = user[0]['registrationDate'];
							var dd = date.getDate();
							var mm = date.getMonth();
							var yyyy = date.getFullYear();
							if(dd<10) dd='0'+dd;
							if(mm<10) mm='0'+mm;
							date = yyyy+'-'+mm+'-'+dd;
							user[0]['registrationDate'] = date;
							response.cookie('froggerUser', user, { expires: 0, httpOnly: true});
							response.redirect("/play");	
						}
						else {
							response.render('login', {
							msg: "No user found with these credentials",
							froggerUser: ""
						});
						
						}
					}
					else
					{
						response.render('login', {
							msg: "An error occured: " + error,
							froggerUser: ""
						});
					}
				});
			}
	}
	else {
		response.writeHead(405, {'Content-Type': 'text/plain'});
		response.end();
	}
}

function logout(response, request, postData) {

	response.clearCookie("froggerUser");
	response.render('login', {
		msg: ""
	});
}

function register(response, request, postData) {

	if(request.method == "GET")
	{
		if(typeof froggerUser != "undefined") {
			response.render('register', {
				msg: "", //display nothing
				froggerUser: request.cookies.froggerUser[0]
			});
		}else
		{
			response.render('register', {
				msg: "", //display nothing
				froggerUser: ""
			});
		}
	}
	else if(request.method == "POST") {

			//prevent flood attack, etc.
			if(postData.length > 1e6) {
				postData = "";
				response.writeHead(413, {'Content-Type': 'text/plain'}).end();
				request.connection.destroy();
			}
			else {
				var array = postData.split('&');
				var email = array[0].substr(5, 40).replace("%40", "@");
				var pass = array[1].substr(5, 40);
				var confirmation = array[2].substr(13, 40);
				if(pass == confirmation) {
					pass =  crypto.createHash('md5').update(pass).digest("hex");
					var array2 = {};
					array2["login"] = email;
					array2["password"] = pass;
					var today = new Date();
					var dd = today.getDate();
					var mm = today.getMonth()+1; //January is 0!
					var yyyy = today.getFullYear();
					if(dd<10) dd='0'+dd;
					if(mm<10) mm='0'+mm;
					today = yyyy+'-'+mm+'-'+dd;
					array2["registrationDate"] = today;
					array2["isAdmin"] = 0;
					userManager.addUser(array2, function(error) {
						if(error == null)
						{
							response.redirect("/login");						
						}
						else
						{
							response.render('Register', {
								msg: "An error occured: " + error
							});
						}
					});
				}else
				{
					response.render('Register', {
						msg: "Password and confirmation do not match" 
					});
				}
			}
	}
	else {
		response.writeHead(405, {'Content-Type': 'text/plain'});
		response.end();
	}
}

function play(response, request) {
	if(request.method == "GET")
	{
		if(typeof froggerUser != "undefined") {
			response.render('play', {
				froggerUser: request.cookies.froggerUser
			});
		}else
		{
			response.render('play', {
				froggerUser: ""
			});
		}
	}
}

function notfound(response, request) {
	response.render('404', {});
}

exports.login = login;
exports.logout = logout;
exports.register = register;
exports.play = play;
//exports.administration = administration;
exports.notfound = notfound;
