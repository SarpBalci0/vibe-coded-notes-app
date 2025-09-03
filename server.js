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

// 5. DATABASE SETUP
const db = new sqlite3.Database('./database.db', (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to SQLite database');
        
        // Create notes table if it doesn't exist
        //auto-incrementing assigns a unique number to each new note
        db.run(`CREATE TABLE IF NOT EXISTS notes (
            id INTEGER PRIMARY KEY AUTOINCREMENT, 
            text TEXT NOT NULL
        )`, (err) => {
            if (err) {
                console.error('Error creating table:', err.message);
            } else {
                console.log('Notes table ready');
            }
        });
    }
});

// 6. API ROUTES
// These are the "doors" your frontend can knock on to request data

// GET /api/notes - Get all notes from the database
app.get('/api/notes', (req, res) => {
    db.all('SELECT * FROM notes ORDER BY id DESC', (err, rows) => {
        if(err){
            console.error('Error fetching notes:', err.message);
            res.status(500).json({error: 'Failed to fetch notes'});
        }else{
            res.json(rows);
        }
    })
})

// POST /api/notes - Add a new note to the database
app.post('/api/notes', (req, res) => {
    const {text} = req.body; //Extracts the note text from request

    if(!text){
        return res.status(400).json({error: 'Note text is required'});
    }

    db.run('INSERT INTO notes (text) VALUES (?)', [text], function(err) {
        if (err) {
            console.error('Error adding note:', err.message);
            res.status(500).json({ error: 'Failed to add note' });
        } else {
            res.json({ 
                id: this.lastID, //database auto-generated id for new note in here
                text: text,
                message: 'Note added successfully' 
            });
        }
    });
});

//Frontend sends: { text: "Buy milk" } (no ID)
//Database creates: { id: 1, text: "Buy milk" } (auto ID)
//Backend responds: { id: 1, text: "Buy milk", message: "Note added successfully" }

// DELETE /api/notes/:id - Delete a specific note by ID
app.delete('/api/notes/:id', (req, res) => {
    const { id } = req.params;//Extracts the note id from request
    
    db.run('DELETE FROM notes WHERE id = ?', [id], function(err) {
    // Deletes the specific note with this ID

        if (err) {
            console.error('Error deleting note:', err.message);
            res.status(500).json({ error: 'Failed to delete note' });
        } else if (this.changes === 0) {
            res.status(404).json({ error: 'Note not found' });
        } else {
            res.json({ message: 'Note deleted successfully' });
        }
    });
});


//res.json() = Converts a JavaScript object/array into JSON format - 
//Also sends the JSON response back to whoever made the request
