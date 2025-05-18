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

// listen() method is responsible for listening for incoming connections on the specified port 
app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
);


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
            })
            .catch((err) => {
                res.json(err);
            });
        }
});

// GET request to retrieve all messages
app.get('/api/messages', async (req, res) => {
    console.info(`${req.method} request received to retrieve all messages`);

    try {
        const allMessages = await Message.findAll();
        res.json(allMessages);
        console.log(`Retrieved ${allMessages.length} messages.`);
    } catch (error) {
        console.error('Error retrieving messages:', error);
        res.status(500).json({ error: 'Failed to retrieve messages' });
    }
});

// GET request to retrieve all messages to a specific toUser
app.get('/api/messages/to/:toUser', async (req, res) => {
    console.info(`${req.method} request received to retrieve messages for recipient: ${req.params.toUser}`);
    const recipient = req.params.toUser;

    try {
        const messages = await Message.findAll({
        where: {
            toUser: recipient,
        },
        });
        res.json(messages);
        console.log(`Retrieved ${messages.length} messages for recipient: ${recipient}`);
    } catch (error) {
        console.error(`Error retrieving messages for recipient ${recipient}:`, error);
        res.status(500).json({ error: `Failed to retrieve messages for recipient: ${recipient}` });
    }
});

// GET request to retrieve all messages from a specific fromUser
app.get('/api/messages/from/:fromUser', async (req, res) => {
    console.info(`${req.method} request received to retrieve messages for sender: ${req.params.toUser}`);
    const sender = req.params.fromUser;

    try {
        const messages = await Message.findAll({
        where: {
            fromUser: sender,
        },
        });
        res.json(messages);
        console.log(`Retrieved ${messages.length} messages for sender: ${sender}`);
    } catch (error) {
        console.error(`Error retrieving messages for sender ${sender}:`, error);
        res.status(500).json({ error: `Failed to retrieve messages for sender: ${sender}` });
    }
});
