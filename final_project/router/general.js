const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  const { username, password } = req.body;
  if(!username || !password){
    return res.status(400).json("Username or password are not provided.")
  }
	
  const userExists = users.filter(u => u.username.toLowerCase() === username.toLowerCase()).length > 0;

  if(userExists){
    return res.status(400).json("User already exists.")
  }

	//   Add user to DB
	users.push({ username, password });

  return res.status(200).json("User has been added successfully");
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  return res.status(300).json(books);
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const { isbn } = req.params;
  const book = books[isbn] ?? "No book found for this ISBN";

  return res.status(200).json(book);
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  const { author } = req.params;
  const authorBooks = Object.entries(books).filter(([_, book]) => book.author === author).map(([_, book]) => book);

  return res.status(200).json(authorBooks);
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  const { title } = req.params;

  const titleBooks = Object.entries(books).filter(([_, book]) => book.title === title).map(([_, book]) => book);
  return res.status(200).json(titleBooks);
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const { isbn } = req.params;
  const reviews = books[isbn]?.reviews || "No reviews found for this ISBN";
  return res.status(200).json(reviews);
});

module.exports.general = public_users;
