const Message = require('../index.js')

// A testing suite for Message is created.
describe('Message', () => {
    // Test to verify that the Message class can be instantiated.
    describe('Instantiate', () => {
        it('should be an instance of Message class', () => {
            const message2 = new Message('Jeremy2', 'Emily2', 'Big News2', 'I got a new job!2');
            expect(message2).toBeInstanceOf(Message);
        });
    })
});