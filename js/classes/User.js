var User = function(user) {
	var _id = user.id;
	var _login = user.login;
	var _password = user.password;
	var _registrationDate = user.registrationDate;
	var _isAdmin = user.isAdmin;
	var _bestTime = user.bestTime;
	
	Object.defineProperties(this, {
		id: {
				get: function() { return _id; },
				set: function(newValue) {
					_id = newValue; 
				}
			},
		login: {
					get: function() { return _login; },
					set: function(newValue) {
						_login = newValue; 
					}
				},
		password: {
					get: function() { return _password; },
					set: function(newValue) {
						_password = newValue; 
					}
				},
		registrationDate: {
					get: function() { return _registrationDate; },
					set: function(newValue) {
						_registrationDate = newValue; 
					}
				},
		isAdmin: {
					get: function() { return _isAdmin; },
					set: function(newValue) {
						_isAdmin = newValue; 
					}
				},
		bestTime: {
					get: function() { return _bestTime; },
					set: function(newValue) {
						_bestTime = newValue; 
					}
				},
	});
}