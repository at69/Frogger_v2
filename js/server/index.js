var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers"); 
var restUser = require("../rest/restUser");

var handle = {}
handle["/"] = requestHandlers.register;
handle["/login"] = requestHandlers.login;
handle["/logout"] = requestHandlers.logout;
handle["/register"] = requestHandlers.register;
handle["/play"] = requestHandlers.play;
handle["/administration"] = requestHandlers.admin;
handle["/notfound"] = requestHandlers.notfound;
handle["/rest/users"] = restUser.listRestUsers;

server.start(router.route, handle);