var crypto = require('crypto');
var prompt = require('prompt');
var fs = require('fs');
var stringUtils = require('./stringUtils');



prompt.start();

function account() {

	var schema = {
		properties: {
			input: {
				description: 'Do you already have an account?',
			}
		}
	};


	prompt.get(schema, function (err, result) {
		console.log(result.input);
		if ('Yes' == result.input) {
			login();
		} else {
			newAccount();
		}
	});
}

// New Login Details
function newAccount() {

	prompt.get(["username", "password"], function (err, result) {

		var hash = generateHash(result.password)
		var credentials = {
			password: hash,
			username: result.username
		}
		//ToDo: check if a username has 8 or more characters and also has Uppercase, Lowercase and Numbers ('while' or 'for' Loops)
		var json = fs.readFileSync("./data.json");
		var credentialsArray = JSON.parse(json);

		var existingUsers = credentialsArray.filter(function (item) {
			return item.username == credentials.username;
		});

		if (existingUsers.length > 0) {
			console.log('Try another Username');
		} else {
			credentialsArray.push(credentials);
			var json = JSON.stringify(credentialsArray, null, 3);
			fs.writeFileSync("./data.json", json);
		}
	});
}

// Login with existing account 
function login() {
	prompt.get(['username', 'password'], function (err, result) {


		var hash = generateHash(result.password)
		var credentials = {
			password: hash,
			username: result.username
		}

		var json = fs.readFileSync("./data.json");
		var credentialsArray = JSON.parse(json);

		var exsistingPassword = credentialsArray.filter(function (item) {
			return item.password == credentials.password;
		});
		if (exsistingPassword.length > 0) {
			var json = JSON.stringify(credentialsArray, null, 3);
			fs.writeFileSync("./data.json", json);
		} else {
			console.log('Try Again')
		}
	});
}

function generateHash(text) {
	var cipher = crypto.createCipher('aes-256-cbc', 'd6F3Efeq')
	var crypted = cipher.update(text, 'utf8', 'hex')
	crypted += cipher.final('hex');
	return crypted;
}

module.exports = {
	account: account
};
