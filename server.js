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

// POST request to send a message
app.post('/api/messages', (req, res) => {
    // Log that a POST request was received
    console.info(`${req.method} request received to post a message`);

    // Destructuring assignment for the items in req.body
    const { from, to, subject, text } = req.body;

    // If all the required properties are present
    if (from && to && subject && text)  {
      // Variable for the object we will save
        const newMessage = {
            from,
            to,
            subject,
            text
        };

        const response = {
            status: 'success',
            body: newMessage,
        };

        console.log(response);
        // res.json() returns data including a status message indicating the success of the request along with the newly created message data.
        res.status(201).json(response);
        } else {
        // the purpose of the else statement is to allow a way to throw an error if any of the form data is not present.
        res.status(500).json('Error in sending message');
        }
});














// listen() method is responsible for listening for incoming connections on the specified port 
app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
