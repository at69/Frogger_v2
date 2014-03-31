// We use the node-mysql module
var mysql = require('mysql');
 
//connection settings for the database
var connection = mysql.createConnection({
	host: '127.0.0.1',
   user: "frogger",
   password: "fr0gg3R",
   database: "frogger"
});
 
function hashToClause(hash, separator) {
    var result = '';
    var values = [];
    var first = true;
    for (var key in hash) {
        result += (first ? '' : separator) + key + ' = ' + "\'" + hash[key] + "\'";
        values.push(hash[key]);
        first = false;
    }
    return { clause : result, values : values};
}
 
// CRUD
 
// Insertion
function insert(table, values, callback) {
    // Dynamic request
    var q = 'INSERT INTO ' + table + ' SET ';
    var clause = hashToClause(values, ', ');
    q += clause.clause + ';';
	//q = q.replace("\'", "\\'");
	//console.log(clause.values);
    // Send the request with the callback
    //console.log(connection.query(q, clause.values, callback));
	connection.query(q, clause.values, callback);
}
 
// Deletion
function remove(table, where, callback) {
    var q = 'DELETE FROM ' + table + ' WHERE ';
    var clause = hashToClause(where, ' AND ');
    q += clause.clause;
    connection.query(q, clause.values, callback);
}
 
// Find
function read(table, where, columns, callback) {
    var columnsClause = (columns ? columns.join(', ') : '*');
    var q = 'SELECT ' + columnsClause + ' FROM ' + table;
    if (where) {
        var clause = hashToClause(where, ' AND ');
        q += ' WHERE ' + clause.clause;
    }
    connection.query(q, (where ? clause.values : callback), callback);
}
 
// Update
function update(table, where, values, callback) {
    var whereClause = hashToClause(where, ' AND ');
    var valuesClause = hashToClause(values, ' AND ');
    var q = 'UPDATE ' + table + ' SET ' + valuesClause.clause + ' WHERE ' +
        whereClause.clause + ';';
    connection.query(q, whereClause.values.concat(valuesClause.values), callback);
}
 
 //Exports
 
exports.insert = insert;
exports.remove = remove;
exports.read = read;
exports.update = update;

exports.updateById = function(table, id, values, callback) {
    update(table, { 'id' : id }, values, callback);
}
 
exports.findById = function(table, id, callback) {
    read(table, { 'id' : id }, null, callback);
}
 
exports.removeById = function(table, id, callback) {
    remove(table, { 'id' : id }, callback);
}
 
exports.findAll = function(table, callback) {
    read(table, null, null, callback);
}
 
// Give access to the query method in case previous methods aren't sufficient 
exports.query = function(query, values, callback) {
    return connection.query(query, values, callback);
}