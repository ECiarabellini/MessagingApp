const Message = require('../scratchpad.js')

// A testing suite for Scratchpad is created.
describe('Scratchpad', () => {
    // Test to verify that the Scratchpad class can be instantiated.
    describe('Instantiate', () => {
        it('should be an instance of Message class', () => {
            const message2 = new Message('Jeremy2', 'Emily2', 'Big News2', 'I got a new job!2');
            expect(message2).toBeInstanceOf(Message);
        });
    })
});