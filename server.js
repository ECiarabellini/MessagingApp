const express = require('express');
const path = require('path');
const messages = require('./db/messages.json'); //temporary local json file to store messages

const app = express(); // Initialize an instance of Express.js
const PORT = 3000;

app.use(express.json()); // Middleware for parsing application/json
app.use(express.urlencoded({ extended: true })); //Middleware for urlencoded data

app.use(express.static('public')); // Static middleware pointing to the public folder

//content from unit 11.
// Create Express.js routes for default '/' and '/newMessage' endpoints
app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, 'public/index.html'))
);

app.get('/new', (req, res) => 
    res.sendFile(path.join(__dirname, 'public/newMessage.html'))
);

// Endpoint to return own locally stored data
app.get('/api', (req, res) => res.json(messages));

// listen() method is responsible for listening for incoming connections on the specified port 
app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
