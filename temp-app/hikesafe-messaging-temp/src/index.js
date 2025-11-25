const express = require('express');
const bodyParser = require('body-parser');
const { initializeMessaging } = require('./messaging/lora');
const messagesApi = require('./api/messages');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Initialize messaging system
initializeMessaging();

// API routes
app.use('/api/messages', messagesApi);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});