//We use our mold
var databaseManager = require("../databaseManager"); 

// Check the columns names to prevent SQL injections.
var columnNameRegex = /^([a-zA-Z0-9_$]{1,64}\.)?[a-zA-Z0-9_$]{1,64}$/;
function checkColumnName(name) {
    return columnNameRegex.test(name);
}
 
function checkColumns(obj) {
    for (var key in obj) {
        if (!checkColumnName(key)) {
            return false;
        }
    }
    return true;
}
 
// List the users
exports.listUsers = function(callback) {
    databaseManager.findAll('user', callback);
}
 
// Get a specific user by his id
exports.getUser = function(id, callback) {
    databaseManager.findById('user', id, callback);
}

//Get a specific user by his credentials (email and password)
exports.identifyUser = function(email, password, callback) {
	var array = {};
	array['login'] = email;
	array['password'] = password;
	if (checkColumns(array)) {
		databaseManager.read('user', array, null, callback);
	} else {
        callback('Invalid column name', null);
    }
}
 
// Insert using our columns names' checker
exports.addUser = function(values, callback) {
    if (checkColumns(values)) {
        databaseManager.insert('user', values, callback);
    } else {
        callback('Invalid column name', null);
    }
}
 
//Update using our columns names' checker
exports.updateUser = function(id, values, callback) {
    if (checkColumns(values)) {
        databaseManager.updateById('user', id, values, callback);
    } else {
        callback('Invalid column name', null);
    }
}
 
//Remove an user
exports.removeUser = function(id, callback) {
	databaseManager.removeById('user', id, callback);
} 

//Check if an user works for the company (= is admin) -- unused
exports.checkAdmin = function(id, callback) {
	var user = getUser(id, callback);
	var isAdmin = user.isAdmin;
	
	callback(isAdmin);	
}