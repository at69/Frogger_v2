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
 
// List the games
exports.listGames = function(callback) {
    databaseManager.findAll('game', callback);
}
 
// Get a specific game by his id
exports.getGame = function(id, callback) {
    databaseManager.findById('game', id, callback);
}
 
// Insert using our columns names' checker
exports.addGame = function(values, callback) {
    if (checkColumns(values)) {
        databaseManager.insert('game', values, callback);
    } else {
        callback('Invalid column name', null);
    }
}
 
//Update using our columns names' checker
exports.updateGame = function(id, values, callback) {
    if (checkColumns(values)) {
        databaseManager.updateById('game', id, values, callback);
    } else {
        callback('Invalid column name', null);
    }
}
 
//Remove a game
exports.removeGame = function(id, callback) {
	databaseManager.removeById('game', id, callback);
} 