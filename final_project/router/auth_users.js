const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username) => { //returns boolean
//write code to check is the username is valid
    return users.find(u => u.username === username);
}

const authenticatedUser = (username, password) => { //returns boolean
//write code to check if username and password match the one we have in records.
    return users.find(u => u.username === username && u.password === password);
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  //Write your code here
	console.log('LOGIN')
  const { username, password } = req.body;

  if(isValid(username) && authenticatedUser(username, password)){
		// Add user credentials to session as jwt
    req.session.user = jwt.sign(username,  "secret-key");

    return res.status(200).json("Logged in successfully!");
  }

	return res.status(400).json("Invalid credentials");
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
