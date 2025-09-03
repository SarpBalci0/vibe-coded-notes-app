//backend application
//Listens for requests from the frontend (React app)
//Processes those requests (talks to database if needed)
//Responds back with data or confirmation

// 1. IMPORTS - Get the tools we need
// 2. SETUP - Configure our server
// 3. MIDDLEWARE - Add helper functions  
// 4. START - Actually run the server

// 1. IMPORTS
const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

// 2. SETUP
const app = express(); //app is the server
const port = 3001; //server will listen on port 3001
//Why 3001? Because React (frontend) uses 3000 by default, so we pick 3001 for backend

// 3. MIDDLEWARE
//app.use() = this tells the server to allow this helper function for all requests
//express.json() = Automatically convert JSON data in requests to JavaScript objects
app.use(cors()); //now, server allows requests from cors middleware. 
                 //cors allows requests from different ports (React: 3000, Backend: 3001)
app.use(express.json()); //now, server can understand JSON data in requests

// 4. START
//app.listen() = Start listening for requests on port 3001
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});



//What happens when you run this?
//Terminal command: node server.js (or npm start)
//Server starts: Listens on localhost:3001
//Console shows: "Server running on http://localhost:3001"
//Ready state: Server is running but has no routes yet