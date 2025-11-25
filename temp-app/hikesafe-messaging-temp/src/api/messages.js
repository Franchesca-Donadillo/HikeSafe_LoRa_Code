import express from 'express';
import { sendMessage, receiveMessage } from '../messaging/lora.js';

const router = express.Router();

// Endpoint to send a message
router.post('/send', async (req, res) => {
    const { message } = req.body;
    try {
        await sendMessage(message);
        res.status(200).json({ success: true, message: 'Message sent successfully' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Endpoint to receive a message
router.get('/receive', async (req, res) => {
    try {
        const message = await receiveMessage();
        res.status(200).json({ success: true, message });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

export default router;