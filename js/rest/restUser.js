var data = require('../database/TablesManagers/UserTable.js');
var express = require('express');
var app = express();

function dataCallback(res) {
    return function(err, data) {
        if (err) {
            res.send({error : err});
        } else {
            res.send(data);
        }
    }
}
 
// Read, via GET
function listRestUsers(req, res) {
    data.listUsers(dataCallback(res));
};
 
app.get('/rest/user/:id', function(req, res) {
    data.getUser(req.params.id, dataCallback(res));
});

 // Insertion via POST
app.post('/rest/users', function(req, res) {
    data.addUser(req.body, dataCallback(res));
});

// Update via POST
app.post('/rest/user/:id', function(req, res) {
    data.updateUser(req.params.id, req.body, dataCallback(res));
});
 
// Deletion, via POST
 
app.post('/rest/user/remove/:id', function(req, res) {
    data.removeUser(req.params.id, dataCallback(res));
});

exports.listRestUsers = listRestUsers;