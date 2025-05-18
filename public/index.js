const messageForm = document.getElementById('message-form');
const senderInput = document.getElementById('sender');
const recipientInput = document.getElementById('recipient');
const subjectInput = document.getElementById('subject');
const textInput = document.getElementById('message-text');


// Helper function that accepts a `message` object, sends a POST request and returns the result
const postMessage = (message) =>
    // Fetch accepts a URL and an options object where you can declare the HTTP method, the request body, and any headers.
    fetch('/api/messages', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
    })
    .then((res) => res.json())
    .then((data) => {
        console.log('Successful POST request:', data);
        return data;
    })
    .catch((error) => {
        console.error('Error in POST request:', error);
    });


messageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!senderInput || !recipientInput || !subjectInput || !textInput) {
        alert('Please fill in all fields.');
        return;
    };
    

    //create new message object from input values
    const newMessage = {
        from: senderInput.value.trim(),
        to: recipientInput.value.trim(),
        subject: subjectInput.value.trim(),
        text: textInput.value.trim()
    }
    

  // Call our `postMessage` method to make a POST request with our `newMessage` object.
    postMessage(newMessage)
        .then((data) => {
            alert('Message sent!');
            messageForm.reset();
        })
        .catch((err) => console.error(err));

});