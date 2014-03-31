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
 
// List the statistics
exports.listStats = function(callback) {
    databaseManager.findAll('statistic', callback);
}
 
// Get a specific stat by his id
exports.getStat = function(id, callback) {
    databaseManager.findById('statistic', id, callback);
}
 
// Insert using our columns names' checker
exports.addStat = function(values, callback) {
    if (checkColumns(values)) {
        databaseManager.insert('statistic', values, callback);
    } else {
        callback('Invalid column name', null);
    }
}
 
//Update using our columns names' checker
exports.updateStat = function(id, values, callback) {
    if (checkColumns(values)) {
        databaseManager.updateById('statistic', id, values, callback);
    } else {
        callback('Invalid column name', null);
    }
}
 
//Remove an user
exports.removeStat = function(id, callback) {
	databaseManager.removeById('statistic', id, callback);
} 

//Get the stats for a game X
exports.getStatForGame = function(gameId, callback) {
	var array = {};
	array['gameId'] = gameId;
	if (checkColumns(array)) {
		databaseManager.read('statistic', array, null, callback);
	} else {
        callback('Invalid column name', null);
    }
}

//Get the stats for an user Y
exports.getStatForUser = function(userId, callback) {
	var array = {};
	array['userId'] = userId;
	if (checkColumns(array)) {
		databaseManager.read('statistic', array, null, callback);
	} else {
        callback('Invalid column name', null);
    }
}

//Get the stats for an user Y in a game X
exports.getStatForUserInGame = function(userId, gameId, callback) {
	var array = {};
	array['userId'] = userId;
	array['gameId'] = gameId;
	if (checkColumns(array)) {
		databaseManager.read('statistic', array, null, callback);
	} else {
        callback('Invalid column name', null);
    }
}