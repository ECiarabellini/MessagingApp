const express = require('express');
const path = require('path');
const mysql = require('mysql2');
const sequelize = require('./config/connection.js');
const Message = require('./Models/Message.js');

const app = express(); // Initialize an instance of Express.js
const PORT = process.env.PORT || 3000;

app.use(express.json()); // Middleware for parsing application/json
app.use(express.urlencoded({ extended: true })); //Middleware for urlencoded data

app.use(express.static('public')); // Static middleware pointing to the public folder

sequelize.sync().then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});


/////////////////////////////////////////////////////////////////////////////////////////////

// Express.js routes for default '/' and '/new' html endpoints
app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, 'public/index.html'))
);

app.get('/new', (req, res) => 
    res.sendFile(path.join(__dirname, 'public/newMessage.html'))
);


// POST request to send a message
app.post('/api/messages', (req, res) => {
    console.info(`${req.method} request received to post a message`);
    const { from, to, subject, text } = req.body;

    // Verify required properties are present
    if (from && to && subject && text)  {
        Message.create({
            fromUser: from,
            toUser: to,
            subjectLine: subject,
            bodyText: text
        })
            .then((newMessage) => {
                res.json(newMessage);
                console.log(newMessage);
            })
            .catch((err) => {
                res.json(err);
            });
        }
});



// listen() method is responsible for listening for incoming connections on the specified port 
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
