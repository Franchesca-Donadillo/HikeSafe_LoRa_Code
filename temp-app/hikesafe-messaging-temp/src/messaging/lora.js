const RadioLib = require('radiolib'); // Import the RadioLib library for LoRa communication

// LoRa configuration
const LORA_FREQ = 869.525; // Frequency in MHz
const LORA_BW = 250; // Bandwidth in kHz
const LORA_SF = 11; // Spreading Factor

// Initialize LoRa module
const lora = new RadioLib.Lora(LORA_FREQ, LORA_BW, LORA_SF);

// Function to send a message
function sendMessage(message) {
    lora.send(message)
        .then(() => {
            console.log('Message sent:', message);
        })
        .catch((error) => {
            console.error('Error sending message:', error);
        });
}

// Function to receive messages
function receiveMessages() {
    lora.on('message', (message) => {
        console.log('Message received:', message);
    });
}

// Export the functions for use in other modules
module.exports = {
    sendMessage,
    receiveMessages,
};