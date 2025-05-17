function Message(to, from, subject, body) {
    this.to = to;
    this.from = from;
    this.subject = subject;
    this.body = body;
}

//use prototype for memory efficiency instead of embedding function within Message object
Message.prototype.sendConfirm = function () {
    console.log(`Message sent to ${this.to}`);
}; 

const message1 = new Message('Jeremy', 'Emily', 'Big News', 'I got a new job!');

//template literal
let messageDetails =
    `Message to: ${message1.to}
From: ${message1.from}
Subject: ${message1.subject}
${message1.body}`;

// console.log(messageDetails);
// console.log(message1.sendConfirm());


module.exports = Message;